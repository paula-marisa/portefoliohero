# Paula Rodrigues — Portefólio

Portefólio pessoal em português de Portugal e inglês simples, com a assinatura **paula.**. Inclui seis projetos, competências, formação, experiência profissional e contactos.

## Abrir no computador

Abrir `index.html` no navegador ou usar a extensão Live Server do VS Code. Não são necessários Python, instalação de dependências ou compilação.

## Funcionalidades

- Seletor PT / EN: conteúdo, descrições, etiquetas acessíveis, detalhes dos projetos e mensagens dinâmicas.
- Idioma guardado no navegador, quando o armazenamento está disponível. `?lang=en` e `?lang=pt` permitem escolher o idioma ao abrir a página. Português por predefinição.
- Assinatura **paula.**, temas claro e escuro e navegação móvel.
- Filtros de projetos e diálogo de detalhes com gestão do foco.
- Quadro interativo com três perspetivas: interfaces, dados e rigor. Navegação por teclado com setas, Home e End.
- Formação relevante no próprio portefólio, com listas expansíveis de cursos e certificações.
- Contacto por email, cópia do endereço, LinkedIn e GitHub.
- Movimento reduzido e foco visível.

## Ficheiros

- `index.html`: dados e estrutura em português.
- `app.js`: tradução inglesa, preferências e interações.
- `styles.css`: desenho, temas e adaptação a ecrãs diferentes.
- `assets/`: imagens WebP dos projetos, guardadas neste repositório.
- `favicon.svg`: assinatura visual.

Os dados foram adaptados do portefólio fornecido pela utilizadora. Os nomes oficiais dos projetos, instituições, tecnologias e cursos mantêm-se. Não foram acrescentados resultados, métricas ou cargos que não estivessem documentados. A personagem tem estilo de desenho animado 3D, inspirado na fotografia fornecida pela utilizadora. A interação alterna entre três poses rasterizadas alinhadas (esquerda, direita e cumprimento); não utiliza um modelo 3D nem animação esquelética. A fotografia original não faz parte do repositório.

O Google Fonts é opcional: sem ligação são usadas fontes locais. As imagens e a informação de formação não dependem do portefólio anterior. As ligações externas levam ao código, às demonstrações, ao GitHub e ao LinkedIn.

## Publicação

Em GitHub Settings → Pages, escolher Deploy from a branch, `main` e `/ (root)`. O projeto pode ser servido por qualquer alojamento estático.

## Validação desta versão

Verificada a sintaxe JavaScript, a estrutura HTML, os destinos da navegação, a cobertura das traduções e a existência dos recursos locais. Testes com DOM simulado verificaram a mudança entre os dois idiomas, a preferência guardada, as etiquetas acessíveis, a contagem de projetos, a atualização de um diálogo aberto e o funcionamento do quadro por teclado. Não foi feita validação visual num navegador nesta atualização.


### Personagem interativa

`assets/paula-cartoon-poses-v2.webp` contém três poses com transparência. O cursor escolhe a direção do olhar; o centro e o botão ativam o cumprimento. As transições respeitam movimento reduzido. A imagem foi gerada com a ferramenta integrada a partir do pedido: personagem inspirada na referência, estilo de desenho animado fofo, olhos expressivos, cabelo castanho comprido, auscultadores azul-bebé e três poses com câmara fixa. Na terceira pose, o braço direito está levantado para cumprimentar e a mão esquerda repousa junto ao portátil; sem mãos adicionais. A transparência foi preservada na conversão WebP.

Validação: sintaxe JavaScript, transparência e integridade do recurso, e testes com DOM simulado para esquerda/direita, cumprimento, reposição da pose e movimento reduzido. A integração visual no navegador não foi verificada nesta atualização.


### Pose inicial de trabalho

A personagem começa na pose `idle`, de frente e concentrada no portátil, sem cumprimento. Só muda a direção com `pointermove` sobre a personagem e regressa à pose inicial em `pointerleave`. O cumprimento é ativado pelo botão. A pose adicional `assets/paula-cartoon-idle.webp` foi gerada com a mesma referência, auscultadores colocados e sem acenar. Foram testados o início neutro, as direções, o centro sem cumprimento automático, o regresso ao trabalho, o botão e o movimento reduzido.
