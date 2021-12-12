<template>
  <div>
    <p class="font-light text-gray-400">
      2021/12/24 12:00
    </p>
    <p class="text-3xl">
      ToyBox Frontend
    </p>
    <div class="inline-flex items-center mt-5">
      <img class="border rounded-full w-10 h-10 border-gray-400" src="http://3.bp.blogspot.com/-n0PpkJL1BxE/VCIitXhWwpI/AAAAAAAAmfE/xLraJLXXrgk/s800/animal_hamster.png" alt="">
      <p class="ml-3">
        ハムタロサァン
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class WorksTitle extends Vue {

}
</script>
