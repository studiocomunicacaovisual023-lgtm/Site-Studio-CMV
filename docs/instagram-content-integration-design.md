# Integração do Instagram e preparação do acervo

## Entendimento confirmado

- A comunicação pública deve usar `+10 anos`, evitando uma idade que envelheça ou conflite com o Instagram.
- O perfil `@studio_comunicacao_visual` é o canal oficial a ser ligado ao site.
- Acrílico, corte a laser, gráfica rápida e brindes são áreas estratégicas e devem aparecer como serviços reais.
- A Home deve manter fachadas e comunicação visual de maior impacto como primeiro nível de hierarquia.
- O Instagram será usado como prova de atividade e porta de saída, sem feed incorporado ou scripts de terceiros.
- O portfólio continuará provisório até a chegada e aprovação dos arquivos originais.
- A estrutura de conteúdo deve ficar pronta para galerias e dados completos dos futuros cases.

## Assunções e requisitos não funcionais

- O endereço público do perfil permanecerá `https://www.instagram.com/studio_comunicacao_visual/`.
- Links externos terão nome acessível, indicador visual e `rel="noreferrer"`.
- A inclusão de serviços não adicionará dependências nem scripts de terceiros.
- O grid continuará responsivo e os novos cards reutilizarão o componente existente.
- Astro Assets continua adequado para o primeiro lote; CDN e CMS ficam adiados até haver volume ou autonomia editorial.
- Dados de autorização e origem serão armazenados no conteúdo, mas não expostos automaticamente na interface.

## Abordagens consideradas

### 1. Serviços estratégicos no grid existente — escolhida

Transforma “Projetos personalizados” em “Acrílico e corte a laser” e adiciona gráfica rápida e brindes como cards acionáveis. Mantém todos os serviços com o mesmo nível de acesso ao orçamento, enquanto as duas soluções principais continuam em destaque fotográfico.

### 2. Serviços novos em uma faixa secundária

Preservaria o grid atual, mas comunicaria que gráfica rápida e brindes têm importância menor. Foi rejeitada porque o cliente confirmou que são áreas estratégicas.

### 3. Adiar para páginas internas

Reduziria a densidade da Home, porém manteria uma diferença entre a oferta real e a oferta apresentada. Foi rejeitada nesta etapa.

## Decisões

1. Exibir `+10` na prova visual e “mais de 10 anos” na redação corrente.
2. Não publicar o ano de fundação como argumento de marketing até que a inconsistência histórica seja resolvida.
3. Adicionar Instagram na área institucional, no rodapé e em `sameAs` do JSON-LD.
4. Não incorporar feed do Instagram, preservando performance, privacidade e controle editorial.
5. Exibir dez serviços: dois destaques e oito cards compactos.
6. Preparar o schema de projetos com galeria, cliente, materiais, desafio, solução, resultado, origem e aprovação.
7. Criar um guia de recebimento e um manifesto CSV para o primeiro lote do acervo.

## Validação

- Testes de regressão para idade, Instagram, serviços, schema e arquivos de coleta.
- `astro check`, suíte completa e build estático.
- Inspeção visual do grid, CTA institucional e rodapé em navegador local.
