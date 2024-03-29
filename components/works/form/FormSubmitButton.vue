<template>
  <div class="relative flex justify-end select-none">
    <button
      class="
        rounded-tl-lg rounded-bl-lg
        border-2 border-hover-base-button-color
        text-hover-base-button-color
        transition-colors
        px-4
        py-2.5
        flex
        items-center
      "
      type="submit"
      @click="$emit('submit', submitList[option].value)"
      :disabled="disabled"
    >
      <font-awesome-icon :icon="submitList[option].icon" class="w-4 mr-3" />
      {{ submitList[option].name }}
    </button>

    <button
      class="
        rounded-tr-lg rounded-br-lg
        border-2 border-hover-base-button-color
        bg-hover-base-button-color
        text-gray-100
        transition-colors
        px-2
        pt-3
        pb-2
      "
      type="submit"
      @click="openList = !openList"
      :disabled="disabled"
    >
      <font-awesome-icon :icon="['fas', 'caret-up']" class="w-3" />
    </button>

    <transition name="fade">
      <div
        v-if="openList"
        class="
          balloon
          absolute
          bottom-16
          rounded-lg
          bg-white
          px-5
          py-2
          border-2 border-hover-base-button-color
        "
      >
        <ul class="z-10 relative w-max">
          <li
            v-for="(range, i) in submitList"
            :key="i"
            class="cursor-pointer flex items-center py-2"
            @click="clickOption(i)"
          >
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="w-4 mr-3"
              :class="{ 'text-transparent': option != i }"
            />
            <font-awesome-icon :icon="range.icon" class="w-4 mr-3" />
            {{ range.name }}
          </li>
        </ul>
        <!-- 以下、別部分をクリックした時にfalseにするdiv -->
        <div
          class="fixed w-full h-full top-0 left-0 z-0"
          @click="openList = !openList"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Visibility } from '~/types'

@Component
export default class FormSubmitButton extends Vue {
  openList = false
  option = 0
  submitList = [
    {
      icon: ['fas', 'globe'],
      name: '公開',
      value: 'public'
    },
    {
      icon: ['fas', 'lock'],
      name: '限定公開',
      value: 'private'
    },
    {
      icon: ['fas', 'save'],
      name: '下書き保存',
      value: 'draft'
    }
  ]
  visibilityToOption = { public: 0, private: 1, draft: 2 }

  @Prop({ type: String, required: false, default: 'public' })
  workVisibility!: Visibility

  @Prop({ type: Boolean, required: false, default: false })
  disabled!: boolean

  created() {
    this.option = this.visibilityToOption[this.workVisibility]
  }

  clickOption(index: number) {
    this.openList = !this.openList
    this.option = index
  }
}
</script>

<style scoped>
/* 以下、吹き出しのアニメーション */
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 以下、吹き出しに見えるようにするための三角形のCSS */
.balloon:before,
.balloon:after {
  content: '';
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
}
.balloon:before {
  bottom: -18px;
  border-top: 10px solid #ffffff;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid transparent;
  display: inline-block;
  z-index: 10;
}
.balloon:after {
  bottom: -20px;
  border-top: 10px solid var(--hover-base-button-color);
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid transparent;
  display: inline-block;
}
</style>
