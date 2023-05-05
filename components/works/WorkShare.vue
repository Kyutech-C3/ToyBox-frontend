<template>
  <div
    class="
      rounded-2xl
      w-[95%]
      min-w-[300px]
      max-w-[700px]
      bg-white
      px-5
      pb-16
      pt-20
      flex
      justify-center
      flex-col
      items-center
      relative
      shadow-xl
    "
  >
    <span
      class="
        material-symbols-outlined
        cursor-pointer
        text-3xl
        select-none
        absolute
        top-5
        right-5
        text-gray-500
        hover:text-gray-600
        w-9
        h-9
      "
      @click="closeShareModal"
    >
      close
    </span>
    <div class="mb-5 text-xl font-bold text-gray-500">SNSで共有</div>
    <div class="mb-10 flex justify-around flex-wrap w-full max-w-[540px]">
      <a
        :href="twitterURL()"
        target="_blank"
        class="
          flex
          items-center
          justify-center
          w-52
          h-16
          bg-sky-500
          text-white
          rounded-xl
          px-5
          m-2
        "
      >
        <font-awesome-icon :icon="['fab', 'twitter']" class="w-10 h-10 mr-2" />
        <span class="text-2xl font-bold">Twitter</span>
      </a>
      <a
        v-if="getNowLogin"
        :href="mastodonURL()"
        target="_blank"
        class="
          flex
          items-center
          justify-center
          w-52
          h-16
          bg-indigo-600
          text-white
          rounded-xl
          px-5
          m-2
        "
      >
        <font-awesome-icon :icon="['fab', 'mastodon']" class="w-10 h-10 mr-2" />
        <span class="text-2xl font-bold">Mastodon</span>
      </a>
    </div>
    <div class="mb-5 text-xl font-bold text-gray-500">リンク</div>
    <div class="flex justify-center items-center relative w-4/5 max-w-[500px]">
      <input
        :value="getURL"
        readonly
        class="
          h-9
          px-3
          rounded-lg
          outline-none
          text-gray-600
          w-full
          pr-9
          border-b border-gray-300
        "
      />
      <span
        class="
          material-symbols-outlined
          url-copy
          cursor-pointer
          text-xl
          select-none
          transition-all
          absolute
          top-1/2
          -translate-y-1/2
          right-0
          text-gray-500
          hover:text-gray-600
          bg-orange-100
          rounded-lg
          w-10
          h-8
          text-center
          leading-9
          shadow shadow-gray-400
        "
        @click="copyURL"
      >
        content_copy
      </span>
      <span
        v-if="copySuccess"
        class="
          text-xs text-gray-500
          ml-3
          absolute
          top-1/2
          -translate-y-1/2
          -right-[6.5rem]
        "
      >
        コピーしました！
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { workShareStore, modalStore, authStore } from '@/store'

@Component({
  components: {}
})
export default class WorkShare extends Vue {
  copySuccess: boolean = false
  shareText: string = ''
  hashTags: string = '#ToyBox #C3 #CompositeComputerClub\n'

  get getURL() {
    return workShareStore.getURL
  }

  get getWork() {
    return workShareStore.getWork
  }

  get getNowLogin() {
    return authStore.nowLogin
  }

  closeShareModal() {
    modalStore.close()
  }

  getShareText() {
    return `ToyBox\n作品名：${this.getWork.title}\n制作者：${this.getWork.user.display_name}\n\n`
  }

  twitterURL() {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      this.getURL
    )}&text=${encodeURIComponent(this.getShareText() + this.hashTags)}`
  }

  mastodonURL() {
    return `https://mastodon.compositecomputer.club?text=${encodeURIComponent(
      this.getShareText() + this.getURL
    )}`
  }

  async copyURL() {
    try {
      await navigator.clipboard.writeText(this.getURL)
      this.copySuccess = true
    } catch (err) {
      alert('コピーに失敗しました')
    }
    setTimeout(() => {
      this.copySuccess = false
    }, 5000)
  }
}
</script>

<style scoped>
.url-copy {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
.url-copy:hover {
  font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
}
</style>
