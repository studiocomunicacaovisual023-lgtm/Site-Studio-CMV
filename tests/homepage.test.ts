import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import sharp from "sharp";

const homepagePath = resolve("dist/index.html");

const readSource = (path: string) =>
  existsSync(path) ? readFileSync(path, "utf8") : "";

describe("homepage comercial", () => {
  it("publica a proposta central e as principais etapas da jornada", () => {
    expect(existsSync(homepagePath), "execute o build antes do teste").toBe(true);

    const html = readFileSync(homepagePath, "utf8");

    expect(html).toContain("Sua marca merece ser");
    expect(html).toContain("Solicitar orçamento");
    expect(html).toContain('id="servicos"');
    expect(html).toContain('id="projetos"');
    expect(html).toContain('id="processo"');
    expect(html).toContain('id="sobre"');
    expect(html).toContain('id="contato"');

    const heroDescription = html.match(
      /<p\b[^>]*class="hero-description"[^>]*>([\s\S]*?)<\/p>/,
    )?.[1]?.replace(/\s+/g, " ").trim();
    expect(heroDescription).toBe(
      "Transformamos ideias em soluções de comunicação visual. Produzimos fachadas, letras-caixa, adesivos, banners, impressões digitais em alta resolução, materiais gráficos e brindes personalizados para dar mais visibilidade ao seu negócio.",
    );
  });

  it("gera conversão por WhatsApp e dados estruturados locais", () => {
    expect(existsSync(homepagePath), "execute o build antes do teste").toBe(true);

    const html = readFileSync(homepagePath, "utf8");

    expect(html).toContain("https://wa.me/55");
    expect(html).toContain('"@type":"LocalBusiness"');
    expect(html).toContain("Teresina");
  });

  it("entrega composição compacta com movimento progressivo", () => {
    expect(existsSync(homepagePath), "execute o build antes do teste").toBe(true);

    const html = readFileSync(homepagePath, "utf8");

    expect(html).toContain("data-gsap-hero");
    expect(html.match(/data-title-line/g)).toHaveLength(3);
    expect(html).toContain("data-reveal");
    expect(html).toContain("Imagem de referência");
    expect(html).not.toContain("Acervo em validação");
  });

  it("carrega GSAP somente na Home com escopo e limpeza explícitos", () => {
    const packageJson = JSON.parse(readFileSync(resolve("package.json"), "utf8"));
    const indexSource = readFileSync(resolve("src/pages/index.astro"), "utf8");
    const motionSource = readSource(
      resolve("src/features/motion/home-motion.ts"),
    );

    expect(packageJson.dependencies.gsap).toMatch(/^3\./);
    expect(indexSource).toContain('import HomeMotion from "../components/ui/HomeMotion.astro"');
    expect(indexSource).toContain("<HomeMotion />");
    expect(motionSource).toContain('from "gsap"');
    expect(motionSource).toContain('from "gsap/ScrollTrigger"');
    expect(motionSource).toContain("gsap.registerPlugin(ScrollTrigger)");
    expect(motionSource).toContain("gsap.matchMedia");
    expect(motionSource).toContain("prefers-reduced-motion: no-preference");
    expect(motionSource).toContain("context.conditions?.allowMotion ?? false");
    expect(motionSource).toContain("motionMedia.revert()");
  });

  it("orquestra entrada e profundidade da Hero sem sequestrar o scroll", () => {
    const heroSource = readFileSync(
      resolve("src/components/sections/Hero.astro"),
      "utf8",
    );
    const motionSource = readSource(
      resolve("src/features/motion/home-motion.ts"),
    );

    expect(heroSource).toContain("data-gsap-hero");
    expect(heroSource).toContain("data-gsap-hero-card");
    expect(heroSource).toContain("data-gsap-hero-proof");
    expect(heroSource).not.toContain("data-motion-root");
    expect(motionSource).toContain("scrub: 0.6");
    expect(motionSource).toContain("heroParallaxYPercent");
    expect(motionSource).not.toContain("pin: true");
  });

  it("narra o Processo com linha progressiva e etapas escalonadas", () => {
    const processSource = readFileSync(
      resolve("src/components/sections/Process.astro"),
      "utf8",
    );
    const motionSource = readSource(
      resolve("src/features/motion/home-motion.ts"),
    );

    expect(processSource).toContain("data-gsap-process");
    expect(processSource).toContain("data-gsap-process-track");
    expect(processSource).toContain("data-gsap-process-step");
    expect(processSource).toContain("--process-line-progress");
    expect(motionSource).toContain('start: "top 72%"');
    expect(motionSource).toContain("stagger: 0.11");
    expect(motionSource).toContain("once: true");
  });

  it("usa imagens provisórias adequadas para os novos cards", async () => {
    const assets = [
      "stock-wrap-pexels.jpg",
      "stock-wrap-detail-pexels.jpg",
      "stock-printshop-a-unsplash.jpg",
      "stock-printshop-b-unsplash.jpg",
      "stock-wayfinding-pexels.jpg",
    ].map((name) => resolve("src/assets/stock", name));

    for (const asset of assets) {
      expect(existsSync(asset), `ativo ausente: ${asset}`).toBe(true);
      const metadata = await sharp(asset).metadata();
      expect(
        Math.max(metadata.width ?? 0, metadata.height ?? 0),
        `resolução insuficiente: ${asset}`,
      ).toBeGreaterThanOrEqual(1600);
    }

    const providedFacades = [
      "studio-acai-facade-reference.jpg",
      "studio-cannil-pet-facade-reference.jpg",
    ].map((name) => resolve("src/assets/company", name));

    for (const asset of providedFacades) {
      expect(existsSync(asset), `ativo ausente: ${asset}`).toBe(true);
      const metadata = await sharp(asset).metadata();
      expect(
        Math.max(metadata.width ?? 0, metadata.height ?? 0),
        `resolução insuficiente: ${asset}`,
      ).toBeGreaterThanOrEqual(1400);
    }
  });

  it("usa a fachada diurna fornecida na Hero sem ampliar o arquivo original", async () => {
    const heroAsset = resolve("src/assets/company/studio-facade-hero-real.jpg");
    const heroSource = readSource("src/components/sections/Hero.astro");

    expect(existsSync(heroAsset), `ativo ausente: ${heroAsset}`).toBe(true);
    const metadata = await sharp(heroAsset).metadata();
    expect(metadata.width).toBe(960);
    expect(metadata.height).toBe(1280);
    expect(heroSource).toContain("studio-facade-hero-real.jpg");
    expect(heroSource).not.toContain("studio-facade-hero-v3.png");
    expect(heroSource.match(/widths=\{\[480, 640, 960\]\}/g)).toHaveLength(2);
    expect(heroSource).toContain("Fachada da Studio Comunicação Visual em Teresina");
    expect(heroSource).not.toContain("cena noturna");
    expect(heroSource).not.toContain("ambientação digital");
  });

  it("preserva a fachada vertical anterior nos laboratórios", async () => {
    const heroAsset = resolve(
      "src/assets/company/studio-facade-hero-v3.png",
    );

    expect(existsSync(heroAsset), `ativo ausente: ${heroAsset}`).toBe(true);
    const metadata = await sharp(heroAsset).metadata();
    expect(metadata.width).toBeGreaterThanOrEqual(1080);
    expect(metadata.height).toBeGreaterThan(metadata.width ?? 0);

    for (const sourcePath of [
      resolve("src/components/experiments/GeometryHeroExperiment.astro"),
    ]) {
      const source = readFileSync(sourcePath, "utf8");
      expect(source).toContain("studio-facade-hero-v3.png");
      expect(source).not.toContain("studio-facade-hero-v2.png");
    }
  });

  it("entrega acendimento cinematográfico acessível na Hero da Home", () => {
    expect(existsSync(homepagePath), "execute o build antes do teste").toBe(true);

    const html = readFileSync(homepagePath, "utf8");
    const heroSource = readFileSync(
      resolve("src/components/sections/Hero.astro"),
      "utf8",
    );

    expect(html).toContain("data-hero-lighting");
    expect(heroSource).toContain("data-hero-light-layer");
    expect(heroSource).toContain("IntersectionObserver");
    expect(heroSource).toContain("visibilitychange");
    expect(heroSource).toContain("prefers-reduced-motion: reduce");
    expect(heroSource).not.toContain("data-studio-canvas2d");
    expect(heroSource).not.toContain("data-studio-webgl");
  });

  it("mostra a fachada inteira em um card proporcional, sem zoom interno", () => {
    const heroSource = readFileSync(
      resolve("src/components/sections/Hero.astro"),
      "utf8",
    );

    expect(heroSource).toContain("aspect-ratio: 11 / 10");
    expect(heroSource).not.toContain("height: clamp(30rem, 43vw, 39rem)");
    expect(heroSource).not.toContain("height: min(27rem, 110vw)");
    expect(heroSource).toContain("object-fit: cover");
    expect(heroSource).toContain("object-position: center 28%");
    expect(heroSource).toMatch(/\.facade-scene\s*\{[^}]*inset: 0;/);
    expect(heroSource).not.toContain("--facade-crop-scale");
    expect(heroSource).not.toContain("--hero-depth-x");
    expect(heroSource).not.toContain("facade-mobile-depth");
    expect(heroSource).not.toContain("margin-right: -5rem");
    expect(heroSource).toContain("brightness(1.02)");
    expect(heroSource).toContain("bottom: 1.35rem");
    expect(heroSource).not.toContain("rgb(3 7 13 / 0.78)");
  });

  it("mantém o topo, as laterais e a base da loja dentro do enquadramento em diferentes larguras", async () => {
    const heroSource = readSource("src/components/sections/Hero.astro");
    const aspect = heroSource.match(/\.image-shell\s*\{[^}]*aspect-ratio:\s*(\d+)\s*\/\s*(\d+)/);
    expect(aspect).not.toBeNull();
    const ratio = Number(aspect![1]) / Number(aspect![2]);
    const { width = 0, height = 0 } = await sharp(
      resolve("src/assets/company/studio-facade-hero-real.jpg"),
    ).metadata();
    // Limites da loja na foto vertical, excluindo céu, calçada e vizinhos.
    const facade = { left: 10, top: 118, right: 735, bottom: 986 };
    const verticalPosition = Number(
      heroSource.match(/object-position:\s*center\s+(\d+)%/)?.[1],
    ) / 100;
    expect(Number.isFinite(verticalPosition)).toBe(true);

    for (const cardWidth of [320, 390, 480, 600, 768]) {
      const cardHeight = cardWidth / ratio;
      const fit = Math.max(cardWidth / width, cardHeight / height);
      const visibleWidth = cardWidth / fit;
      const visibleHeight = cardHeight / fit;
      const left = (width - visibleWidth) / 2;
      const top = (height - visibleHeight) * verticalPosition;

      expect(left).toBeLessThanOrEqual(facade.left);
      expect(top).toBeLessThanOrEqual(facade.top);
      expect(left + visibleWidth).toBeGreaterThanOrEqual(facade.right);
      expect(top + visibleHeight).toBeGreaterThanOrEqual(facade.bottom);
    }
  });

  it("mantém a navegação fixa, compacta ao rolar e não esconde as âncoras", () => {
    const headerSource = readFileSync(
      resolve("src/components/layout/Header.astro"),
      "utf8",
    );
    const globalStyles = readFileSync(
      resolve("src/styles/global.css"),
      "utf8",
    );

    expect(headerSource).toContain("data-site-header");
    expect(headerSource).toContain("data-header-state");
    expect(headerSource).toContain("position: fixed");
    expect(headerSource).toContain("border-bottom: 1px solid transparent");
    expect(headerSource).toContain(
      "border-bottom-color: rgb(42 157 255 / 0.22)",
    );
    expect(headerSource).toContain("requestAnimationFrame");
    expect(headerSource).toContain("passive: true");
    expect(globalStyles).toContain("scroll-padding-top: var(--header-offset)");
    expect(globalStyles).not.toContain("scroll-margin-top: var(--header-offset)");
  });

  it("fecha o menu móvel, navega até a âncora e destaca a seção atual", () => {
    const headerSource = readFileSync(
      resolve("src/components/layout/Header.astro"),
      "utf8",
    );

    expect(headerSource).toContain("data-section-link");
    expect(headerSource).toContain("data-mobile-nav-link");
    expect(headerSource).toContain('removeAttribute("open")');
    expect(headerSource).toContain("scrollIntoView");
    expect(headerSource).toContain('aria-current');
    expect(headerSource).toContain("window.innerHeight * 0.42");
  });

  it("transforma os cards com affordance de navegação em links contextuais", () => {
    const servicesSource = readFileSync(
      resolve("src/components/sections/Services.astro"),
      "utf8",
    );
    const projectsSource = readFileSync(
      resolve("src/components/sections/Projects.astro"),
      "utf8",
    );

    expect(servicesSource).toContain('<a class="featured-card"');
    expect(projectsSource).toContain('<a class="project-card"');
    expect(servicesSource).toContain("buildWhatsAppUrl");
    expect(projectsSource).toContain("buildWhatsAppUrl");
  });

  it("mantém a assimetria dos serviços com respiro antes da grade compacta", () => {
    const servicesSource = readFileSync(
      resolve("src/components/sections/Services.astro"),
      "utf8",
    );

    expect(servicesSource).toContain("margin-top: 1.375rem");
    expect(servicesSource).toContain("margin-top: 2rem");
    expect(servicesSource.replace(/\r\n/g, "\n")).toContain(
      ".featured-card:nth-child(2) {\n      margin-top: 0;",
    );
  });

  it("prioriza o letreiro da fachada enviada no recorte do primeiro destaque", () => {
    const servicesSource = readFileSync(
      resolve("src/components/sections/Services.astro"),
      "utf8",
    );

    expect(servicesSource).toContain(
      'style={index === 0 ? "object-position: center 20%;" : undefined}',
    );
  });

  it("permite ajustar o ponto focal de cada imagem de projeto", () => {
    const contentConfigSource = readFileSync(
      resolve("src/content.config.ts"),
      "utf8",
    );
    const projectsSource = readFileSync(
      resolve("src/components/sections/Projects.astro"),
      "utf8",
    );
    const facadeProjectSource = readFileSync(
      resolve("src/content/projects/fachada-comercial.md"),
      "utf8",
    );

    expect(contentConfigSource).toContain(
      'coverPosition: z.string().default("center center")',
    );
    expect(projectsSource).toContain(
      'style={`object-position: ${project.data.coverPosition};`}',
    );
    expect(facadeProjectSource).toContain("coverPosition: center 20%");
  });

  it("mantém as imagens temporárias coerentes e evita repetição institucional", () => {
    const servicesSource = readFileSync(
      resolve("src/components/sections/Services.astro"),
      "utf8",
    );
    const facadeProjectSource = readFileSync(
      resolve("src/content/projects/fachada-comercial.md"),
      "utf8",
    );
    const aboutSource = readFileSync(
      resolve("src/components/sections/About.astro"),
      "utf8",
    );

    expect(servicesSource).toContain("studio-acai-facade-reference.jpg");
    expect(servicesSource).not.toContain("stock-facade-service-unsplash.jpg");
    expect(servicesSource).toContain("studio-fleet-wrap-mixed.png");
    expect(servicesSource).not.toContain('"../../assets/generated/studio-fleet-wrap.png"');
    expect(servicesSource).not.toContain("studio-facade.jpg");
    expect(facadeProjectSource).toContain(
      "studio-cannil-pet-facade-reference.jpg",
    );
    expect(facadeProjectSource).not.toContain(
      "stock-commercial-facade-pexels.jpg",
    );
    expect(facadeProjectSource).not.toContain("studio-facade-hero-v3.png");
    expect(facadeProjectSource).not.toContain("studio-acai-facade-reference.jpg");
    expect(servicesSource).not.toContain("stock-printshop-b-unsplash.jpg");
    expect(aboutSource).toContain("studio-impressora.png");
    expect(aboutSource).toContain("studio-design.jpg");
    expect(aboutSource).not.toContain("stock-printshop-b-unsplash.jpg");
  });

  it("destaca Fachadas e Adesivos e mantém Letras-caixa no catálogo compacto", () => {
    const html = readFileSync(homepagePath, "utf8");
    const featuredCards = [...html.matchAll(/<a\b[^>]*class="featured-card"[^>]*>[\s\S]*?<\/a>/g)]
      .map((match) => match[0]);
    const compactCards = [...html.matchAll(/<a\b[^>]*class="compact-card"[^>]*>[\s\S]*?<\/a>/g)]
      .map((match) => match[0]);
    const facadeCard = featuredCards[0] ?? "";
    const adhesiveCard = featuredCards[1] ?? "";

    expect(featuredCards).toHaveLength(2);
    expect(facadeCard).toMatch(/<h3\b[^>]*>Fachadas<\/h3>/);
    expect(facadeCard).toContain("studio-acai-facade-reference");
    expect(facadeCard).toContain("Imagem de referência");
    expect(facadeCard).toContain('class="reference-label"');
    expect(adhesiveCard).toMatch(/<h3\b[^>]*>Adesivos<\/h3>/);
    expect(adhesiveCard).toContain("Padronização de frotas");
    expect(adhesiveCard).toContain("studio-fleet-wrap-mixed");
    expect(adhesiveCard).toContain("carro iNET amarelo");
    expect(adhesiveCard).toContain("van Açaí Gurupi verde e roxa");
    expect(adhesiveCard).toContain("ônibus preto e azul envelopados");
    expect(adhesiveCard).not.toContain("Imagem gerada por IA");
    expect(adhesiveCard).not.toContain('class="reference-label"');
    expect(adhesiveCard).not.toContain("Acervo Studio");
    expect(adhesiveCard).not.toContain("Letras-caixa");
    expect(adhesiveCard).toContain('aria-label="Solicitar orçamento para Adesivos"');
    expect(decodeURIComponent(adhesiveCard)).toContain("serviço de Adesivos");
    expect(compactCards).toHaveLength(8);
    expect(compactCards.some((card) => /<h3\b[^>]*>Letras-caixa<\/h3>/.test(card))).toBe(true);
    expect(compactCards.some((card) => /<h3\b[^>]*>Adesivos<\/h3>/.test(card))).toBe(false);
  });

  it("carrega a composição de três veículos diferentes sem tag e com enquadramento próprio", async () => {
    const fleetAsset = resolve("src/assets/generated/studio-fleet-wrap-mixed.png");
    const servicesSource = readSource("src/components/sections/Services.astro");

    expect(existsSync(fleetAsset), `ativo ausente: ${fleetAsset}`).toBe(true);
    const { width = 0, height = 0 } = await sharp(fleetAsset).metadata();
    expect(width).toBeGreaterThanOrEqual(1600);
    expect(width / height).toBeCloseTo(16 / 9, 1);
    expect(servicesSource).not.toContain('label: "Imagem gerada por IA"');
    expect(servicesSource).toContain('{image.label && <span class="reference-label">{image.label}</span>}');
    expect(servicesSource).toMatch(/\.featured-card:nth-child\(2\) :global\(img\)\s*\{\s*object-position: center/);
  });

  it("oferece conversão móvel persistente e uma assinatura de progresso acessível", () => {
    const indexSource = readFileSync(resolve("src/pages/index.astro"), "utf8");
    const mobileCtaPath = resolve(
      "src/components/ui/MobileQuoteCta.astro",
    );
    const pageSignalPath = resolve("src/components/ui/PageSignal.astro");

    expect(existsSync(mobileCtaPath)).toBe(true);
    expect(existsSync(pageSignalPath)).toBe(true);
    expect(indexSource).toContain("<MobileQuoteCta />");
    expect(indexSource).toContain("<PageSignal />");

    const mobileCtaSource = readFileSync(mobileCtaPath, "utf8");
    const pageSignalSource = readFileSync(pageSignalPath, "utf8");
    expect(mobileCtaSource).toContain("IntersectionObserver");
    expect(mobileCtaSource).toContain("prefers-reduced-motion: reduce");
    expect(pageSignalSource).toContain("--page-progress");
    expect(pageSignalSource).toContain("prefers-reduced-motion: reduce");
  });

  it("recolhe o indicador lateral após o scroll e preserva apenas o ponto de progresso", () => {
    const pageSignalSource = readFileSync(
      resolve("src/components/ui/PageSignal.astro"),
      "utf8",
    );

    expect(pageSignalSource).toContain("const idleDelay = 1500");
    expect(pageSignalSource).toContain('classList.remove("is-idle")');
    expect(pageSignalSource).toContain('classList.add("is-idle")');
    expect(pageSignalSource).toContain("window.clearTimeout(idleTimer)");
    expect(pageSignalSource).toContain("window.setTimeout");
    expect(pageSignalSource).toContain(
      ".page-signal.is-visible.is-idle .signal-index",
    );
    expect(pageSignalSource).toContain(
      ".page-signal.is-visible.is-idle .signal-track b",
    );
  });

  it("compacta as seções longas no celular e remove o aviso de homologação", () => {
    const heroSource = readFileSync(
      resolve("src/components/sections/Hero.astro"),
      "utf8",
    );
    const servicesSource = readFileSync(
      resolve("src/components/sections/Services.astro"),
      "utf8",
    );
    const processSource = readFileSync(
      resolve("src/components/sections/Process.astro"),
      "utf8",
    );
    const clientsSource = readFileSync(
      resolve("src/components/sections/Clients.astro"),
      "utf8",
    );
    const footerSource = readFileSync(
      resolve("src/components/layout/Footer.astro"),
      "utf8",
    );
    const globalStyles = readFileSync(resolve("src/styles/global.css"), "utf8");
    const mobileCtaSource = readFileSync(
      resolve("src/components/ui/MobileQuoteCta.astro"),
      "utf8",
    );

    expect(heroSource).toContain("grid-template-columns: repeat(2, minmax(0, 1fr))");
    expect(servicesSource).toContain("min-height: 6.5rem");
    expect(processSource).toContain("grid-template-columns: auto 1fr");
    expect(clientsSource).toContain("grid-template-columns: repeat(3, minmax(0, 1fr))");
    expect(footerSource).not.toContain("Site em fase de homologação.");
    expect(globalStyles).toContain("touch-action: manipulation");
    expect(globalStyles).toContain("a:active");
    expect(mobileCtaSource).toContain("env(safe-area-inset-bottom)");
  });

  it("apresenta o portfólio provisório sem prometer cases ainda não publicados", () => {
    const projectsSource = readFileSync(
      resolve("src/components/sections/Projects.astro"),
      "utf8",
    );

    expect(projectsSource).toContain("Possibilidades que ganham forma no espaço.");
    expect(projectsSource).toContain("Referências visuais de aplicações");
    expect(projectsSource).not.toContain("Trabalho que se prova no espaço.");
    expect(projectsSource).not.toContain("curadoria");
    expect(projectsSource).not.toContain("Mais projetos serão incorporados");
    expect(projectsSource).not.toContain('class="project-tags"');
    expect(projectsSource).not.toContain("project.data.provisional");
    expect(projectsSource).not.toContain("Projeto 0{index + 1}");
    expect(projectsSource).toContain("project.data.title");
    expect(projectsSource).toContain("project.data.description");
    expect(projectsSource).toContain("Conversar no WhatsApp");
  });

  it("explicita o WhatsApp nos projetos e torna todos os serviços acionáveis", () => {
    const servicesSource = readFileSync(
      resolve("src/components/sections/Services.astro"),
      "utf8",
    );
    const projectsSource = readFileSync(
      resolve("src/components/sections/Projects.astro"),
      "utf8",
    );

    expect(servicesSource).toContain('<a class="compact-card"');
    expect(servicesSource).toContain("Solicitar orçamento para ${service.data.title}");
    expect(projectsSource).toContain("Conversar no WhatsApp");
    expect(projectsSource).toContain("pelo WhatsApp");
  });

  it("sincroniza Contato e Marcas entre navegação, indicador e âncoras", () => {
    const headerSource = readFileSync(
      resolve("src/components/layout/Header.astro"),
      "utf8",
    );
    const pageSignalSource = readFileSync(
      resolve("src/components/ui/PageSignal.astro"),
      "utf8",
    );
    const clientsSource = readFileSync(
      resolve("src/components/sections/Clients.astro"),
      "utf8",
    );
    const contactSource = readFileSync(
      resolve("src/components/sections/ContactCta.astro"),
      "utf8",
    );

    expect(headerSource).toContain('{ label: "Contato", href: "#contato" }');
    expect(headerSource).toContain("data-menu-toggle");
    expect(headerSource).toContain("aria-expanded");
    expect(headerSource).toContain('"Fechar menu"');
    expect(clientsSource).toContain('id="clientes"');
    expect(pageSignalSource).toContain('{ id: "clientes", index: "06", label: "Marcas" }');
    expect(pageSignalSource).toContain('{ id: "contato", index: "07", label: "Contato" }');
    expect(contactSource).toContain("07 / CONTATO");
  });

  it("oferece telefone, mapa e WhatsApp com destinos coerentes no rodapé", () => {
    const footerSource = readFileSync(
      resolve("src/components/layout/Footer.astro"),
      "utf8",
    );
    const companySource = readFileSync(
      resolve("src/config/company.ts"),
      "utf8",
    );

    expect(footerSource).toContain('href={`tel:${company.phoneHref}`}');
    expect(footerSource).toContain('href={company.mapsUrl}');
    expect(footerSource).toContain("WhatsApp");
    expect(companySource).toContain("mapsUrl:");
  });

  it("mantém metadados concisos e amplia o schema local com dados verificáveis", () => {
    expect(existsSync(homepagePath), "execute o build antes do teste").toBe(true);
    const html = readFileSync(homepagePath, "utf8");
    const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";

    expect(title.length).toBeGreaterThanOrEqual(50);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(description.length).toBeGreaterThanOrEqual(140);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(html).toContain('"areaServed"');
    expect(html).toContain('"logo"');
    expect(html).toContain('"image"');
  });

  it("dimensiona mídia crítica pela largura efetiva e protege textos informativos", () => {
    const heroSource = readFileSync(
      resolve("src/components/sections/Hero.astro"),
      "utf8",
    );
    const clientsSource = readFileSync(
      resolve("src/components/sections/Clients.astro"),
      "utf8",
    );
    const footerSource = readFileSync(
      resolve("src/components/layout/Footer.astro"),
      "utf8",
    );

    expect(heroSource).toContain("(max-width: 1280px) 58vw");
    expect(heroSource).toContain("font-size: 0.875rem");
    expect(clientsSource).toContain("font-size: 0.7rem");
    expect(footerSource).not.toContain("font-size: 0.51rem");
    expect(footerSource).not.toContain("font-size: 0.61rem");
    expect(footerSource).not.toContain("font-size: 0.68rem");
  });

  it("mantém os quatro diferenciais legíveis sem reduzir os textos no celular", () => {
    const heroSource = readSource("src/components/sections/Hero.astro");
    const paragraphRules = [...heroSource.matchAll(/\.proof-item p\s*\{([^}]+)\}/g)];
    const paragraphStyle = paragraphRules[0]?.[1] ?? "";
    const html = readFileSync(homepagePath, "utf8");

    expect(html.match(/data-gsap-hero-proof/g)).toHaveLength(4);
    // Um único estilo de parágrafo evita que o breakpoint móvel volte a diminuir a fonte.
    expect(paragraphRules).toHaveLength(1);
    expect(paragraphStyle).toContain("color: var(--muted)");
    expect(paragraphStyle).toContain("font-size: 0.875rem");
    expect(paragraphStyle).toContain("line-height: 1.55");
    expect(heroSource).toMatch(/\.proof-item h2\s*\{[^}]*font-size: 0\.75rem/);
  });

  it("mantém a prova de experiência verdadeira sem depender do ano atual", () => {
    const heroSource = readFileSync(
      resolve("src/components/sections/Hero.astro"),
      "utf8",
    );
    const aboutSource = readFileSync(
      resolve("src/components/sections/About.astro"),
      "utf8",
    );

    expect(heroSource).toContain("Mais de 10 anos de experiência");
    expect(heroSource).toContain('class="experience-number" aria-hidden="true">+10</strong>');
    expect(aboutSource).toContain("<strong>+10</strong>");
    expect(aboutSource).toContain("Há mais de 10 anos");
    expect(aboutSource).not.toContain("new Date().getFullYear() - company.foundingYear");
    expect(aboutSource).not.toContain("Desde {company.foundingYear}");
  });

  it("destaca a experiência antes do título da Hero, sem repetir a prova abaixo dos botões", () => {
    const html = readFileSync(homepagePath, "utf8");
    const heroHtml = html.match(/<section\b[^>]*id="inicio"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
    const heroSource = readSource("src/components/sections/Hero.astro");
    const experiencePosition = heroHtml.indexOf('class="hero-experience"');
    const titlePosition = heroHtml.indexOf('id="hero-title"');

    expect(experiencePosition).toBeGreaterThanOrEqual(0);
    expect(titlePosition).toBeGreaterThan(experiencePosition);
    expect(heroHtml.match(/class="hero-experience"/g)).toHaveLength(1);
    expect(heroHtml).toContain("Comunicação visual em Teresina");
    expect(heroHtml).toContain('class="sr-only"');
    expect(heroHtml).toContain("Mais de 10 anos de experiência");
    expect(heroHtml).not.toContain("Mais de 10 anos criando presença");
    expect(heroSource).not.toContain("hero-trust");
    expect(heroSource).not.toContain("ShieldCheck");
    expect(heroSource).toContain('class="hero-experience" data-gsap-hero-eyebrow');
    expect(heroSource).toMatch(/\.experience-number\s*\{[^}]*color: var\(--blue-bright\)/);
    expect(heroSource).toMatch(/\.experience-label\s*\{[^}]*color: var\(--text\)/);
    expect(heroSource).toMatch(/\.experience-stat\s*\{[^}]*flex-wrap: wrap/);
    expect(heroSource).toMatch(/@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.hero-experience,/);
  });

  it("integra o Instagram oficial sem incorporar scripts de terceiros", () => {
    const companySource = readFileSync(
      resolve("src/config/company.ts"),
      "utf8",
    );
    const footerSource = readFileSync(
      resolve("src/components/layout/Footer.astro"),
      "utf8",
    );
    const aboutSource = readFileSync(
      resolve("src/components/sections/About.astro"),
      "utf8",
    );
    const layoutSource = readFileSync(
      resolve("src/layouts/BaseLayout.astro"),
      "utf8",
    );
    const instagramIconPath = resolve("src/components/ui/InstagramIcon.astro");

    expect(companySource).toContain('instagramUrl: "https://www.instagram.com/studio_comunicacao_visual/"');
    expect(companySource).toContain('instagramHandle: "@studio_comunicacao_visual"');
    expect(existsSync(instagramIconPath)).toBe(true);
    expect(footerSource).toContain('InstagramIcon from "../ui/InstagramIcon.astro"');
    expect(aboutSource).toContain('InstagramIcon from "../ui/InstagramIcon.astro"');
    expect(footerSource).toContain("Instagram");
    expect(footerSource).toContain('href={company.instagramUrl}');
    expect(aboutSource).toContain('href={company.instagramUrl}');
    expect(aboutSource).toContain("Acompanhe os trabalhos e bastidores");
    expect(layoutSource).toContain("sameAs: [company.instagramUrl]");
    expect(layoutSource).not.toContain("instagram-media");
  });

  it("apresenta todas as áreas estratégicas como serviços acionáveis", () => {
    const servicesSource = readFileSync(
      resolve("src/components/sections/Services.astro"),
      "utf8",
    );
    const footerSource = readFileSync(
      resolve("src/components/layout/Footer.astro"),
      "utf8",
    );
    const personalizedPath = resolve("src/content/services/projetos-personalizados.md");
    const quickPrintPath = resolve("src/content/services/grafica-rapida.md");
    const giftsPath = resolve("src/content/services/brindes.md");
    const serviceFiles = [personalizedPath, quickPrintPath, giftsPath];

    serviceFiles.forEach((file) => expect(existsSync(file), `serviço ausente: ${file}`).toBe(true));
    expect(readFileSync(personalizedPath, "utf8")).toContain("title: Acrílico e corte a laser");
    expect(readFileSync(quickPrintPath, "utf8")).toContain("title: Gráfica rápida");
    expect(readFileSync(giftsPath, "utf8")).toContain("title: Brindes personalizados");
    expect(servicesSource).toContain("Gift");
    expect(footerSource).toContain("Acrílico e corte a laser");
    expect(footerSource).toContain("Gráfica rápida");
    expect(footerSource).toContain("Brindes personalizados");
  });

  it("prepara projetos e documentação para o recebimento do acervo real", () => {
    const contentSource = readFileSync(resolve("src/content.config.ts"), "utf8");
    const guidePath = resolve("docs/asset-intake.md");
    const manifestPath = resolve("docs/project-intake-template.csv");

    expect(contentSource).toContain("gallery: z");
    expect(contentSource).toContain("image: image()");
    expect(contentSource).toContain("alt: z.string().min(1)");
    expect(contentSource).toContain("client: z.string().optional()");
    expect(contentSource).toContain("materials: z.array(z.string()).default([])");
    expect(contentSource).toContain("challenge: z.string().optional()");
    expect(contentSource).toContain("solution: z.string().optional()");
    expect(contentSource).toContain("result: z.string().optional()");
    expect(contentSource).toContain("sourceUrl: z.url().optional()");
    expect(contentSource).toContain("publicationApproved: z.boolean().default(false)");
    expect(existsSync(guidePath)).toBe(true);
    expect(existsSync(manifestPath)).toBe(true);
    expect(readFileSync(guidePath, "utf8")).toContain("não envie pelo WhatsApp");
    expect(readFileSync(manifestPath, "utf8")).toContain("publicationApproved");
  });
});
