# Fontes das imagens provisórias

## Logo oficial atual

- Arquivo: `src/assets/company/studio-logo-final.png`.
- Fonte: `LOGO STUDIO FINAL (1).png`, fornecido pelo responsável em 14 de outubro de 2026.
- PNG original de 3419×962 px, com transparência preservada, sem redesenho ou alteração de cores.
- Uso: logo completa no cabeçalho, rodapé e dados estruturados da Home. O Astro entrega versões responsivas otimizadas; o símbolo quadrado permanece como favicon.

## Prévia de compartilhamento (Open Graph)

- Arquivo usado: `public/og-studio.jpg`, derivado da composição existente em `public/og.png`.
- Otimização em 10 de outubro de 2026: JPEG com qualidade 88, sem transparência, mantendo 1200×630 px. O arquivo passou de 1.063.104 para 114.149 bytes.
- O PNG original continua disponível para preservar links anteriores.
- URL pública: `https://www.studiocmv.com.br/og-studio.jpg`; o domínio com `www` corresponde ao destino final da hospedagem. Canonical, Open Graph, Twitter Card, JSON-LD e sitemap usam esse mesmo domínio.
- A validação pública inicial encontrou HTTP 200 tanto no HTML quanto no PNG, inclusive ao solicitar o HTML com o agente `facebookexternalhit`. O redirecionamento do domínio sem `www` e o peso do PNG foram melhorados, mas não comprovam por si só a causa da prévia sem imagem no WhatsApp.
- Para verificar a publicação: confirmar HTTP 200 e `Content-Type: image/jpeg` no JPEG, conferir `og:image` no HTML público e testar um compartilhamento novo. Prévias já armazenadas pelo aplicativo podem precisar de nova leitura; mudar a URL da imagem não garante a invalidação do cache do link.

## Site atual da Studio

Os arquivos em `src/assets/company/` foram recuperados do domínio atual da própria empresa, `studiocmv.com.br`, para preservar ativos já publicados durante a fundação do novo site.

Eles permanecem sujeitos à validação do proprietário e não devem ser tratados automaticamente como fotografias de projetos executados.

## Galeria de equipamentos na seção A Studio

- Imagem inicial preservada: `src/assets/company/studio-impressora.png`, já usada no site. A galeria não afirma um modelo específico além da marca visível.
- Seis novos arquivos em `src/assets/generated/equipment/`: router CNC, plotter de grande formato, impressora de alta resolução, corte a laser, gravação a laser em metal e impressora da categoria Konica para gráfica rápida.
- Fonte da seleção: lista enviada pelo responsável em 2 de setembro de 2026, no arquivo `codex-clipboard-892071c4-e8a5-48ee-823f-34716a094a92.png`.
- Produção das novas imagens: uma chamada da ferramenta integrada por equipamento, sem CLI e sem alteração posterior do PNG. Todas têm 1448×1086 px (4:3) e são entregues pelo Astro em WebP responsivo.
- Natureza: representações ilustrativas das categorias informadas. Sem fotos ou modelos exatos dos equipamentos, as imagens não comprovam o acervo, as dimensões nem as capacidades técnicas das máquinas reais. A legenda “Imagem ilustrativa” acompanha as seis novas imagens, sem selo sobre o equipamento.
- Apresentação: imagem inteira com `object-fit: contain`, troca a cada 5 segundos, seleção manual, pausa/retomada, pausa fora da tela ou em aba oculta e respeito a movimento reduzido. A seleção manual fica parada até o visitante retomar.
- Refinamento do card: aproximadamente 17% mais largo no desktop, área de imagem ampliada, selo superior mais compacto e pausa sem fundo junto aos indicadores. A foto de detalhe ocupa uma área menor; a composição móvel mantém dimensões próprias.
- Arquivos e prompts exatos: [registro das imagens](prompts/equipment-gallery-images.md).

As fotografias reais e os modelos devem substituir as representações quando forem enviados. O selo “Acervo Studio” permanece associado apenas à fotografia menor já existente, fora da galeria.

## Hero atual

- Arquivo: `src/assets/company/studio-facade-hero-daylight.png`
- Fonte: imagem fornecida pelo responsável do projeto em 2 de setembro de 2026, no arquivo `ChatGPT Image 2 de set. de 2026, 11_00_02.png`.
- Tratamento nesta integração: cópia integral do PNG de 1449×1086 px, sem retoque ou recorte destrutivo. O Astro entrega versões WebP responsivas, limitadas à largura original.
- Enquadramento: card responsivo com proporção 6:5, `object-fit: cover` e centralização. A altura integral da foto é mantida, com corte apenas nas faixas externas dos muros laterais. O zoom interno e a aproximação animada foram removidos para preservar o topo, a entrada e a base da fachada em todos os tamanhos; a iluminação e os movimentos do card inteiro permanecem.
- Uso: Hero da Home, identificada como “Fachada da Studio • Teresina, PI”. A procedência foi informada pelo responsável; esta integração não verifica tratamentos anteriores da imagem.

## Hero anterior e laboratórios

- Arquivo: `src/assets/company/studio-facade-hero-v3.png`
- Fonte primária: fotografia da fachada atual fornecida pelo responsável do projeto.
- Tratamento: ambientação digital gerada com a ferramenta integrada de edição de imagens, preservando a arquitetura e a identidade visual da fachada.
- Uso: preservada nos laboratórios experimentais e como referência da Hero anterior. Não é mais carregada pela Hero da Home.

O arquivo anterior foi preservado para comparação e rollback.

A fotografia original continua sendo a referência autoritativa. A versão ambientada não deve ser apresentada como registro documental da iluminação real instalada.

## Imagem enviada para o destaque Fachadas

- Arquivo: `src/assets/company/studio-acai-facade-reference.jpg`
- Fonte: imagem fornecida pelo responsável do projeto em 23 de agosto de 2026.
- Tratamento: conversão local do PNG original para JPEG com qualidade 88, preservando os 1448×1086 px e sem ampliação artificial.
- Uso: primeiro card de serviço, “Fachadas”, identificada na interface como “Imagem de referência”.

Até que a procedência e a execução do projeto sejam confirmadas pela Studio, esta imagem não deve ser apresentada como registro de um trabalho realizado pela empresa.

## Imagem ilustrativa para o destaque Adesivos

- Arquivo atual: `src/assets/generated/studio-fleet-wrap-mixed.png`
- Fonte: composição editada em 2 de setembro de 2026 com a ferramenta integrada de geração de imagens, mantendo o carro iNET da versão anterior e substituindo os veículos do fundo por uma van Açaí Gurupi e um ônibus preto e azul, a partir das referências enviadas pelo responsável.
- Referências recebidas: `codex-clipboard-00642cdb-3925-45cd-abfb-fbb1a42fe4e0.png` (van) e `codex-clipboard-5d848373-81d1-49cd-90dc-5e024c83fb11.png` (ônibus). O responsável informou que ambos são serviços realizados pela Studio.
- Dimensões efetivas: 1672×941 px, aproximadamente 16:9. O PNG foi integrado sem ampliação artificial; o Astro entrega versões WebP responsivas até a largura original.
- Uso: segundo destaque da seção Serviços, “Adesivos”, com foco em padronização de frotas. O enquadramento é centralizado e o degradê inferior preserva a leitura do texto.
- Interface: sem tag sobre a imagem, conforme solicitação do responsável. O texto alternativo descreve a composição e os três tipos de veículo.
- Prompt e parâmetros atuais: [registro da composição](prompts/fleet-wrap-mixed-image.md).
- Versão anterior: `src/assets/generated/studio-fleet-wrap.png`, com três carros iNET, preservada para comparação. [Registro da primeira geração](prompts/fleet-wrap-image.md).

As fotografias enviadas são as referências dos envelopamentos; a reunião dos veículos no mesmo pátio é uma composição digital. Ela não documenta os três veículos juntos nem substitui os originais como registro fiel de cada aplicação. Alguns detalhes pequenos dos adesivos foram simplificados pela geração.

## Imagem enviada para o projeto Fachada comercial

- Arquivo: `src/assets/company/studio-cannil-pet-facade-reference.jpg`
- Fonte: imagem fornecida pelo responsável do projeto em 23 de agosto de 2026.
- Tratamento: conversão local do PNG original para JPEG com qualidade 88, preservando os 1448×1086 px e sem ampliação artificial.
- Uso: primeiro card da seção Projetos, “Fachada comercial”, com foco vertical em 20% para preservar o letreiro.

Até que a procedência e a execução do projeto sejam confirmadas pela Studio, esta imagem permanece tratada como referência visual provisória.

## Hero provisório anterior

- Arquivo: `src/assets/placeholders/hero-night-facade.jpg`
- Fonte: Unsplash
- Página: <https://unsplash.com/photos/xzqpkQsg04E>
- Uso anterior: composição provisória da primeira dobra.

O arquivo foi preservado apenas como referência de desenvolvimento e não é mais carregado pela Home.

## Imagens provisórias em alta resolução

As imagens abaixo são referências visuais temporárias e não representam trabalhos executados pela Studio. A interface identifica esse uso com o selo “Imagem de referência”. Todas foram baixadas com 2400 px no maior lado e serão substituídas durante a curadoria do acervo real.

- `src/assets/stock/stock-facade-service-unsplash.jpg`
  - Fonte: Unsplash, foto de Aalo Lens — <https://unsplash.com/photos/modern-building-with-glass-facade-and-illuminated-storefronts-nc5NrVH5Vc8>
  - Uso anterior: destaque do serviço Fachadas; preservada apenas para comparação e rollback.
- `src/assets/stock/stock-commercial-facade-pexels.jpg`
  - Fonte: Pexels, foto de Erik Mclean — <https://www.pexels.com/photo/illuminated-exterior-of-a-store-in-city-8919461/>
  - Uso anterior: projeto provisório Fachada comercial; preservada apenas para comparação e rollback.
- `src/assets/stock/stock-storefront-unsplash.jpg`
  - Fonte: Unsplash — <https://unsplash.com/photos/modern-building-entrance-with-glass-doors-and-signage-N8GMe94jvdQ>
  - Uso anterior: destaque do serviço Fachadas; preservada apenas para comparação e rollback.
- `src/assets/stock/stock-wrap-pexels.jpg`
  - Fonte: Pexels — <https://www.pexels.com/photo/man-working-on-a-car-17641807/>
  - Uso: adesivação e envelopamento.
- `src/assets/stock/stock-wrap-detail-pexels.jpg`
  - Fonte: Pexels — <https://www.pexels.com/photo/a-man-wrapping-a-car-hood-10126665/>
  - Uso: comunicação para veículos.
- `src/assets/stock/stock-printshop-a-unsplash.jpg`
  - Fonte: Unsplash — <https://unsplash.com/photos/Tzm3Oyu_6sk>
  - Uso: impressão e produção gráfica.
- `src/assets/stock/stock-printshop-b-unsplash.jpg`
  - Fonte: Unsplash — <https://unsplash.com/photos/CYrYxz-uvE4>
  - Uso: estrutura de produção.
- `src/assets/stock/stock-wayfinding-pexels.jpg`
  - Fonte: Pexels — <https://www.pexels.com/photo/black-and-white-picture-of-signs-with-directions-under-a-pavilion-16317953/>
  - Uso: sinalização e acabamento de ambientes.
