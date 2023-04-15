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
        z-50
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

import Prism from '@/plugins/prism'

@Component
export default class MarkdownView extends Vue {
  showAll: boolean = false
  markdownViewHeiht: number = 500

  @Ref() markdownView!: HTMLElement

  @Prop({ type: String, required: true })
  markdownText!: string

  mounted() {
    this.markdownViewHeiht = this.markdownView.getBoundingClientRect().height
    Prism.highlightAll()
  }
}
</script>

<style lang="scss">
.hidden-blur::before {
  background: linear-gradient(to top, #ffffff 20%, #ffffff00 100%);
  position: absolute;
  bottom: 0;
  left: 0;
  content: '';
  height: 20%;
  width: 100%;
  z-index: 20;
}

.markdown-view {
  @apply text-xl;
  @apply break-words;

  ol {
    @apply list-decimal;
    @apply pl-10;
  }

  ul {
    @apply list-disc;
    @apply pl-10;
  }

  h1 {
    @apply text-6xl;
  }

  h2 {
    @apply text-5xl;
  }

  h3 {
    @apply text-4xl;
  }

  h1,
  h2,
  h3 {
    --bg-color: rgb(96, 170, 255);
    @apply font-semibold;
    @apply border-b-[3px];
    @apply border-b-bg-color;
    @apply border-dotted;
    @apply mb-6;
    @apply pb-[5px];
    @apply pt-[10px];
  }

  p {
    @apply mb-5;
    @apply mt-[5px];

    code {
      @apply bg-[#f0f0f0];
      @apply py-[1px];
      @apply px-[5px];
      @apply rounded-[5px];
      @apply text-[#905];
    }
  }

  pre {
    @apply rounded-2xl;
    code {
      @apply text-base;
    }
  }

  hr {
    --bg-color: rgb(96, 170, 255);
    @apply border-b-[3px];
    @apply border-b-bg-color;
    @apply border-dotted;
    @apply my-8;
    @apply mx-0;
  }
}

.markdown-view img {
  @apply block;
  @apply w-4/5;
  @apply h-auto;
  @apply my-0;
  @apply mx-auto;
  @apply rounded-[20px];
  @apply pointer-events-none;
}

table {
  --bg-color: rgb(198, 198, 198);
  @apply border-collapse;
  @apply border;
  @apply border-bg-color;
  @apply my-6;
  @apply mx-auto;
  @apply rounded-[10px];
  @apply overflow-hidden;
  box-shadow: 0 0 0 1px rgb(198, 198, 198);
}

th,
td {
  --bg-color: rgb(198, 198, 198);
  @apply py-[5px];
  @apply px-[10px];
  @apply border;
  @apply border-bg-color;
}

th {
  @apply bg-[#ebf8ff];
}

@media screen and (max-width: 600px) {
  .markdown-view {
    h1,
    h2,
    h3 {
      @apply py-0;
      @apply px-[5px];
    }

    p {
      @apply my-0;
      @apply mx-auto;
    }

    blockquote {
      p {
        @apply w-full;
        @apply my-4;
        @apply mx-0;
      }
    }

    p,
    blockquote {
      @apply w-[95%];
      @apply my-8;
      @apply mx-auto;
    }
  }

  .markdown-view img {
    @apply w-[90%];
    @apply rounded-[10px];
  }
}
</style>
