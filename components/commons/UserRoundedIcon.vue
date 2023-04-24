<template>
  <div
    class="rounded-full bg-white relative overflow-hidden shadow-md"
    :class="[
      { 'w-6 h-6': size === 'small' },
      { 'w-8 h-8': size === 'base' },
      { 'w-11 h-11': size === 'large' },
      { 'w-14 h-14': size === 'x-large' },
      { 'w-16 h-16': size === 'xx-large' },
      { ' bg-slate-500': !imageSrc }
    ]"
  >
    <img
      v-if="imageSrc"
      :src="imageSrc"
      alt="user icon"
      class="absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <svg
      v-else
      class="
        absolute
        h-full
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        fill-slate-100
      "
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path
        d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5T731 696q31 14 50 41t19 65v94H160Z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class UserRoundedIcon extends Vue {
  @Prop({ type: String, required: true })
  imageSrc!: string

  @Prop({ type: String, required: false, default: 'base' })
  size!: 'small' | 'base' | 'large' | 'x-large' | 'xx-large'
}
</script>
