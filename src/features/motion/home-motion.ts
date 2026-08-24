import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initHomeMotion = () => {
  const root = document.querySelector<HTMLElement>("[data-gsap-home]");

  if (!root || root.dataset.gsapMotionState === "ready") {
    return () => undefined;
  }

  root.dataset.gsapMotionState = "ready";

  const motionMedia = gsap.matchMedia(root);

  motionMedia.add(
    {
      allowMotion: "(prefers-reduced-motion: no-preference)",
      isDesktop: "(min-width: 52.01rem)",
    },
    (context) => {
      const allowMotion = context.conditions?.allowMotion ?? false;
      const isDesktop = context.conditions?.isDesktop ?? false;
      if (!allowMotion) return;

      const hero = root.querySelector<HTMLElement>("[data-gsap-hero]");

      if (hero) {
        const eyebrow = hero.querySelector<HTMLElement>("[data-gsap-hero-eyebrow]");
        const titleLines = hero.querySelectorAll<HTMLElement>("[data-title-line]");
        const copyElements = hero.querySelectorAll<HTMLElement>("[data-gsap-hero-copy]");
        const heroVisual = hero.querySelector<HTMLElement>("[data-gsap-hero-visual]");
        const heroCard = hero.querySelector<HTMLElement>("[data-gsap-hero-card]");
        const heroLight = hero.querySelector<HTMLElement>("[data-gsap-hero-light]");
        const proofItems = hero.querySelectorAll<HTMLElement>("[data-gsap-hero-proof]");

        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        if (eyebrow) {
          heroTimeline.from(eyebrow, {
            autoAlpha: 0,
            x: -18,
            duration: 0.42,
          });
        }

        heroTimeline.from(
          titleLines,
          {
            autoAlpha: 0,
            y: 26,
            rotationX: -5,
            transformOrigin: "50% 100%",
            duration: 0.72,
            stagger: 0.08,
          },
          eyebrow ? "-=0.2" : 0,
        );

        heroTimeline.from(
          copyElements,
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.54,
            stagger: 0.08,
          },
          "-=0.42",
        );

        if (heroVisual) {
          heroTimeline.from(
            heroVisual,
            {
              autoAlpha: 0,
              x: isDesktop ? 34 : 18,
              scale: 0.985,
              duration: 0.9,
            },
            0.18,
          );
        }

        heroTimeline.from(
          proofItems,
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.07,
          },
          "-=0.25",
        );

        const heroParallaxYPercent = isDesktop ? 6 : 2;

        if (heroCard) {
          gsap.to(heroCard, {
            yPercent: heroParallaxYPercent,
            scale: isDesktop ? 1.025 : 1.01,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }

        if (heroLight && isDesktop) {
          gsap.to(heroLight, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      }

      const process = root.querySelector<HTMLElement>("[data-gsap-process]");

      if (process) {
        const processCopy = process.querySelector<HTMLElement>("[data-gsap-process-copy]");
        const processTrack = process.querySelector<HTMLElement>("[data-gsap-process-track]");
        const processSteps = process.querySelectorAll<HTMLElement>("[data-gsap-process-step]");
        const processIcons = process.querySelectorAll<HTMLElement>("[data-gsap-process-icon]");

        const processTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: process,
            start: "top 72%",
            once: true,
          },
        });

        if (processCopy) {
          processTimeline.from(processCopy, {
            autoAlpha: 0,
            y: isDesktop ? 24 : 16,
            duration: 0.62,
            ease: "power3.out",
          });
        }

        if (processTrack) {
          processTimeline.fromTo(
            processTrack,
            { "--process-line-progress": 0 },
            {
              "--process-line-progress": 1,
              duration: 0.9,
              ease: "power2.out",
            },
            "-=0.24",
          );
        }

        processTimeline.from(
          processSteps,
          {
            autoAlpha: 0,
            y: isDesktop ? 26 : 18,
            duration: 0.62,
            stagger: 0.11,
            ease: "power3.out",
          },
          "-=0.55",
        );

        processTimeline.from(
          processIcons,
          {
            scale: 0.78,
            rotation: -4,
            duration: 0.45,
            stagger: 0.11,
            ease: "back.out(1.7)",
          },
          "<0.08",
        );
      }
    },
  );

  return () => {
    motionMedia.revert();
    delete root.dataset.gsapMotionState;
  };
};
