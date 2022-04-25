<template>
  <div class="w-8/12 m-auto">
    <carousel class="border border-gray-700" :assets="work.assets" />
    <div class="flex justify-between mt-5">
      <works-title :date="work.updated_at" :title="work.title" :user="work.user" />
      <works-view-info />
    </div>
    <!-- コミュニティー -->
    <works-content class="mt-8" icon="users">
      <p class="border border-gray-500 rounded-lg text-center px-6 mx-3">
        {{ work.community.name }}
      </p>
    </works-content>
    <!-- タグ -->
    <works-content class="mt-5" icon="tags">
      <p
        v-for="tag in work.tags"
        :key="tag.id"
        class="border border-gray-500 rounded-lg text-center px-6 mx-3"
      >
        {{ tag.name }}
      </p>
    </works-content>
    <!-- URL -->
    <works-content class="mt-8" icon="link">
      <a
        v-for="url in work.urls"
        :key="url.id"
        class="mx-3 hover:text-blue-600 hover:underline"
        :href="url.url"
        target="_blank"
      >
        {{ url.url.split('/')[2] }}
      </a>
    </works-content>
    <!-- ダウンロード -->
    <works-content class="mt-5" icon="download">
      <div v-for="asset in work.assets" :key="asset.id">
        <custom-button
          v-if="asset.asset_type === ('zip' || 'model')"
          class="mx-3"
          :title="asset.asset_type"
          @click="download(asset.asset_type, asset.id)"
        />
      </div>
    </works-content>
    <!-- 説明 -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="mt-10" v-html="work.description_html" />
    <!-- コメント部分のコンポーネントをここに入れる -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Carousel from '@/components/Carousel.vue'
import WorksTitle from '@/components/works/WorksTitle.vue'
import WorksViewInfo from '@/components/works/WorksViewInfo.vue'
import CustomButton from '@/components/ToyboxButton.vue'
import axios from 'axios'
import { Work } from '@/types'
import { saveAs } from 'file-saver'

@Component({
  components: {
    Carousel,
    WorksTitle,
    WorksViewInfo,
    CustomButton
  },
  async asyncData ({ route }) {
    const response = await axios.get(`https://kodomobeya.compositecomputer.club/api/v1/works/${route.params.id}`)
    return { work: response.data }
  }
})
export default class Works extends Vue {
  work!: Work

  mounted () {
    console.log(JSON.stringify(this.work, null, 2))
  }

  async download (type: string, id: string) {
    const url = `https://kodomobeya.compositecomputer.club/${type}/${id}/origin.zip`
    const data = await fetch(url)
    const blob = await data.blob()
    saveAs(blob, 'origin.zip')
  }
}
</script>
