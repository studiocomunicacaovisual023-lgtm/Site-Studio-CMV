export interface GalleryEnvironment {
  visible: boolean;
  pageHidden: boolean;
  reducedMotion: boolean;
  hovered: boolean;
}

export interface GalleryState extends GalleryEnvironment {
  index: number;
  count: number;
  paused: boolean;
  playing: boolean;
}

export const EQUIPMENT_INTERVAL = 5000;

export function createGalleryController(
  count: number,
  onChange: (state: GalleryState) => void,
) {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError("A galeria precisa de pelo menos uma imagem.");
  }

  let index = 0;
  let paused = false;
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const environment: GalleryEnvironment = {
    visible: false,
    pageHidden: false,
    reducedMotion: false,
    hovered: false,
  };

  const getState = (): GalleryState => ({
    ...environment,
    index,
    count,
    paused,
    playing: !disposed && count > 1 && !paused && environment.visible &&
      !environment.pageHidden && !environment.reducedMotion && !environment.hovered,
  });

  const clearTimer = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  const publish = () => {
    if (disposed) return;
    clearTimer();
    const state = getState();
    onChange(state);
    if (state.playing) {
      timer = setTimeout(() => {
        index = (index + 1) % count;
        publish();
      }, EQUIPMENT_INTERVAL);
    }
  };

  publish();

  return {
    getState,
    setEnvironment(update: Partial<GalleryEnvironment>) {
      if (Object.entries(update).every(([key, value]) =>
        environment[key as keyof GalleryEnvironment] === value)) return;
      Object.assign(environment, update);
      publish();
    },
    select(nextIndex: number) {
      if (!Number.isFinite(nextIndex)) return;
      index = ((Math.trunc(nextIndex) % count) + count) % count;
      paused = true;
      publish();
    },
    pause() {
      paused = true;
      publish();
    },
    toggle() {
      paused = !paused;
      publish();
    },
    destroy() {
      disposed = true;
      clearTimer();
    },
  };
}
