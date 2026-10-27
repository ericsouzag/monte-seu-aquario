# Monte Seu Aquário

App (PWA) complementar aos guias de aquário plantado low-tech do professor Eric.
Wizard "Monte o seu", catálogo de 75 modelos, plantas e substituições, diagnóstico e manutenção.

## Instalar no celular

- **Android (Chrome):** abra o link → menu ⋮ → *Instalar app* (ou *Adicionar à tela inicial*).
- **iPhone (Safari):** abra o link → botão Compartilhar → *Adicionar à Tela de Início*.

Depois do primeiro acesso o app funciona offline (as imagens ficam guardadas conforme você as abre).

## Estrutura

- `index.html` — o app inteiro (HTML + CSS + JS, sem build)
- `img/` — imagens dos modelos (autorais), plantas, diagnóstico e manutenção
- `manifest.webmanifest`, `sw.js`, `icons/` — instalação e cache offline

## Atualizar o cache

Ao mudar `index.html` ou as imagens, troque `VERSION` em `sw.js` para os celulares pegarem a versão nova.

Todos os direitos reservados. Conteúdo dos guias do professor Eric.
