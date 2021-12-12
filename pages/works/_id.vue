<template>
  <div class="w-8/12 m-auto">
    <carousel class="border border-gray-700" />
    <div class="flex justify-between mt-5">
      <div>
        <div class="font-light text-gray-400">
          2021/12/24 12:00
        </div>
        <div class="text-3xl">
          ToyBox Frontend
        </div>
        <div class="inline-flex items-center mt-5">
          <img class="border rounded-full w-10 h-10 border-gray-400" src="http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png" alt="">
          <div class="ml-3">
            ハムタロサァン
          </div>
        </div>
      </div>
      <div class="self-center font-light text-gray-400">
        <div>
          1000 view
        </div>
        <div class="inline-flex items-center mt-3">
          <font-awesome-icon class="w-7" :icon="['far', 'heart']" />
          <div class="text-lg ml-2">
            10
          </div>
        </div>
      </div>
    </div>
    <!-- コミュニティー -->
    <div class="flex mt-8">
      <font-awesome-icon class="w-6 text-gray-500" :icon="['fas', 'users']" />
      <div class="border border-gray-500 rounded-lg text-center px-6 mx-3">
        Hack
      </div>
    </div>
    <!-- タグ -->
    <div class="flex mt-5">
      <font-awesome-icon class="w-6 text-gray-500" :icon="['fas', 'tags']" />
      <div class="border border-gray-500 rounded-lg text-center px-6 mx-3">
        Nuxt.js
      </div>
      <div class="border border-gray-500 rounded-lg text-center px-6 mx-3">
        TypeScript
      </div>
    </div>
    <!-- URL -->
    <div class="flex mt-8">
      <font-awesome-icon class="w-6 text-gray-500" :icon="['fas', 'link']" />
      <a class="mx-3 hover:text-blue-600 hover:underline" href="https://google.com" target="_blank">google.com</a>
    </div>
    <!-- ダウンロード -->
    <div class="flex mt-5">
      <font-awesome-icon class="w-6 text-gray-500" :icon="['fas', 'download']" />
      <custom-button class="mx-3" title="hogefuga.zip" />
      <custom-button class="mx-3" title="foobar.mp3" />
    </div>
    <!-- 説明 -->
    <div class="mt-10">
      Toyboxは、組込みシステム向けのいくつかのUNIXのコマンドラインユーティリティの代替として設計されたフリーでオープンソースのソフトウェアある。<br>
      Toyboxにはls、cp、mvなど約150のコマンドを含んでいる。<br>
      プロジェクトは2006年に始められ、BSDライセンスで提供されるBusyBoxの代替物となっている。<br>
      Android 6.0とそれ以降の全てのAndroidのバージョンに含まれ、他のOSへのインストールもサポートされている。<br><br>
      Toyboxは、GNU GPLライセンスで提供されるBusyBoxをBSDライセンスで置き換える事を目的としている。<br>
      その技術的なデザインのゴールは、単純で小型、高速、そして標準への準拠である。<br>
      仕様はPOSIX-2008とLSB 4.1に適合しているが、GNUのコンポーネントにある全てのオプションを提供することには注力していない。
    </div>
    <!-- コメント部分のコンポーネントをここに入れる -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Carousel from '@/components/Carousel.vue'
import CustomButton from '@/components/ToyboxButton.vue'

@Component({
  components: {
    Carousel,
    CustomButton
  }
})
export default class Works extends Vue {

}
</script>

<style scoped>

</style>
