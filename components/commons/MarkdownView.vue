<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="relative">
    <div
      class="
        markdown-view
        w-full
        mt-5
        pt-5
        pb-10
        px-4
        bg-gray-50
        rounded-xl
        text-gray-600
      "
      :class="[
        {
          'hidden-blur overflow-hidden max-h-96':
            !showAll && markdownViewHeiht >= 384
        },
        { '': showAll }
      ]"
      ref="markdownView"
      v-html="$md.render(markdownText)"
    />
    <span
      v-if="markdownViewHeiht >= 384"
      class="
        material-symbols-outlined
        cursor-pointer
        transition-transform
        text-4xl
        select-none
        absolute
        w-full
        text-center
      "
      :class="[
        { 'hover:translate-y-1 -bottom-1': !showAll },
        { 'hover:-translate-y-1 rotate-180 bottom-1': showAll }
      ]"
      @click="showAll = !showAll"
    >
      expand_more
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator'

@Component
export default class MarkdownView extends Vue {
  showAll: boolean = false
  markdownViewHeiht: number = 500

  @Ref() markdownView!: HTMLElement

  @Prop({ type: String, required: true })
  markdownText!: string

  mounted() {
    this.markdownViewHeiht = this.markdownView.getBoundingClientRect().height
  }
}
</script>

<style lang="scss">
.hidden-blur::before {
  background: linear-gradient(to top, #ffffff 30%, #ffffff51 100%);
  position: absolute;
  bottom: 0;
  left: 0;
  content: '';
  height: 20%;
  width: 100%;
}

.markdown-view ol {
  @apply list-decimal;
  @apply pl-10;
}

.markdown-view ul {
  @apply list-disc;
  @apply pl-10;
}

.markdown-view h1 {
  @apply text-4xl;
  @apply font-semibold;
}

.markdown-view h2 {
  @apply text-3xl;
  @apply font-semibold;
}

.markdown-view h3 {
  @apply text-2xl;
  @apply font-semibold;
}

.markdown-view {
  @apply text-xl;
}
.markdown-view {
  overflow-wrap: break-word;
}
.markdown-view h1,
h2,
h3 {
  border-bottom: dotted 3px rgb(96, 170, 255);
  margin-bottom: 10px;
  padding-bottom: 5px;
  padding-top: 10px;
}

.markdown-view p {
  margin-bottom: 20px;
  margin-top: 5px;
  font-size: medium;
}

.markdown-view hr {
  border-bottom: dotted 3px rgb(96, 170, 255);
  border-right: none;
  border-top: none;
  border-left: none;
}
.markdown-view p img {
  display: block;
  width: 80%;
  height: auto;
  margin: 0 auto;
  border-radius: 20px;
  pointer-events: none;
}
table {
  border-collapse: collapse;
  border: 1px solid rgb(198, 198, 198);
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(198, 198, 198);
}

th,
td {
  padding: 5px 10px;
  border: 1px solid rgb(198, 198, 198);
}

th {
  background: #ebf8ff;
}
@media screen and (max-width: 600px) {
  .markdown-view h1,
  h2,
  h3 {
    padding: 0 5px;
  }
  .markdown-view p img {
    width: 90%;
    border-radius: 10px;
  }
  .markdown-view p,
  blockquote {
    width: 95%;
  }
  .markdown-view p {
    margin: 0 auto;
  }
  .markdown-view p,
  blockquote {
    margin: 2rem auto;
  }
  .markdown-view blockquote p {
    width: 100%;
    margin: 1rem 0;
  }
}
</style>
