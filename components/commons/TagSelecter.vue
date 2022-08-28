<template>
  <div class="relative flex items-center w-full">
    <div
      v-if="getSelectedTags.length > 0"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-50 flex pb-1"
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
        v-model="searchTagKeyword"
        type="text"
        name="select tag"
        class="
          w-full
          border-b-2 border-gray-300
          outline-none
          focus:border-gray-400
        "
        :style="`padding-left:${inputPaddingLeft}px;`"
        autofocus
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
          w-max
          h-[calc(--suggest-list-height
          *
          21px)]
          max-h-[17.5rem]
          block
          absolute
          z-50
          top-7
          border border-gray-300
          rounded-lg
          bg-white
          shadow-xl
          overflow-hidden
        "
        :class="[
          `[--suggest-list-height: ${suggestTags.length > 10} ? '10':'${
            suggestTags.length
          }']`
        ]"
        :style="`left:${inputPaddingLeft - 5}px;`"
        @mouseover="suggestMouseOver = true"
        @mouseout="suggestMouseOver = false"
      >
        <li
          v-for="(suggestTag, index) in suggestTags"
          :id="index"
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
import { Component, Prop, Vue, VModel, Ref } from 'nuxt-property-decorator'

import BaseTag from '@/components/commons/BaseTag.vue'

import { Tag } from '@/types'
import axios from 'axios'
import { workPostStore, authStore } from '~/store'
import auth from '~/middleware/auth'

@Component({
  components: {
    BaseTag
  }
})
export default class TagSelecter extends Vue {
  searchTagKeyword: string = ''
  suggestTags: Tag[] = []
  focusInput: boolean = false
  selectingSuggest: number = 0
  inputPaddingLeft: number = 3
  previousInputWordCount: number = -1
  suggestMouseOver: boolean = false

  @VModel({ type: Array, required: true })
  postTags!: string[]

  @Ref() selectedTagsRef!: HTMLDivElement
  @Ref() tagInput!: HTMLInputElement

  get getSelectedTags() {
    return workPostStore.getSelectedTags
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
    this.updateInputPaddingLeft()
  }

  updateInputPaddingLeft() {
    if (this.getSelectedTags.length > 0) {
      this.inputPaddingLeft = this.selectedTagsRef.clientWidth
    } else if (this.getSelectedTags.length === 0) {
      this.inputPaddingLeft = 3
    }
  }

  keydownHandler(event: KeyboardEvent): void {
    console.log(event)
    switch (event.key) {
      case 'Enter':
        event.preventDefault()
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
        break
    }
  }

  keyupHandler(event: KeyboardEvent): void {
    console.log(event)
    if (event.key === 'Enter') {
      event.preventDefault()
      this.suggestSelect(event)
    } else {
      this.searchTags()
    }
  }

  deleteKeyHandler() {
    console.log('delete')
    console.log(this.searchTagKeyword.length)
    if (this.searchTagKeyword.length === 0) {
      if (this.getSelectedTags.length > 0) {
        workPostStore.deleteSelectedTags()
        workPostStore.changeIsBlockUnload()
        this.postTags.pop()
        this.previousInputWordCount = -1
        setTimeout(() => {
          this.updateInputPaddingLeft()
        }, 50)
      }
    }
  }

  async searchTags() {
    // console.log(event.key)
    if (this.previousInputWordCount !== this.searchTagKeyword.length) {
      console.log('search')
      try {
        await axios
          .get(`${process.env.API_URL}/tags?w=${this.searchTagKeyword}`)
          .then((result) => {
            console.log(result)
            if (this.getSelectedTags.length > 0) {
              this.suggestTags = result.data.filter((item: Tag) => {
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
            console.log(this.suggestTags)
            this.selectingSuggest = 0
          })
      } catch (error) {
        console.log(error)
      }
      this.previousInputWordCount = this.searchTagKeyword.length
    }
  }

  focusPrev(event: any) {
    if (this.suggestTags.length > 0) {
      event.preventDefault()
      this.selectingSuggest--
      if (this.selectingSuggest <= -1) {
        this.selectingSuggest = this.suggestTags.length - 1
      }
      console.log(this.selectingSuggest)
    }
  }

  focusNext(event: any) {
    console.log(event.key)
    if (this.suggestTags.length > 0) {
      event.preventDefault()
      this.selectingSuggest++
      if (this.suggestTags.length < this.selectingSuggest) {
        this.selectingSuggest = 0
      }
      console.log(this.selectingSuggest)
    }
  }

  suggestSelect(event: any) {
    console.log('selectSuggestTag')
    console.log(event.key)
    if (this.suggestTags.length > 0) {
      workPostStore.addSelectedTags(this.suggestTags[this.selectingSuggest])
      workPostStore.changeIsBlockUnload()
      this.postTags.push(this.suggestTags[this.selectingSuggest].id)
      console.log(this.suggestTags[this.selectingSuggest])
      this.initSuggest()
      this.initInputWord()
      setTimeout(() => {
        this.updateInputPaddingLeft()
      }, 50)
      this.searchTags()
    }
    if (
      this.suggestTags.length === this.selectingSuggest &&
      this.searchTagKeyword.length > 0
    ) {
      this.createNewTag()
    }
  }

  suggestSelectByClick(index: number) {
    workPostStore.addSelectedTags(this.suggestTags[index])
    workPostStore.changeIsBlockUnload()
    this.postTags.push(this.suggestTags[index].id)
    console.log(this.suggestTags[index])
    this.initSuggest()
    this.initInputWord()
    setTimeout(() => {
      this.updateInputPaddingLeft()
    }, 50)
    this.searchTags()
    this.tagInput.focus()
  }

  showCreateItem() {
    let tagNotExist = true
    this.suggestTags.forEach((item: Tag) => {
      if (item.name === this.searchTagKeyword) {
        tagNotExist = false
        console.log(tagNotExist)
      }
    })
    this.getSelectedTags.forEach((item: Tag) => {
      if (item.name === this.searchTagKeyword) {
        tagNotExist = false
        console.log(tagNotExist)
      }
    })
    return this.searchTagKeyword.length > 0 && tagNotExist && this.getNowLogin
  }

  async createNewTag() {
    console.log('create tag method')
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
          console.log(result.data)
          workPostStore.addSelectedTags(result.data)
          workPostStore.changeIsBlockUnload()
          this.postTags.push(result.data.id)
        })
    } catch (error) {
      console.log(error)
    }
    this.initSuggest()
    this.initInputWord()
    setTimeout(() => {
      this.updateInputPaddingLeft()
    }, 50)
    this.searchTags()
    this.tagInput.focus()
  }

  initInputWord() {
    this.searchTagKeyword = ''
    this.previousInputWordCount = -1
  }
  initSuggest() {
    this.selectingSuggest = 0
    this.suggestTags.length = 0
  }
}
</script>
