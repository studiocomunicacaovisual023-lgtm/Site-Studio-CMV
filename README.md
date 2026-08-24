# Studio Comunicação Visual

Novo site institucional e comercial da **Studio Comunicação Visual**, empresa de comunicação visual de Teresina — PI.

O projeto nasce com foco em transformar o site atual em uma presença digital mais moderna, rápida e orientada a resultado, valorizando os trabalhos realizados pela empresa e facilitando o contato de novos clientes.

> **Status:** fundação concluída e primeira versão da Home em homologação.

---

## Objetivos do projeto

- Modernizar a presença digital da Studio.
- Valorizar o portfólio com projetos e imagens reais.
- Apresentar os principais serviços de forma clara e comercial.
- Facilitar solicitações de orçamento, principalmente via WhatsApp.
- Melhorar performance, experiência mobile e acessibilidade.
- Criar uma base sólida para SEO local em Teresina e região.
- Estruturar o projeto para crescer sem adicionar complexidade desnecessária.

---

## Stack definida

### Fundação inicial

| Área | Tecnologia | Uso no projeto |
| --- | --- | --- |
| Framework | **Astro** | Site institucional, páginas e renderização otimizada |
| Linguagem | **TypeScript** | Tipagem e maior segurança no desenvolvimento |
| Estilos | **Tailwind CSS 4 + CSS customizado** | Design system e identidade visual própria |
| Tailwind | **Plugin oficial do Vite** | Integração moderna do Tailwind 4 com Astro |
| Ícones | **Lucide Icons** | Ícones leves e consistentes |
| Conteúdo | **Astro Content Collections** | Serviços, projetos e conteúdo estruturado |
| Validação | **Zod via `astro/zod`** | Schemas tipados para conteúdo |
| Assets estruturais | **Astro Assets** | Logo, elementos visuais e imagens permanentes da interface |
| SEO | **Astro + JSON-LD + Sitemap** | SEO técnico, local e dados estruturados |
| Deploy | **Vercel** | Preview de branches/PRs e produção |
| Versionamento | **GitHub** | Código, branches, Pull Requests e histórico |

### Ferramentas aprovadas, mas instaladas somente quando necessárias

| Área | Tecnologia | Uso previsto |
| --- | --- | --- |
| Microinterações | **CSS / Tailwind** | Hover, estados, transições e movimentos simples |
| Animações JS | **Motion** | Reveals, stagger, springs e animações de viewport |
| Scroll avançado | **GSAP + ScrollTrigger** | Experiências pontuais de alto impacto |
| Transições de página | **View Transitions do Astro / navegador** | Navegação fluida entre páginas e cases |
| Client-side routing | **`ClientRouter`**, somente se necessário | Transições avançadas quando a navegação nativa não for suficiente |
| UI utilitária | **Shadcn UI**, pontual | Dialog, Sheet, Accordion e outras primitivas |
| Referências visuais | **21st.dev / Aceternity / Magic UI** | Inspiração e componentes especiais avaliados caso a caso |
| CDN de imagens | **Cloudinary**, quando necessário | Portfólio com grande volume de mídia |
| CMS futuro | **Sanity**, se necessário | Autonomia para o cliente cadastrar conteúdo |

> **Ferramenta aprovada não significa dependência obrigatória.** Motion, GSAP, Cloudinary, ClientRouter, Shadcn e outras bibliotecas só entram no projeto quando houver uma necessidade concreta.

---

## Ambiente de desenvolvimento

A fundação do projeto deverá ser reproduzível entre desenvolvimento local, CI e Vercel.

### Padrão inicial

```text
Node.js: >= 22.12
Gerenciador: pnpm 10
Lockfile: pnpm-lock.yaml
Astro: versão estável definida no package.json
Tailwind CSS: v4 via plugin oficial do Vite
```

Após a inicialização do projeto, as versões efetivamente instaladas serão registradas no `package.json` e no `pnpm-lock.yaml`.

O `package.json` deverá registrar o package manager e a versão mínima do Node, por exemplo:

```json
{
  "engines": {
    "node": ">=22.12"
  },
  "packageManager": "pnpm@10"
}
```

### Tailwind CSS 4

Para Astro moderno, o Tailwind 4 será configurado pelo plugin oficial do Vite, preferencialmente usando:

```bash
pnpm astro add tailwind
```

O CSS global utilizará:

```css
@import "tailwindcss";
```

Não planejamos utilizar a integração legada `@astrojs/tailwind` para Tailwind 3.

---

## Por que Astro?

A Studio precisa, neste momento, de um site predominantemente institucional e comercial, com forte presença visual, portfólio, páginas de serviços, SEO local e poucos componentes realmente interativos.

Astro permite entregar HTML altamente otimizado e enviar JavaScript ao navegador apenas quando necessário. Isso reduz complexidade e favorece performance sem limitar o crescimento futuro do projeto.

---

## Arquitetura planejada

```text
studio-comunicacao-visual/
│
├── public/
│   ├── favicon/
│   └── og/
│
├── src/
│   ├── assets/
│   │   ├── brand/
│   │   ├── company/
│   │   ├── placeholders/
│   │   └── ui/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── projects/
│   │   ├── services/
│   │   └── ui/
│   │
│   ├── content/
│   │   ├── projects/
│   │   └── services/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ProjectLayout.astro
│   │   └── ServiceLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── empresa.astro
│   │   ├── contato.astro
│   │   ├── projetos/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── servicos/
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   ├── config/
│   │   └── company.ts
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── utils/
│   │   ├── seo.ts
│   │   └── whatsapp.ts
│   │
│   └── content.config.ts
│
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
└── README.md
```

A estrutura pode sofrer ajustes conforme o projeto evoluir. O objetivo é manter componentes, conteúdo e regras de negócio desacoplados.

---

## Content Collections

As collections serão configuradas em **`src/content.config.ts`**, seguindo a arquitetura atual do Astro Content Layer.

As duas collections iniciais serão:

```text
projects
services
```

Cada collection deverá possuir:

- `loader` explícito;
- schema com Zod;
- campos obrigatórios e opcionais bem definidos;
- validação durante desenvolvimento/build;
- conteúdo separado da camada visual.

Exemplo de fundação:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    services: z.array(z.string()).default([]),
    location: z.string().optional(),
    year: z.number().optional(),
    featured: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({
    base: "./src/content/services",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  services,
};
```

Os schemas serão refinados conforme recebermos os dados reais da Studio.

---

## Estrutura prevista da Home

```text
Header
  ↓
Hero
  ↓
Faixa de confiança
  ↓
Serviços
  ↓
Projetos em destaque
  ↓
Por que escolher a Studio
  ↓
Como funciona
  ↓
Clientes / prova social
  ↓
CTA para orçamento
  ↓
Footer
```

Cada seção deve existir por uma razão comercial ou informacional. O objetivo não é apenas criar uma página bonita, mas conduzir o visitante até uma ação relevante.

---

## Portfólio e galeria

O portfólio será uma das áreas centrais do site.

Cada projeto deverá ser tratado como conteúdo estruturado, podendo conter:

```ts
type Project = {
  title: string;
  slug: string;
  category: string;
  cover: string;
  gallery: string[];
  description: string;
  services: string[];
  location?: string;
  year?: number;
  featured: boolean;
};
```

### Categorias previstas

- Fachadas
- Adesivos
- Envelopamento
- Impressão Digital
- Acrílico e Inox
- Corte a Laser

### Imagens

As imagens permanentes da interface ficam no projeto. As imagens do portfólio poderão ser servidas por **Cloudinary** quando o volume de mídia justificar o uso de CDN e otimização externa, evitando transformar o repositório Git em um armazenamento de centenas de arquivos pesados.

Cloudinary **não é obrigatório na instalação inicial**. Enquanto o volume de imagens for pequeno, Astro Assets poderá atender o projeto.

### Imagens provisórias durante o desenvolvimento

Enquanto o acervo definitivo da Studio ainda estiver sendo organizado, o projeto poderá utilizar imagens do **Unsplash** e do **Pexels** como material provisório para construção e validação do layout.

Essas imagens serão usadas principalmente para:

- testar composição, proporções e responsividade;
- desenvolver Hero, serviços e seções institucionais;
- validar cards, grids e comportamento visual da galeria;
- apresentar previews antes da substituição pelo acervo definitivo.

As imagens de banco **não deverão ser apresentadas como trabalhos realizados pela Studio**. Cards de portfólio e cases publicados em produção deverão priorizar projetos reais da empresa, devidamente identificados e aprovados.

Sempre que possível, as imagens provisórias serão baixadas, organizadas no projeto e otimizadas para a Web, evitando dependência de hotlinks externos.

Fluxo esperado:

```text
Desenvolvimento
  ↓
Unsplash / Pexels como material provisório
  ↓
Validação do layout
  ↓
Recebimento e organização das fotos reais da Studio
  ↓
Astro Assets ou Cloudinary, conforme volume e necessidade
  ↓
Otimização e publicação
```

A entrega das imagens deverá priorizar:

- WebP / AVIF quando aplicável;
- tamanhos responsivos;
- lazy loading abaixo da dobra;
- carregamento prioritário apenas para mídia crítica;
- boa qualidade visual sem comprometer performance.

---

## SEO e conversão

A arquitetura será preparada para páginas específicas de serviços e projetos.

Exemplos de rotas futuras:

```text
/servicos/fachadas-em-acm
/servicos/adesivos
/servicos/envelopamento
/servicos/impressao-digital
/projetos/[slug]
```

O trabalho de SEO deverá considerar:

- títulos e descrições únicos;
- hierarquia correta de headings;
- canonical URLs;
- Open Graph;
- sitemap;
- robots.txt;
- dados estruturados com JSON-LD;
- `LocalBusiness` quando aplicável;
- conteúdo orientado a buscas locais;
- imagens com texto alternativo adequado;
- Core Web Vitals e experiência mobile.

### Conversão principal

O principal caminho comercial será a solicitação de orçamento.

```text
Visitante
   ↓
Serviço ou projeto
   ↓
Prova de qualidade
   ↓
CTA contextual
   ↓
WhatsApp / orçamento
```

As mensagens de WhatsApp poderão ser contextualizadas conforme a página de origem.

Exemplo:

```text
Olá! Vi no site da Studio o serviço de Fachadas em ACM e gostaria de solicitar um orçamento.
```

---

## Design e experiência

A nova interface deverá seguir a identidade da Studio sem reproduzir a estrutura do site anterior.

Princípios:

- identidade própria, evitando aparência genérica de template;
- excelente experiência mobile;
- hierarquia visual clara;
- uso estratégico de fotografias reais;
- animações discretas e funcionais;
- contraste e acessibilidade;
- portfólio como principal prova de capacidade;
- CTAs claros e orientados a orçamento.

---

## Estratégia de UI e animações

O projeto buscará um nível visual premium sem transformar a aplicação Astro em uma coleção pesada de componentes React ou bibliotecas usadas sem necessidade.

### Instalação inicial

A fundação não precisa instalar Motion, GSAP ou um client-side router.

```text
Astro
+ TypeScript
+ Tailwind CSS 4
+ Lucide Icons
```

As dependências de animação serão adicionadas somente quando a implementação demonstrar necessidade.

### Ordem de preferência

```text
CSS / Tailwind
      ↓
Motion
      ↓
GSAP + ScrollTrigger
      ↓
React Island somente se a interação realmente justificar
```

### CSS / Tailwind

Será a primeira escolha para:

- hover de cards e botões;
- transições de cor e borda;
- pequenos deslocamentos e escalas;
- overlays e zoom sutil de imagens;
- estados de foco;
- microinterações simples.

### Motion

Quando necessário, será a primeira biblioteca considerada para animações JavaScript recorrentes, como:

- entrada de seções na viewport;
- reveal de textos e imagens;
- stagger de cards;
- springs;
- interações que exigem mais controle do que CSS puro.

### GSAP + ScrollTrigger

Será instalado somente se houver uma experiência cuja complexidade justifique seu uso, por exemplo:

- storytelling por scroll;
- uma seção especial de projetos;
- timelines sincronizadas com rolagem;
- pin/scrub;
- transformações visuais complexas.

A intenção é ter **1 ou 2 momentos memoráveis**, se fizer sentido, e não animar todas as seções com GSAP.

### View Transitions

A preferência inicial é utilizar os recursos nativos de navegação e View Transitions disponíveis no navegador/Astro quando forem suficientes.

O **`ClientRouter` não entra automaticamente na fundação**. Ele só deverá ser introduzido se o projeto realmente precisar de navegação client-side e transições avançadas que não sejam atendidas pela abordagem mais simples.

Caso `ClientRouter` seja adotado, scripts interativos deverão respeitar o ciclo de navegação do Astro e ser inicializados de forma compatível com eventos como `astro:page-load` quando necessário.

### Shadcn UI

O Shadcn poderá ser utilizado de forma pontual para primitivas de interface que já possuem comportamento e acessibilidade bem definidos, como:

- Dialog;
- Sheet;
- Accordion;
- Tabs;
- Tooltip.

Hero, cards de serviços, portfólio, CTAs e demais componentes de marca deverão ser prioritariamente **customizados para a Studio**.

### 21st.dev, Aceternity e Magic UI

Serão tratados principalmente como **repertório visual e fonte de componentes especiais**, não como fundação do projeto.

Ao encontrar um componente interessante, a decisão seguirá esta lógica:

```text
Componente interessante
        ↓
Pode ser Astro + CSS?
        ├── Sim → implementar nativamente
        │
        └── Não
             ↓
        Motion resolve?
        ├── Sim → Astro + Motion
        │
        └── Não
             ↓
        A complexidade justifica React?
        ├── Sim → React Island isolada
        └── Não → simplificar a solução
```

### Dependências que não entram por padrão

Não serão adicionados inicialmente apenas por tendência ou conveniência:

- Motion;
- GSAP;
- ClientRouter;
- React;
- Lenis;
- Three.js;
- Swiper;
- bibliotecas completas de efeitos visuais;
- múltiplos runtimes de UI sem necessidade.

### Regra de ouro para animações

Uma animação deve contribuir para pelo menos um destes objetivos:

1. direcionar a atenção;
2. ajudar a compreender o conteúdo;
3. valorizar um projeto realizado;
4. aumentar a percepção de qualidade;
5. melhorar navegação e feedback de interação.

Se não cumprir nenhum desses papéis, a preferência será não animar.

---

## Fluxo de desenvolvimento

```text
Código
  ↓
Branch
  ↓
Pull Request
  ↓
Preview na Vercel
  ↓
Revisão
  ↓
Aprovação
  ↓
Merge na main
  ↓
Produção
```

### Convenção inicial de branches

```text
feat/project-foundation
feat/header-hero
feat/services
feat/portfolio
feat/seo
fix/...
```

### Convenção de commits

O projeto adotará mensagens objetivas no estilo Conventional Commits.

Exemplos:

```text
chore: initialize Astro project
feat: build homepage hero section
feat: add services collection
feat: implement project portfolio
feat: add contextual WhatsApp CTA
fix: improve mobile navigation
```

---

## Evolução futura

A arquitetura será preparada para evoluir sem obrigar o site institucional a virar uma aplicação complexa.

### Se as atualizações continuarem sendo feitas pelo desenvolvedor

```text
Astro
+ Content Collections
+ Astro Assets / Cloudinary quando necessário
+ Git
```

### Se a equipe da Studio quiser cadastrar projetos diretamente

Uma evolução possível será:

```text
Astro
+ Sanity CMS
+ Sanity Image CDN
```

Nesse cenário, a equipe poderá utilizar um painel administrativo para cadastrar projetos, textos e imagens sem editar código.

### Se futuramente surgir um sistema operacional completo

Recursos como autenticação de clientes, pedidos, pagamentos, dashboards e permissões poderão ser implementados separadamente, por exemplo:

```text
studiocmv.com.br
└── Astro — site institucional e comercial

app.studiocmv.com.br
└── aplicação dedicada — área autenticada / sistema
```

Isso evita adicionar complexidade ao site atual antes de existir uma necessidade real.

---

## Princípios técnicos

1. **Performance antes de efeitos visuais desnecessários.**
2. **JavaScript somente onde houver necessidade real.**
3. **Conteúdo e componentes desacoplados.**
4. **Content Collections sempre com loaders explícitos e schemas validados.**
5. **Imagens tratadas como parte crítica da experiência.**
6. **Mobile como prioridade, não adaptação tardia.**
7. **SEO pensado durante o desenvolvimento.**
8. **Acessibilidade incorporada à implementação.**
9. **Sem banco de dados ou backend sem uma necessidade concreta.**
10. **Sem dependências adicionadas apenas por conveniência.**
11. **Cada seção deve contribuir para informação, confiança ou conversão.**
12. **Versões e ambiente devem ser reproduzíveis via `package.json` + lockfile.**

---

## Estado atual

- [x] Repositório criado
- [x] Objetivo inicial definido
- [x] Stack principal definida
- [x] Arquitetura inicial definida
- [x] Estratégia de UI e animações definida
- [x] Estratégia inicial de imagens definida
- [x] Padrão de Content Collections definido
- [x] Ambiente alvo definido: Node + pnpm + lockfile
- [x] Inicializar projeto Astro
- [x] Configurar `package.json` e `pnpm-lock.yaml`
- [x] Configurar Tailwind CSS 4 via Vite
- [x] Criar `src/content.config.ts`
- [x] Criar schemas de `projects` e `services`
- [x] Criar design tokens
- [x] Implementar Header e Hero
- [x] Implementar serviços
- [x] Implementar portfólio
- [x] Implementar processo, institucional, clientes, CTA e Footer
- [x] Implementar SEO técnico, sitemap, robots.txt, JSON-LD e Open Graph
- [x] Adicionar validações automatizadas de estrutura e conversão
- [x] Validar typecheck, build estático e dependências de produção
- [ ] Substituir e aprovar todo o acervo provisório
- [ ] Validar contatos, redes sociais e textos finais com a Studio
- [ ] Criar preview na Vercel
- [ ] Revisão e homologação
- [ ] Publicação em produção

---

## Objetivo final

> Criar para a Studio Comunicação Visual um site **rápido, bonito, escalável e comercialmente eficiente**, capaz de valorizar o portfólio da empresa, fortalecer sua presença digital e transformar visitas em oportunidades reais de orçamento.

---

Desenvolvido e mantido como projeto privado da **Studio Comunicação Visual**.
