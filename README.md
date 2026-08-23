# Studio Comunicação Visual

Novo site institucional e comercial da **Studio Comunicação Visual**, empresa de comunicação visual de Teresina — PI.

O projeto nasce com foco em transformar o site atual em uma presença digital mais moderna, rápida e orientada a resultado, valorizando os trabalhos realizados pela empresa e facilitando o contato de novos clientes.

> **Status:** planejamento e fundação técnica.

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

| Área | Tecnologia | Uso no projeto |
| --- | --- | --- |
| Framework | **Astro** | Site institucional, páginas e renderização otimizada |
| Linguagem | **TypeScript** | Tipagem e maior segurança no desenvolvimento |
| Estilos | **Tailwind CSS + CSS customizado** | Design system e identidade visual própria |
| Ícones | **Lucide Icons** | Ícones leves e consistentes |
| Animações | **CSS + GSAP pontual** | Microinterações e animações apenas onde agregarem valor |
| Conteúdo | **Astro Content Collections** | Serviços, projetos e conteúdo estruturado |
| Imagens do portfólio | **Cloudinary** | CDN, otimização e entrega responsiva de imagens |
| Assets estruturais | **Astro Assets** | Logo, elementos visuais e imagens permanentes da interface |
| SEO | **Astro + JSON-LD + Sitemap** | SEO técnico, local e dados estruturados |
| Deploy | **Vercel** | Preview de branches/PRs e produção |
| Versionamento | **GitHub** | Código, branches, Pull Requests e histórico |

### Por que Astro?

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
│   └── utils/
│       ├── seo.ts
│       └── whatsapp.ts
│
├── astro.config.mjs
├── package.json
└── README.md
```

A estrutura pode sofrer ajustes conforme o projeto evoluir. O objetivo é manter componentes, conteúdo e regras de negócio desacoplados.

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

As imagens permanentes da interface ficam no projeto. As imagens do portfólio serão preferencialmente servidas por **Cloudinary**, evitando transformar o repositório Git em um armazenamento de centenas de arquivos pesados.

### Imagens provisórias durante o desenvolvimento

Enquanto o acervo definitivo da Studio ainda estiver sendo organizado, o projeto poderá utilizar imagens do **Unsplash** e do **Pexels** como material provisório para construção e validação do layout.

Essas imagens serão usadas principalmente para:

- testar composição, proporções e responsividade;
- desenvolver Hero, serviços e seções institucionais;
- validar cards, grids e comportamento visual da galeria;
- apresentar previews antes da substituição pelo acervo definitivo.

As imagens de banco **não deverão ser apresentadas como trabalhos realizados pela Studio**. Cards de portfólio e cases publicados em produção deverão priorizar projetos reais da empresa, devidamente identificados e aprovados.

Sempre que possível, as imagens provisórias serão baixadas, organizadas no projeto e otimizadas para a Web, evitando dependência de hotlinks externos. Antes da publicação final, o objetivo é substituir o máximo possível desse material por fotografias reais da Studio, sua estrutura, equipe, processos e projetos executados.

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
Cloudinary
  ↓
Otimização e publicação
```

Para o portfólio definitivo:

```text
Projeto
  ├── capa
  ├── categoria
  ├── descrição
  ├── serviços realizados
  └── galeria de imagens → Cloudinary CDN
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
+ Cloudinary
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
4. **Imagens tratadas como parte crítica da experiência.**
5. **Mobile como prioridade, não adaptação tardia.**
6. **SEO pensado durante o desenvolvimento.**
7. **Acessibilidade incorporada à implementação.**
8. **Sem banco de dados ou backend sem uma necessidade concreta.**
9. **Sem dependências adicionadas apenas por conveniência.**
10. **Cada seção deve contribuir para informação, confiança ou conversão.**

---

## Estado atual

- [x] Repositório criado
- [x] Objetivo inicial definido
- [x] Stack principal definida
- [x] Arquitetura inicial definida
- [ ] Inicializar projeto Astro
- [ ] Configurar TypeScript e Tailwind CSS
- [ ] Criar design tokens
- [ ] Configurar Content Collections
- [ ] Configurar estratégia de imagens
- [ ] Implementar Header e Hero
- [ ] Implementar serviços
- [ ] Implementar portfólio
- [ ] Implementar SEO técnico
- [ ] Criar preview na Vercel
- [ ] Revisão e homologação
- [ ] Publicação em produção

---

## Objetivo final

> Criar para a Studio Comunicação Visual um site **rápido, bonito, escalável e comercialmente eficiente**, capaz de valorizar o portfólio da empresa, fortalecer sua presença digital e transformar visitas em oportunidades reais de orçamento.

---

Desenvolvido e mantido como projeto privado da **Studio Comunicação Visual**.
