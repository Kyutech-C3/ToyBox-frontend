<template>
  <div class="relative flex items-center w-full">
    <div
      class="
        selected-tags
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        z-30
        flex
        pb-0.5
        overflow-x-scroll
      "
      :style="`max-width: ${selectedTagListMaxWidth}px;`"
      ref="selectedTagsRef"
    >
      <base-tag
        v-for="selectedTag in getSelectedTags"
        :key="selectedTag.id"
        :text="selectedTag.name"
        :pointer="false"
        :size="'small'"
        class="w-max"
      />
    </div>
    <div class="relative items-center w-full">
      <input
        type="text"
        name="select tag"
        class="
          w-full
          border-b-2 border-gray-300
          outline-none
          focus:border-gray-400
        "
        :style="`padding-left:${inputPaddingLeft}px;`"
        :autofocus="useType === 'create'"
        @keydown="keydownHandler"
        @keyup="keyupHandler"
        @focus="focusInput = true"
        @blur="
          if (!suggestMouseOver) {
            focusInput = false
            initInputWord()
          }
        "
        ref="tagInput"
      />
      <ul
        v-if="(suggestTags.length >= 1 && focusInput) || showCreateItem()"
        class="
          suggest-tag-list
          w-max
          max-h-[10rem]
          block
          absolute
          z-50
          top-7
          border border-gray-300
          rounded-lg
          bg-white
          shadow-xl
          overflow-x-hidden overflow-y-auto
        "
        :style="`left:${inputPaddingLeft - 5}px;`"
        ref="suggestTagList"
        @mouseover="suggestMouseOver = true"
        @mouseout="suggestMouseOver = false"
      >
        <li
          v-for="(suggestTag, index) in suggestTags"
          :id="String(index)"
          :key="suggestTag.id"
          class="
            w-full
            items-center
            cursor-pointer
            border-b border-gray-300
            px-5
            py-0.5
          "
          :class="{ 'bg-orange-300': selectingSuggest === index }"
          @click="suggestSelectByClick(index)"
        >
          <span>{{ suggestTag.name }}</span>
        </li>
        <li
          v-if="showCreateItem()"
          class="
            createTag
            w-full
            items-center
            cursor-pointer
            border-b border-gray-300
            px-5
            py-0.5
          "
          @click="createNewTag()"
          :class="{ 'bg-orange-300': selectingSuggest === suggestTags.length }"
        >
          <span>新しく作る</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref, Prop } from 'nuxt-property-decorator'
import BaseTag from '@/components/commons/BaseTag.vue'

import { GetTag } from '@/types'
import axios from 'axios'
import { workPostStore, authStore, tagSelectorStore } from '~/store'

@Component({
  components: {
    BaseTag
  }
})
export default class TagSelecter extends Vue {
  searchTagKeyword: string = ''
  suggestTags: GetTag[] = []
  focusInput: boolean = false
  selectingSuggest: number = 0
  suggestViewTop: number = 0
  suggestViewBottom: number = 5
  inputPaddingLeft: number = 0
  previousInputWordCount: number = -1
  suggestMouseOver: boolean = false
  selectedTagListMaxWidth: number = 0
  initSuggestTags: boolean = false

  @Ref() selectedTagsRef!: HTMLDivElement
  @Ref() tagInput!: HTMLInputElement
  @Ref() suggestTagList!: HTMLElement

  @Prop({ type: String, required: true })
  useType!: 'create' | 'filter'

  @Watch('getSelectedTags')
  onChangeSelectedTags() {
    if (this.getSelectedTags.length === 0) {
      this.initSuggestTags = true
      this.searchTags()
      this.initSuggestTags = false
    }
    setTimeout(() => {
      this.updateInputPaddingLeft()
    }, 20)
  }

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  get getNowLogin() {
    return authStore.nowLogin
  }

  get getAccessToken() {
    return authStore.getAccessToken
  }

  created() {
    this.searchTags()
  }

  mounted() {
    if (this.tagInput) {
      this.selectedTagListMaxWidth = (this.tagInput.clientWidth * 4) / 5
      setTimeout(() => this.updateInputPaddingLeft(), 10)
    }
    window.addEventListener('resize', () => {
      this.selectedTagListMaxWidth = (this.tagInput.clientWidth * 4) / 5
      this.updateInputPaddingLeft()
    })
  }

  updateInputPaddingLeft() {
    if (this.getSelectedTags.length > 0) {
      if (
        (this.tagInput.clientWidth * 4) / 5 >
        this.selectedTagsRef.clientWidth
      ) {
        this.inputPaddingLeft = this.selectedTagsRef.clientWidth
      } else {
        this.inputPaddingLeft = (this.tagInput.clientWidth * 4) / 5
      }
    } else if (this.getSelectedTags.length === 0) {
      this.inputPaddingLeft = 3
    }
  }

  bindKeyword() {
    if (this.tagInput) {
      this.searchTagKeyword = this.tagInput.value
    } else {
      this.searchTagKeyword = ''
    }
  }

  keydownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        if (event.keyCode === 13) {
          event.preventDefault()
          this.suggestSelect(event)
        } else {
          this.searchTags()
        }
        if (this.selectedTagsRef) {
          setTimeout(() => {
            this.selectedTagsRef.scrollLeft =
              this.selectedTagsRef.scrollWidth + 1000
          }, 10)
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        this.focusPrev(event)
        break
      case 'ArrowDown':
        event.preventDefault()
        this.focusNext(event)
        break
      case 'Tab':
        event.preventDefault()
        this.focusNext(event)
        break
      case 'Backspace':
        this.deleteKeyHandler()
        if (this.selectedTagsRef) {
          this.selectedTagsRef.scrollLeft = this.selectedTagsRef.scrollWidth
        }
        break
    }
  }

  keyupHandler(event: KeyboardEvent): void {
    this.searchTags()
  }

  deleteKeyHandler() {
    if (this.searchTagKeyword.length === 0) {
      if (this.getSelectedTags.length > 0) {
        tagSelectorStore.deleteSelectedTags()
        if (this.useType === 'create') {
          workPostStore.changeIsBlockUnload()
        }
        this.previousInputWordCount = -1
      }
    }
  }

  async searchTags() {
    this.bindKeyword()
    if (
      this.previousInputWordCount !== this.searchTagKeyword.length ||
      this.initSuggestTags
    ) {
      try {
        await axios
          .get(`${process.env.API_URL}/tags?w=${this.searchTagKeyword}`)
          .then((result) => {
            if (this.getSelectedTags.length > 0) {
              this.suggestTags = result.data.filter((item: GetTag) => {
                for (let i = 0; i < this.getSelectedTags.length; i++) {
                  if (item.id === this.getSelectedTags[i].id) {
                    return false
                  }
                }
                return true
              })
            } else {
              this.suggestTags = result.data
            }
            this.selectingSuggest = 0
          })
      } catch (error) {
        console.error(error)
      }
      this.previousInputWordCount = this.searchTagKeyword.length
    }
  }

  focusPrev(event: KeyboardEvent) {
    if (this.suggestTags.length > 0) {
      event.preventDefault()
      this.selectingSuggest--
      if (this.selectingSuggest <= this.suggestViewTop) {
        this.suggestTagList.scrollTop -= 29
      }
      if (this.selectingSuggest <= -1) {
        this.selectingSuggest = this.suggestTags.length - 1
        this.suggestTagList.scrollTop = this.suggestTagList.scrollHeight
        this.suggestViewTop = this.suggestTags.length - 6
        this.suggestViewBottom = this.suggestTags.length - 1
      }
      if (this.selectingSuggest <= this.suggestViewTop) {
        this.suggestViewTop = this.selectingSuggest
        this.suggestViewBottom = this.suggestViewTop + 5
      }
    }
  }

  focusNext(event: KeyboardEvent) {
    if (this.suggestTags.length > 0) {
      event.preventDefault()
      this.selectingSuggest++
      if (this.suggestViewBottom <= this.selectingSuggest) {
        this.suggestTagList.scrollTop += 29
      }
      if (
        this.suggestTags.length - (this.showCreateItem() ? 0 : 1) <
        this.selectingSuggest
      ) {
        this.selectingSuggest = 0
        this.suggestTagList.scrollTop = -this.suggestTagList.scrollHeight
        this.suggestViewTop = 0
        this.suggestViewBottom = 5
      }
      if (this.suggestViewBottom <= this.selectingSuggest) {
        this.suggestViewBottom = this.selectingSuggest
        this.suggestViewTop = this.suggestViewBottom - 5
      }
    }
  }

  suggestSelect(event: KeyboardEvent) {
    if (
      this.suggestTags.length === this.selectingSuggest &&
      this.searchTagKeyword.length > 0
    ) {
      this.createNewTag()
    } else if (this.suggestTags.length > 0) {
      tagSelectorStore.addSelectedTags(this.suggestTags[this.selectingSuggest])
      if (this.useType === 'create') {
        workPostStore.changeIsBlockUnload()
      }
      this.initSuggest()
      this.initInputWord()
      this.searchTags()
    }
  }

  suggestSelectByClick(index: number) {
    tagSelectorStore.addSelectedTags(this.suggestTags[index])
    if (this.useType === 'create') {
      workPostStore.changeIsBlockUnload()
    }
    this.initSuggest()
    this.initInputWord()
    this.searchTags()
    this.tagInput.focus()
  }

  showCreateItem() {
    let tagNotExist = true
    this.suggestTags.forEach((item: GetTag) => {
      if (item.name === this.searchTagKeyword) {
        tagNotExist = false
      }
    })
    this.getSelectedTags.forEach((item: GetTag) => {
      if (item.name === this.searchTagKeyword) {
        tagNotExist = false
      }
    })
    return (
      this.searchTagKeyword.length > 0 &&
      tagNotExist &&
      this.getNowLogin &&
      this.useType === 'create'
    )
  }

  async createNewTag() {
    try {
      await axios
        .post(
          `${process.env.API_URL}/tags`,
          { name: this.searchTagKeyword, color: '#ffffff' },
          {
            headers: {
              Authorization: `Bearer ${this.getAccessToken}`
            }
          }
        )
        .then((result) => {
          tagSelectorStore.addSelectedTags(result.data)
          if (this.useType === 'create') {
            workPostStore.changeIsBlockUnload()
          }
        })
    } catch (error) {
      console.error(error)
    }
    this.initSuggest()
    this.initInputWord()
    this.searchTags()
  }

  initInputWord() {
    this.searchTagKeyword = ''
    if (this.tagInput) {
      this.tagInput.value = ''
    }
    this.previousInputWordCount = -1
  }
  initSuggest() {
    this.selectingSuggest = 0
    this.suggestTags.splice(0)
  }
}
</script>

<style scoped>
.selected-tags::-webkit-scrollbar {
  height: 2px;
}
.selected-tags::-webkit-scrollbar-thumb {
  background: rgb(255 237 213);
  border-radius: 2px;
}
.selected-tags::-webkit-scrollbar-track {
  background: rgba(221, 221, 221, 0);
}
.suggest-tagList {
  -ms-overflow-style: none;
}
.suggest-tag-list::-webkit-scrollbar {
  display: none;
}
</style>
