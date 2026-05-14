import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="viewer-shell">
    <header class="viewer-header">
      <div>
        <p class="eyebrow">Three.js + Sketchfab (Marcos UP2)</p>
        <h1>3D</h1>
      </div>
      <p class="status" id="model-status">Carregando modelo...</p>
    </header>
    <canvas class="webgl" aria-label="Cena 3D interativa"></canvas>
  </main>
`

const canvas = document.querySelector('.webgl')
const statusElement = document.querySelector('#model-status')

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf4f1ea)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
)
camera.position.set(3.2, 2.3, 4.2)

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputColorSpace = THREE.SRGBColorSpace

const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(4, 6, 5)
scene.add(directionalLight)

const fillLight = new THREE.DirectionalLight(0xbfd7ff, 0.9)
fillLight.position.set(-3, 2, -4)
scene.add(fillLight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enablePan = true
controls.enableZoom = true
controls.target.set(0, 0.75, 0)
controls.update()

const loader = new GLTFLoader()
const modelSources = [
  {
    path: '/models/scene.gltf',
    label: 'Black Cat',
  },
]

function loadModel(sourceIndex = 0) {
  const source = modelSources[sourceIndex]

  loader.load(
    source.path,
    (gltf) => {
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      const maxAxis = Math.max(size.x, size.y, size.z)
      const scale = maxAxis > 0 ? 2.4 / maxAxis : 1

      model.position.sub(center)
      model.position.y += 0.8
      model.scale.setScalar(scale)
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      scene.add(model)
      statusElement.textContent = `${source.label} carregado`
    },
    undefined,
    (error) => {
      statusElement.textContent = 'Erro ao carregar o modelo'
      console.error('Erro ao carregar o modelo GLB:', error)
    },
  )
}

async function loadFirstAvailableModel() {
  for (const [index, source] of modelSources.entries()) {
    const response = await fetch(source.path).catch(() => null)
    const contentType = response?.headers.get('content-type') ?? ''
    const isModelFile =
      contentType.includes('model/gltf') ||
      contentType.includes('model/gltf-binary') ||
      contentType.includes('application/octet-stream')

    if (response?.ok && isModelFile) {
      loadModel(index)
      return
    }
  }

  statusElement.textContent = 'Nenhum modelo encontrado'
}

loadFirstAvailableModel()

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', handleResize)

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
