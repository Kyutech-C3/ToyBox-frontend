<template>
  <div>
    <div
      id="scene-container"
      :class="{ ' pointer-events-none': !mouseControl }"
      ref="sceneContainer"
    />
    <span
      v-if="!fullscreen"
      class="
        material-symbols-outlined
        cursor-pointer
        transition-all
        text-2xl
        select-none
        absolute
        rounded-full
        px-1
        text-black
        bg-white bg-opacity-30
        z-40
        bottom-3
        right-3
      "
      @click="showFullscreen()"
    >
      fullscreen
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { Ref } from '@nuxtjs/composition-api'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import {
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  WebGLRenderer,
  Color,
  AmbientLight,
  sRGBEncoding,
  AnimationMixer,
  Clock
} from 'three'
import { fullscreenStore } from '@/store'
import { Asset } from '@/types'

@Component({})
export default class ModelViewer extends Vue {
  container!: Ref<HTMLElement>
  scene!: Scene
  renderer!: WebGLRenderer
  camera!: PerspectiveCamera
  controls!: OrbitControls
  url!: string
  width!: number
  height!: number
  mouseX!: number
  rot!: number
  directionalLight!: DirectionalLight
  count: number = 1
  clock = new Clock()

  mounted() {
    this.init()
  }

  @Prop({ type: Object, required: true })
  model!: Asset

  @Prop({ type: Boolean, required: false, default: false })
  fullscreen!: boolean

  @Prop({ type: Boolean, required: false, default: true })
  mouseControl!: boolean

  setFullscreen(boolean: boolean) {
    fullscreenStore.setFullscreen(boolean)
  }

  setAsset(asset: Asset) {
    fullscreenStore.setAsset(asset)
  }

  showFullscreen() {
    this.setAsset(this.model)
    this.setFullscreen(true)
  }

  init() {
    // set container
    this.container = this.$refs.sceneContainer
    // add camera
    this.width = this.container.clientWidth
    this.height = this.container.clientHeight
    if (this.width < 768) {
      this.width = this.container.clientWidth
      this.height = this.container.clientHeight
    }
    const fov = 45 // Field of view
    const aspect = this.width / this.height
    const near = 1 // the near clipping plane
    const far = 10000 // the far clipping plane
    const camera = new PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(500, 400, 1000)
    this.camera = camera
    // create scene
    this.scene = new Scene()
    this.scene.background = new Color(0x87b8c0)
    // light
    const directionalLight = new DirectionalLight(0xffffff)
    directionalLight.intensity = 1
    directionalLight.position.set(10, 10, 10)
    this.scene.add(directionalLight)
    const ambientLight = new AmbientLight(0xffffff)
    this.scene.add(ambientLight)
    // add controls
    this.controls = new OrbitControls(this.camera, this.container)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.2
    this.controls.target.set(0, 0, 0)
    this.controls.update()
    // create renderer
    this.renderer = new WebGLRenderer({ alpha: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.physicallyCorrectLights = true
    this.container.appendChild(this.renderer.domElement)
    // set aspect ratio to match the new browser window aspect ratio
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
    if (this.model.extention === 'gltf') {
      const loader = new GLTFLoader()
      loader.load(this.model.url, (data: any) => {
        const gltf = data
        const object = gltf.scene
        object.scale.set(100.0, 100.0, 100.0)
        object.position.set(0, 0, 0)
        this.scene.add(object)
      })

      // 仕様変更で使用可能性あり、一旦コメントアウト
      // const eventHandler = () => {
      //   this.mouseX = event.pageX
      // }
      // // マウス座標はマウスが動いた時のみ取得できる
      // document.addEventListener('mousemove', eventHandler)
      const tick = () => {
        this.renderer.render(this.scene, this.camera)
        // this.targetRot = (this.mouseX / this.container.clientWidth) * 360
        // this.rot += (this.targetRot - this.rot) * 0.02
        // this.radian = (this.rot * Math.PI) / 180
        // // 角度に応じてカメラの位置を設定
        // this.camera.position.x = 0.1 + 0.05 * Math.sin(this.radian)
        // this.camera.position.y = 0.0 + 0.05 * Math.sin(this.radian)
        // this.camera.position.z = 0.3 + 0.001 * Math.cos(this.radian)
        // this.scene.rotation.y += 0.005
        // // camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.controls.update()
        requestAnimationFrame(tick)
      }
      tick()
      if (!this.fullscreen) {
        setTimeout(() => {
          if (this.count <= 1) {
            this.count = this.count + 1
            this.init()
          }
        }, 50)
      }
    } else if (this.model.extention === 'fbx') {
      let mixer: AnimationMixer
      const loader = new FBXLoader()
      loader.load(this.model.url, (object: any) => {
        if (object.animations.length > 0) {
          //シーン内の特定のオブジェクトのアニメーション用のプレーヤー(アニメーションの調整)
          mixer = new AnimationMixer(object)
          //Animation Actionを生成
          const action = mixer.clipAction(object.animations[0])
          //ループ設定（1回のみ）
          // action.setLoop(LoopOnce);
          //アニメーションを再生する
          action.play()
        }
        //オブジェクトとすべての子孫に対してコールバックを実行
        object.traverse((child: any) => {
          //影を落とすメッシュに対して、Shadowプロパティーを有効
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        object.position.set(0, 0, 0)
        object.scale.set(1.0, 1.0, 1.0)
        object.rotation.set(0, 0, 0)
        this.scene.add(object)
      })
      const render = () => {
        this.renderer.render(this.scene, this.camera)
      }

      //アニメーション処理
      const animate = () => {
        //グローバルミキサー時間を進め、アニメーションを更新
        if (mixer) {
          mixer.update(this.clock.getDelta())
        }
        render()
        //次のレンダラーを呼び出す
        requestAnimationFrame(animate)
      }

      animate()
      if (!this.fullscreen) {
        setTimeout(() => {
          if (this.count <= 1) {
            this.count = this.count + 1
            this.init()
          }
        }, 50)
      }
    }
  }
}
</script>

<style>
#scene-container {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
#scene-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate3d(-50%, -50%, 0) perspective(0) !important;
  margin: 0 !important;
  padding: 0 !important;
  z-index: 0;
}
</style>
