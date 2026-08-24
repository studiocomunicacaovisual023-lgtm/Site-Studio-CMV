# Experimentos WebGL para a Hero

## Entendimento confirmado

- Serão criados três protótipos independentes para comparar interações geométricas na Hero.
- A geometria funcionará como atmosfera interativa, subordinada à fachada real, ao título e às chamadas para orçamento.
- A linguagem visual será própria da Studio, inspirada na curva do símbolo “S”, em planos técnicos de fachada e em pontos de luz.
- Os três protótipos manterão fotografia, texto e composição equivalentes para que a comparação avalie somente a interação.
- A Home atual não será alterada durante os experimentos.
- As páginas experimentais não entrarão na navegação pública.
- A versão escolhida será integrada à Home somente após aprovação visual.

## Premissas e requisitos não funcionais

- Implementação em WebGL nativo, sem Three.js, React ou nova dependência de runtime.
- Meta de 60 fps em desktop e pelo menos 30 fps em dispositivos mais modestos.
- DPR máximo de 1,5 em desktop e 1 no mobile.
- O loop de renderização será pausado quando a Hero não estiver visível.
- No mobile, o movimento será automático e simplificado, sem depender de toque contínuo.
- `prefers-reduced-motion` manterá uma composição estática.
- Falhas ou ausência de WebGL preservarão o fundo escuro e uma malha estática em CSS.
- Nenhum dado de interação será coletado ou enviado.
- O motor compartilhado deverá ser pequeno, documentado e de manutenção local.

## Alternativas consideradas

### Canvas 2D

Mais simples e leve, mas com profundidade e deformação visual inferiores à referência escolhida.

### SVG

Fácil de editar, porém menos adequado para muitos vértices reagindo continuamente ao mouse.

### WebGL nativo — escolhido

Entrega brilho, profundidade, deformação e resposta fluida sem exigir uma biblioteca 3D completa.

## Arquitetura

Um componente de demonstração reutilizará a Hero atual e carregará um motor WebGL compartilhado. O motor receberá a variante como configuração e controlará tempo, ponteiro amortecido, intensidade, raio de influência, paleta, resolução e pausa por visibilidade.

Rotas:

- `/experimentos/geometria-suave/`
- `/experimentos/geometria-magnetica/`
- `/experimentos/geometria-composicoes/`

Cada página terá identificação clara da versão e links para alternar entre os três testes. Nenhuma será vinculada à navegação principal.

## Variantes

### 01 — Reação suave

- Rotação e respiração lentas.
- Inclinação amortecida seguindo o cursor.
- Segmentos próximos ganham brilho e espessura.
- Interação deliberadamente discreta para preservar a conversão.

### 02 — Campo magnético

- O cursor cria um campo de força local.
- Vértices próximos são atraídos e retornam com elasticidade.
- A deformação terá limites para não atravessar texto ou fachada.

### 03 — Composições

- Mantém a reação suave da primeira versão.
- O clique alterna entre curva do “S”, planos de fachada e composição radial de luz.
- A transição entre desenhos será interpolada, sem cortes.

## Acessibilidade, falhas e ciclo de vida

- Canvas decorativo com `aria-hidden="true"`.
- Conteúdo e links permanecem no HTML e funcionam sem WebGL.
- `prefers-reduced-motion` impede o loop contínuo.
- `IntersectionObserver` pausa e retoma a renderização por visibilidade.
- Erro de contexto, compilação ou link de shader ativa o fallback sem bloquear a Hero.
- Redimensionamento atualiza viewport e uniforms sem recriar listeners.
- Listeners e quadro de animação serão encerrados na destruição da página.

## Estratégia de teste

- Carregamento das três rotas e preservação dos links da Hero.
- Ausência de erros de compilação WebGL e console.
- Comparação visual em desktop e mobile.
- Verificação do limite de DPR e resize.
- Pausa fora da viewport.
- Composição estática em movimento reduzido.
- Fallback sem WebGL.
- `astro check`, build e testes automatizados do projeto.

## Riscos reconhecidos

- WebGL aumenta o custo de manutenção em comparação ao CSS atual.
- Um efeito forte pode competir com fotografia e texto; por isso a opacidade e a área de influência serão limitadas.
- GPUs antigas podem rejeitar shaders ou apresentar desempenho baixo; o fallback é obrigatório.
- A versão com campo magnético pode ser visualmente excessiva e existe principalmente para comparação.

## Decision Log

| Decisão | Alternativas | Motivo |
| --- | --- | --- |
| Manter fachada como protagonista | Geometria como elemento principal | Preserva autenticidade e força comercial |
| Criar linguagem própria da Studio | Reproduzir poliedros da KAMALEOM | Evita cópia e fortalece identidade |
| Criar três rotas isoladas | Alterar a Home a cada teste | Permite comparação sem risco para a página atual |
| WebGL nativo | Canvas 2D, SVG ou Three.js | Maior qualidade visual sem dependência grande |
| Compartilhar o motor | Três implementações completas | Comparação justa e menor manutenção |
| Pausar fora da viewport | Loop permanente | Reduz consumo de CPU e bateria |
| Fallback e movimento reduzido | Exigir WebGL e animação | Mantém robustez e acessibilidade |
