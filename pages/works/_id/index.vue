<template>
  <div class="w-3/4 relative">
    <div class="z-50 absolute -right-20 top-0">
      <base-icon-button
        v-if="getUser().id === work.user.id"
        :to="`/works/${work.id}/edit`"
        :size="'base'"
        :is-background="true"
        :is-shadow="true"
        class="p-4"
      />
    </div>
    <works-carousel class="border border-gray-700" :assets="work.assets" />
    <div class="flex justify-between mt-5">
      <works-title
        :date="work.updated_at"
        :title="work.title"
        :user="work.user"
      />
      <works-view-info />
    </div>
    <!-- タグ -->
    <works-content class="mt-5" icon="tags">
      <base-tag v-for="tag in work.tags" :key="tag.id" :text="tag.name" />
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
        <base-button
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
    <!-- コメント -->
    <comments-field class="mt-10 mx-auto w-3/4" />
    <comments-list class="mt-10 mx-auto w-3/4" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import WorksCarousel from '@/components/works/WorksCarousel.vue'
import WorksTitle from '@/components/works/WorksTitle.vue'
import WorksViewInfo from '@/components/works/WorksViewInfo.vue'
import BaseTextButton from '@/components/commons/BaseTextButton.vue'
import BaseTag from '@/components/commons/BaseTag.vue'
import CommentsField from '@/components/comments/CommentsField.vue'
import CommentsList from '@/components/comments/CommentsList.vue'
import BaseIconButton from '@/components/commons/BaseIconButton.vue'

import axios from 'axios'
import { Work } from '@/types'
import { saveAs } from 'file-saver'
import { authStore } from '~/store'

@Component({
  components: {
    WorksCarousel,
    WorksTitle,
    WorksViewInfo,
    BaseTextButton,
    BaseTag,
    CommentsField,
    CommentsList,
    BaseIconButton
  },
  async asyncData({ route }) {
    const response = await axios.get(
      `${process.env.API_URL}/works/${route.params.id}`
    )
    return { work: response.data }
  }
})
export default class Works extends Vue {
  work!: Work

  getUser() {
    return authStore.getUser
  }

  mounted() {
    console.log(JSON.stringify(this.work, null, 2))
  }

  async download(type: string, id: string) {
    const url = `${process.env.ASSET_BASE_URL}/${type}/${id}/origin.zip`
    const data = await fetch(url)
    const blob = await data.blob()
    saveAs(blob, 'origin.zip')
  }
}
</script>
