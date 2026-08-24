# Hero — Acendimento e profundidade cinematográfica

## Entendimento aprovado

- A Hero da Home precisa ganhar vida sem alterar sua estrutura comercial.
- A fachada real permanece como protagonista visual.
- A animação deve reforçar o trabalho da Studio, não funcionar como efeito abstrato.
- O texto, os CTAs, o enquadramento e a legibilidade atuais devem ser preservados.
- Os experimentos WebGL e Canvas 2D permanecem isolados e não serão integrados à Home.
- A solução deve continuar leve, responsiva e compatível com a arquitetura Astro existente.

## Assumptions

- O efeito será decorativo e não transmitirá informação indispensável.
- A fotografia atual é o único ativo necessário para a primeira implementação.
- A profundidade reagirá ao cursor somente em dispositivos com ponteiro preciso.
- Em dispositivos de toque, o movimento será automático e mais discreto.
- Não serão adicionadas bibliotecas de animação para este efeito.

## Conceito final

A fachada começa aproximadamente 25% mais escura. Uma segunda camada da mesma fotografia é revelada progressivamente da esquerda para a direita, criando a sensação de que a comunicação visual está sendo ligada. Ao fim da entrada, o letreiro e os elementos azuis recebem um reforço de luminosidade.

Durante o estado de repouso, a imagem mantém profundidade cinematográfica sutil:

- deslocamento de 4 a 8 pixels em resposta ao cursor;
- movimento automático mais contido no mobile;
- reflexo azul ocasional atravessando a composição;
- pulso lento do ponto luminoso lateral;
- respiração luminosa discreta no letreiro;
- texto e CTAs completamente estáveis.

## Direção técnica

- Implementação com CSS, camadas da imagem existente e um script TypeScript pequeno.
- Uso de propriedades CSS para comunicar a posição suavizada do ponteiro.
- Transformações restritas a `transform`, `opacity`, máscara e gradientes.
- Inicialização e limpeza compatíveis com o ciclo de vida atual da página Astro.
- Pausa do movimento quando a Hero estiver fora da viewport ou quando a página estiver oculta.
- Nenhuma nova dependência de runtime.

## Acessibilidade e movimento reduzido

Quando `prefers-reduced-motion: reduce` estiver ativo:

- a fachada será exibida completamente iluminada;
- o acendimento progressivo será removido;
- parallax, respiração luminosa e reflexos contínuos serão desativados;
- conteúdo e controles continuarão visualmente idênticos ao estado final da animação.

## Critérios de sucesso

- Entrada completa entre 1,4 e 1,8 segundo.
- Movimento percebido como premium e não como banner publicitário.
- Nenhum deslocamento do texto ou dos CTAs no estado de repouso.
- Sem rolagem horizontal ou mudança no layout da Hero.
- Sem regressão no enquadramento da fachada em desktop e mobile.
- Animação pausada fora da viewport e com a página oculta.
- Build, typecheck e testes existentes aprovados.
- Validação visual em desktop, mobile e preferência por movimento reduzido.

## Alternativas consideradas

### Geometria WebGL ou Canvas 2D

Descartada para a Home porque compete com a fachada e comunica mais uma demonstração técnica do que o serviço real da Studio.

### Transição dia para noite

Mantida como possibilidade futura, mas não escolhida agora para evitar uma leitura equivocada de “antes e depois” e a necessidade de sincronizar duas fotografias.

### Profundidade cinematográfica completa por camadas recortadas

Simplificada para uma única fotografia em camadas duplicadas. A versão com céu, fachada e primeiro plano separados adicionaria mais produção de ativos e manutenção sem necessidade comprovada.

## Registro de decisões

1. **Fachada como fonte do movimento.** A animação demonstra visualmente o valor entregue pela Studio.
2. **Acendimento progressivo como momento principal.** Cria impacto inicial com duração curta e propósito claro.
3. **Profundidade limitada ao plano visual.** Texto e ações não acompanham o cursor.
4. **CSS e TypeScript nativos.** Evita dependências e mantém a entrega leve.
5. **Movimento reduzido como estado estático final.** A experiência permanece completa sem animação.
6. **Experimentos preservados, mas isolados.** Nenhuma rota experimental será removida nesta etapa.
