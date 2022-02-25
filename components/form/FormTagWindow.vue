<template>

  <div class="bg-white grid grid-row-3 grid-flow-row gap-0 border-4 border-black rounded-3xl">
      <div class="bg-gray-600 row-span-1">
        <div class="flex items-center flex-row-reverse h-24">
          <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
            <font-awesome-icon class="w-7 m-auto" :icon="['fas', 'times']" />
          </div>
        </div>
      </div>
      <div class="row-span-1">
        <div class="grid grid-col-5 grid-flow-col h-60 min-h-full w-60 min-w-full"> 
          <div class="bg-gray-200 col-span-1" />
          <div class="bg-gray-300 col-span-3">
            aaa
          </div>    
          <div class="bg-gray-400 col-span-1" />
        </div>
      </div>
      <div class="bg-gray-500 row-span-1">
        <div class="flex items-center flex-row-reverse h-24">
          <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">1</div>
          <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">1</div>
        </div>
      </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import FormTag from '~/components/form/FormTag.vue'

@Component({
  components: {
    FormTag
  }
})
export default class FormTagWindow extends Vue {
}
</script>
