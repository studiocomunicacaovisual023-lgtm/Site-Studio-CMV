# Refinamento final da Home

## Entendimento confirmado

- A Home deve manter a hero, a identidade escura/azul e a linguagem visual já aprovadas.
- O refinamento deve elevar credibilidade, clareza de interação, legibilidade, performance de imagens e SEO local.
- Imagens provisórias podem permanecer, mas nunca devem ser apresentadas como trabalhos reais da Studio.
- O principal caminho de conversão continua sendo o WhatsApp, com mensagens contextualizadas.
- A navegação fixa, o indicador lateral e o CTA final devem comunicar o mesmo estado da página.
- A implementação deve permanecer nativa em Astro, CSS e JavaScript leve, sem novas dependências.
- A entrega deve preservar responsividade, movimento reduzido, navegação por teclado e build estático.

## Premissas

- Os dados de telefone, endereço, e-mail, ano de fundação e domínio presentes em `company.ts` estão aprovados para uso.
- Ainda não existem depoimentos verificados nem logotipos vetoriais adicionais; portanto, nenhum será inventado.
- As páginas individuais de serviços e projetos continuam previstas para uma etapa futura.
- O site permanece em homologação e as imagens de banco continuarão contextualizadas como referências no texto introdutório do portfólio.

## Decisões

1. **Portfólio provisório:** trocar a promessa de prova realizada por uma apresentação honesta de possibilidades, removendo linguagem interna de curadoria.
2. **Cards de projeto:** manter o WhatsApp como destino atual, mas explicitar esse destino visualmente e no nome acessível.
3. **Serviços:** tornar todos os cards acionáveis com mensagens contextuais, eliminando a diferença de comportamento entre destaques e itens compactos.
4. **Clientes:** compactar a faixa e valorizar os três ativos disponíveis sem simular variedade ou qualidade inexistente.
5. **Navegação:** incluir Contato no estado ativo e separar Marcas atendidas no indicador lateral.
6. **Menu móvel:** expor estado aberto/fechado e transformar o ícone de menu em fechamento.
7. **Rodapé:** telefone usará `tel:`, endereço abrirá o mapa e WhatsApp permanecerá uma ação separada.
8. **Legibilidade:** textos informativos terão piso de 12 px e contraste reforçado; micro-rótulos decorativos poderão permanecer menores.
9. **Imagens:** ajustar `sizes` para as larguras reais dos cards e da hero, sem alterar o tratamento visual aprovado.
10. **SEO:** encurtar o título, ampliar a descrição e enriquecer `LocalBusiness` apenas com logo, imagem e área atendida já verificáveis.
11. **Hierarquia dos cards:** remover categoria, selo provisório e numeração visual dos projetos; manter título, descrição e ação como únicos elementos sobre a imagem. A transparência sobre o acervo provisório permanece no texto coletivo da seção.
12. **Ritmo dos serviços em destaque:** manter a assimetria editorial no desktop com o segundo card deslocado em 22 px e reservar 32 px antes da grade compacta; em tablet e mobile, remover o deslocamento e preservar o fluxo empilhado.
13. **Enquadramento da nova fachada:** preservar `object-fit: cover` para preencher a moldura da Hero e manter o eixo horizontal centralizado. Como a nova imagem é vertical, posicionar o foco vertical em 45% para preservar a quina superior direita da fachada sem criar faixas vazias ou alterar a escala; o mesmo foco deve valer nos breakpoints menores. O deslocamento horizontal foi descartado porque não recupera conteúdo perdido pelo recorte vertical.
14. **Fachadas provisórias sem repetição:** separar os papéis visuais dos dois cards que hoje representam fachadas. O destaque de serviço “Fachadas” usará uma composição arquitetônica ampla, limpa e luminosa; o projeto provisório “Fachada comercial” usará uma frente de lojas horizontal com letreiros e iluminação. Ambos permanecem identificados coletivamente como imagens de referência, são armazenados localmente e não reutilizam a fachada institucional da Hero.
15. **Indicador lateral em repouso:** manter número, trilha, progresso e rótulo visíveis enquanto há scroll e recolhê-los após 1,5 segundo sem movimento. No estado inativo, preservar somente o ponto de progresso com baixa opacidade para manter a assinatura visual sem competir com o conteúdo. A retomada deve ser imediata, a transição deve usar apenas opacidade e transformação, o temporizador deve ser limpo no descarte da página e `prefers-reduced-motion` deve continuar removendo as transições.
16. **Imagem do destaque Fachadas:** substituir a referência arquitetônica genérica pela imagem da fachada roxa enviada pelo responsável do projeto. Preservar o selo “Imagem de referência”, armazenar uma cópia local otimizada sem ampliar artificialmente os 1448×1086 px originais e usar `object-fit: cover` com foco vertical em 20%, no terço superior, para preservar integralmente o símbolo, o letreiro e o revestimento. A troca se limita ao primeiro card de serviços e não altera a Hero nem o projeto “Fachada comercial”.
17. **Imagem do projeto Fachada comercial:** substituir a referência noturna do Pexels pela fachada amarela e roxa Cannil Pet enviada pelo responsável. Preservar os 1448×1086 px originais em uma cópia JPEG otimizada, manter o projeto como provisório até confirmação de procedência e usar foco vertical em 20% para priorizar o letreiro. O ponto focal passa a ser um campo opcional da coleção de projetos, permitindo ajustar futuras imagens individualmente sem criar seletores CSS por ordem do card.

## Fora de escopo

- Criar cases ou páginas internas sem conteúdo real.
- Criar depoimentos, avaliações, horários, redes sociais ou faixas de preço não confirmados.
- Substituir o acervo provisório sem novos arquivos aprovados pela Studio.
- Adicionar Motion, GSAP, React ou qualquer dependência de animação.

## Validação

- Testes de conteúdo e conversão em Vitest.
- `astro check` sem erros ou avisos.
- Build estático concluído.
- Inspeção visual em desktop e mobile, incluindo menu, seção de contato e ausência de rolagem horizontal.
