<template>
  <div class="w-8/12 m-auto">
    <carousel class="border border-gray-700" />
    <div class="flex justify-between mt-5">
      <works-title />
      <works-view-info />
    </div>
    <!-- コミュニティー -->
    <works-content class="mt-8" icon="users">
      <p class="border border-gray-500 rounded-lg text-center px-6 mx-3">
        Hack
      </p>
    </works-content>
    <!-- タグ -->
    <works-content class="mt-5" icon="tags">
      <p class="border border-gray-500 rounded-lg text-center px-6 mx-3">
        Nuxt.js
      </p>
      <p class="border border-gray-500 rounded-lg text-center px-6 mx-3">
        TypeScript
      </p>
    </works-content>
    <!-- URL -->
    <works-content class="mt-8" icon="link">
      <a class="mx-3 hover:text-blue-600 hover:underline" href="https://google.com" target="_blank">
        google.com
      </a>
    </works-content>
    <!-- ダウンロード -->
    <works-content class="mt-5" icon="download">
      <custom-button class="mx-3" title="hogefuga.zip" />
      <custom-button class="mx-3" title="foobar.mp3" />
    </works-content>
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
import WorksTitle from '@/components/works/WorksTitle.vue'
import WorksViewInfo from '@/components/works/WorksViewInfo.vue'
import CustomButton from '@/components/ToyboxButton.vue'

@Component({
  components: {
    Carousel,
    WorksTitle,
    WorksViewInfo,
    CustomButton
  }
})
export default class Works extends Vue {

}
</script>
