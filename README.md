# Paula — Portefólio interativo

Portefólio em português de Portugal, inspirado na ideia de um hero com personagem interativa. Design original em azul suave, carvão e branco, adaptado à ligação entre informática e ciência.

## Executar

Sem instalação nem compilação. Abre `index.html` no navegador, ou executa:

```sh
python3 -m http.server 8080
```

Depois abre http://localhost:8080.

## Interações

- A cabeça e os olhos acompanham o cursor dentro da cena.
- Ao passar pelo centro, a personagem cumprimenta e baixa os auscultadores.
- O botão «Diz-me olá» funciona com rato, toque e teclado.
- Preferências de movimento reduzido são respeitadas.
- Secções Sobre, Projetos, Competências e Contacto, com navegação por âncoras.

A personagem é uma ilustração SVG animada, desenhada para este projeto. Não é um modelo 3D nem um vídeo fotorealista. Para aproximar o acabamento do Reel, pode ser substituída por um modelo 3D com rig ou por vídeos com câmara fixa e diferentes estados de animação.

## Personalizar

- `index.html`: nome, apresentação, projetos e contactos. Não foram inventados anos de experiência, resultados, qualificações ou contactos privados.
- `styles.css`: cores, tipos de letra, composição e animações.
- `app.js`: seguimento do cursor e cumprimento.

O contacto aponta para o perfil GitHub; adicionar email, LinkedIn e CV quando forem fornecidos. Os projetos em desenvolvimento estão identificados e nenhum dado clínico foi incluído. O Google Fonts é opcional: sem rede são usadas as fontes locais de fallback.

## GitHub Pages

Em Settings → Pages, selecionar Deploy from a branch, a branch `main` e a pasta `/ (root)`. Os três ficheiros do site podem ser servidos diretamente por qualquer alojamento estático. Esta configuração de alojamento não foi ativada automaticamente.
