<template>
  <div class="bg-white grid grid-row-3 grid-flow-row gap-0 border-4 border-black rounded-3xl max-w-2xl">
      <div class="row-span-1">
        <div class="flex items-center flex-row-reverse h-24">
          <div class="text-black text-center px-3 py-2 m-6 border-2 border-black rounded-full">
            <font-awesome-icon class="w-4 m-auto" :icon="['fas', 'times']" />
          </div>
        </div>
      </div>
      <div class="row-span-1">
        <div class="flex grid-col-5 grid-flow-col"> 
          <div class="flex-shrink-0 w-24" />
            <div class="flex justify-center flex-wrap gap-3">
              <tag tagText="text"/>
            </div>    
          <div class="flex-shrink-0 w-24" />
        </div>
      </div>
      <div class="row-span-1">
        <div class="flex items-center flex-row-reverse h-24">
          <custom-button class="px-7 m-6" title="完了" @click="showEditProfile = false" />
          <div class="text-gray-700 text-center  px-4 py-2 m-2">{{deNumerator}} / {{Numerator}}</div>
        </div>
      </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import FormTag from '~/components/Tag.vue'
import CustomButton from '@/components/ToyboxButton.vue'
import FormTagWindowCloseButton from '@/components/form/FormTagWindowCloseButton.vue'

@Component({
  components: { 
    CustomButton,
    FormTag,
    FormTagWindowCloseButton
  }
})
export default class FormTagWindow extends Vue {
  Numerator = 1
  deNumerator = 10
}
</script>
