# atividade-threejs-sketchfab

## Atividade Pratica - Three.js + Sketchfab

Projeto desenvolvido para uma atividade pratica usando Three.js, GLTFLoader e OrbitControls.

## Modelo utilizado

Nome do modelo: Simple Low Poly Character  
Origem: https://sketchfab.com/3d-models/simple-low-poly-character-5ee952af02634ffeab649ab9fba66bfb  
Autor: PIXELOKAY  
Licenca: CC Attribution  
Formato usado no projeto: GLB

O arquivo principal esperado pelo projeto e `public/models/simple-low-poly-character.glb` e e carregado pela aplicacao com `GLTFLoader`.

Observacao: o Sketchfab exige login para baixar o arquivo original. Baixe o modelo pela pagina acima em formato GLB/glTF e coloque o arquivo como `public/models/simple-low-poly-character.glb`. Enquanto esse arquivo nao estiver na pasta, a aplicacao usa `public/models/sketchfab-sample.gltf` como fallback apenas para manter a cena funcionando.

## Tecnologias

- HTML
- CSS
- JavaScript
- Three.js
- Vite

## Funcionalidades

- Carregamento de modelo 3D com GLTFLoader
- Controle de camera com OrbitControls
- Rotacao, zoom e pan com mouse ou touch
- Luz ambiente e luz direcional
- Loop de animacao com requestAnimationFrame
- Ajuste automatico do renderer e da camera ao redimensionar a janela

## Como executar

```bash
npm install
npm run dev
```
