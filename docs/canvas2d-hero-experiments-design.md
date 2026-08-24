# Experimentos Canvas 2D para a Hero

## Entendimento confirmado

- Serão criados três protótipos Canvas 2D independentes para comparação prática com o laboratório WebGL.
- A fachada real, a mensagem e as chamadas comerciais permanecerão idênticas entre as versões.
- A geometria será autoral da Studio: curva inspirada no símbolo “S”, desenho técnico de fachada e pulso de luz.
- A Home e as três rotas WebGL existentes permanecerão inalteradas.
- As páginas serão protótipos isolados, sem entrada na navegação pública e com `noindex`.
- A solicitação atual do usuário confirma a abordagem Canvas 2D e autoriza a implementação das três variações.

## Premissas e requisitos não funcionais

- Canvas 2D nativo, sem dependência adicional e sem coleta ou transmissão de dados.
- Meta de 60 fps em desktop e pelo menos 30 fps em dispositivos modestos.
- DPR máximo de 1,5 em desktop e 1 em dispositivos de ponteiro coarse.
- `requestAnimationFrame` será pausado fora da viewport e quando a aba estiver oculta.
- `prefers-reduced-motion` produzirá um quadro estático.
- No mobile, o movimento será automático e não dependerá de toque contínuo.
- Ausência ou perda do contexto 2D manterá o SVG estático já usado pelo laboratório.
- A estrutura visual será compartilhada com o WebGL para evitar divergência e duplicação.
- Manutenção local por TypeScript estrito; nenhuma API, segredo ou serviço externo é necessário.

## Direção visual

**Aesthetic:** blueprint cinético industrial.

**Âncora de diferenciação:** linhas técnicas azuis que formam a curva do símbolo e planos de fachada, com nós luminosos e deformação localizada. Mesmo sem o logotipo, a combinação deve remeter a sinalização, projeto e iluminação arquitetônica.

**DFII:** 15 — impacto 4, aderência à marca 5, viabilidade 5, segurança de performance 5, risco de consistência 4.

**FFCI:** 9 — boa aderência à arquitetura e alta reutilização, com complexidade moderada no motor de desenho e interação.

## Alternativas consideradas

### Três componentes independentes

Facilitaria ajustes isolados, porém repetiria toda a Hero e elevaria o risco de versões visualmente inconsistentes.

### Biblioteca gráfica externa

Ofereceria utilitários de cena, mas aumentaria bundle e manutenção sem necessidade para linhas, curvas e partículas simples.

### Estrutura compartilhada + motor Canvas 2D nativo — escolhida

Mantém a comparação justa, preserva o laboratório WebGL e concentra o comportamento Canvas em uma feature pequena e testável.

## Arquitetura

O componente experimental atual será generalizado para receber `renderer="webgl"` ou `renderer="canvas2d"`. Fotografia, copy, botões, responsividade e navegação continuarão compartilhados. Cada motor localizará somente seu próprio canvas por atributo de dados.

Rotas Canvas 2D:

- `/experimentos/canvas-fluxo/`
- `/experimentos/canvas-magnetico/`
- `/experimentos/canvas-composicoes/`

O motor `canvas2d-hero` controlará resolução, ponteiro amortecido, tempo, visibilidade, movimento reduzido e ciclo de vida. As primitivas serão agrupadas em caminhos para reduzir mudanças de estado e chamadas de desenho.

## Variantes

### 01 — Fluxo caligráfico

- Curva principal inspirada no “S” e uma segunda fita paralela.
- Respiração e inclinação suaves.
- Brilho localizado acompanha o cursor sem deslocar agressivamente a forma.

### 02 — Malha elástica

- Planos de fachada formados por vértices e conexões.
- O cursor cria uma deformação radial limitada.
- Pontos retornam à base por amortecimento visual, preservando legibilidade.

### 03 — Composições vivas

- Alterna entre Curva Studio, Fachada técnica e Pulso de luz.
- Troca automática lenta e controle por clique.
- A transição usa dissolução cruzada para não introduzir cortes bruscos.

## Acessibilidade, desempenho e falhas

- Canvas decorativo com `aria-hidden="true"`; toda informação permanece no HTML.
- Fundo e SVG estático continuam disponíveis antes da inicialização ou em caso de falha.
- O canvas é redimensionado por `ResizeObserver` e escalado pelo DPR limitado.
- `IntersectionObserver`, visibilidade da página e movimento reduzido controlam o loop.
- Eventos, observadores e quadros de animação serão removidos em `pagehide`.
- O desenho não usa texto, imagens, filtros pesados contínuos ou física externa.

## Estratégia de teste

- Testes unitários para configuração, DPR, ciclo de composições e interpolação.
- Build contendo as três rotas e seus atributos de inicialização.
- Preservação das três rotas WebGL e ausência do experimento na Home.
- Validação de contexto, observadores, movimento reduzido e cleanup no código-fonte.
- Teste visual e interativo em desktop e mobile, incluindo troca de composição e console.
- `astro check`, testes completos, build de produção e `git diff --check`.

## Riscos reconhecidos

- Canvas 2D oferece menos profundidade volumétrica que WebGL; a proposta assume uma estética mais gráfica e arquitetônica.
- Muitas linhas podem competir com o título; posicionamento, alfa e área de influência serão calibrados visualmente.
- O desenho é imperativo e exige disciplina de cleanup; testes de contrato e validação do navegador cobrirão o ciclo de vida.

## Decision Log

| Decisão | Alternativas | Motivo |
| --- | --- | --- |
| Compartilhar a Hero entre Canvas e WebGL | Duplicar componentes | Comparação justa e menor manutenção |
| Canvas 2D nativo | Biblioteca externa | Bundle menor e APIs suficientes |
| Linguagem blueprint da Studio | Poliedro genérico | Identidade própria e vínculo com fachadas |
| Três rotas isoladas | Substituir a Home | Aprovação sem risco para a página atual |
| Ciclo automático somente na composição 03 | Autoplay em todas | Movimento expressivo sem excesso constante |
| DPR limitado e pausa por visibilidade | Renderização máxima contínua | Melhor consumo de CPU e bateria |
| SVG como fallback | Canvas obrigatório | Robustez e acessibilidade |
