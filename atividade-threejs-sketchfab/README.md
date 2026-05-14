# atividade-threejs-sketchfab

## Atividade Pratica - Three.js + Sketchfab

Projeto desenvolvido para uma atividade pratica usando Three.js, GLTFLoader e OrbitControls.

## Modelo utilizado

Nome do modelo: Black Cat  
Origem: https://sketchfab.com/3d-models/black-cat-4e001843d9774d7eb5e48d59f2bf14f5  
Autor: Kinga Kroliczek  
Licenca: CC-BY-4.0  
Formato usado no projeto: glTF

O arquivo principal do modelo esta em `public/models/scene.gltf` e e carregado pela aplicacao com `GLTFLoader`.

Como o arquivo glTF referencia recursos externos, mantenha tambem o `scene.bin` e a pasta `textures/` dentro de `public/models/`.

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
