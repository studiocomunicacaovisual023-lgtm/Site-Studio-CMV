# Direção da Home — fundação

## Entendimento confirmado

- Site institucional e comercial da Studio Comunicação Visual em Teresina.
- Público principal: empresas e empreendedores que precisam tornar sua marca mais visível.
- Conversão principal: iniciar uma solicitação de orçamento pelo WhatsApp.
- A direção visual aprovada preserva fundo escuro, azul elétrico, fotografia de grande escala e portfólio em destaque.
- A implementação deve ser mobile-first, acessível, rápida e majoritariamente estática.
- Astro, TypeScript, Tailwind CSS 4, Content Collections e Astro Assets formam a fundação.
- Motion, GSAP, React, ClientRouter, Cloudinary e CMS ficam fora desta primeira entrega.

## Assumptions

- O domínio canônico é `https://www.studiocmv.com.br`, conforme o endereço final da hospedagem. O domínio sem `www` redireciona para ele.
- Os telefones, e-mail e endereço publicados no site atual serão usados provisoriamente até validação do proprietário.
- Imagens do site atual da própria empresa podem ser reutilizadas como acervo inicial.
- Imagens de banco, quando necessárias, serão identificadas como referências e nunca como projetos executados.
- O tráfego inicial é compatível com geração estática e hospedagem na Vercel, sem backend.
- A manutenção inicial será feita via Git e Content Collections.

## Direção escolhida

**Precisão luminosa** — linguagem industrial e refinada inspirada em fachadas, letras-caixa, luz técnica e materiais de acabamento.

O elemento memorável será uma linha azul luminosa que organiza a composição e conduz o olhar entre conteúdo, projetos e chamadas para orçamento. A página evitará o padrão de cards repetidos da referência, usando imagens amplas, ritmo editorial e assimetria controlada.

### DFII

- Impacto estético: 4
- Adequação ao contexto: 5
- Viabilidade: 5
- Segurança de performance: 4
- Risco de inconsistência: 3
- **Resultado: 15 — excelente**

## Decisões

| Decisão | Alternativas | Motivo |
| --- | --- | --- |
| Astro estático | Starter React/Site genérico | É a arquitetura aprovada e reduz JavaScript no cliente. |
| Tailwind 4 + CSS de identidade | Biblioteca visual pronta | Mantém velocidade sem diluir a marca. |
| CSS-first para movimento | Motion ou GSAP na fundação | Preserva performance e respeita movimento reduzido. |
| Conteúdo estruturado | Conteúdo inteiro dentro da página | Facilita evolução para projetos, serviços e CMS. |
| Fotografias reais primeiro | Imagens geradas apresentadas como portfólio | Protege autenticidade e confiança comercial. |

## Critérios de sucesso

- A primeira dobra comunica o serviço e oferece orçamento em até três segundos.
- A Home funciona sem JavaScript obrigatório.
- Navegação, foco e contraste atendem ao uso por teclado e dispositivos móveis.
- Serviços e projetos vêm de Content Collections validadas.
- Build, typecheck e testes automatizados passam sem erros.

## Revisão visual 02 — Editorial compacta + movimento óptico

### Entendimento confirmado

- A Hero atual ocupa altura excessiva e separa demais texto e fachada.
- Fotografias de 460–507 px estão sendo ampliadas em cards grandes, causando perda perceptível de qualidade.
- A página precisa ganhar ritmo e resposta ao scroll sem virar uma experiência pesada.
- A fachada real ambientada permanece exclusiva da Hero.
- Serviços, projetos e institucional podem usar imagens provisórias do Unsplash/Pexels até a chegada do acervo real.
- As imagens provisórias devem ser apresentadas como referências visuais, nunca como trabalhos executados pela Studio.

### Direção aprovada

**Editorial compacta + movimento óptico**, com DFII 15/15.

- Hero com altura natural, composição mais densa e título controlado em três linhas.
- Fachada mais próxima do texto, com recorte que reduz o céu vazio sem esconder a arquitetura.
- Espaçamento vertical máximo reduzido de aproximadamente 136 px para 96 px.
- Cards de serviços em 16:9 e portfólio em grade editorial 4:3, sem cards que ocupam duas linhas completas.
- Imagens provisórias com pelo menos 1600 px no maior eixo sempre que a fonte permitir.
- Uma sequência forte de entrada na Hero e reveals leves nas demais seções.
- Movimento progressivo com `IntersectionObserver`, animando somente `transform`, `opacity` e `clip-path`.
- Conteúdo funcional sem JavaScript e movimentos desativados por `prefers-reduced-motion`.

### Alternativas consideradas

1. **Experiência cinematográfica:** descartada porque manteria parte do vazio vertical e exigiria mais JavaScript.
2. **Galeria comercial minimalista:** descartada por resolver proporções às custas da personalidade da marca.

### Decisões da revisão

| Decisão | Motivo |
| --- | --- |
| Usar CSS e um observador nativo | Mantém performance, acessibilidade e baixa manutenção |
| Não instalar GSAP, Motion ou React | O escopo não justifica runtime adicional |
| Baixar imagens provisórias para o repositório | Evita hotlinks e permite otimização pelo Astro |
| Limitar proporções e alturas | Impede que uma foto de baixa resolução seja tratada como painel gigante |
| Identificar referências visuais | Evita atribuir imagens de banco ao portfólio real da empresa |

### Critérios de aceite da revisão

- A Hero não utiliza `min-height: 100svh` em desktop.
- O título principal aparece em três linhas controladas.
- Nenhum card de portfólio ocupa duas linhas completas do grid.
- As novas imagens provisórias têm resolução adequada aos seus slots.
- A página oferece movimento perceptível em entrada, scroll e hover.
- O conteúdo permanece visível quando JavaScript não executa.
- Usuários com preferência por movimento reduzido não recebem parallax nem reveals.
