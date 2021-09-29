<template>
  <div>
    <works-form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import WorksForm from '~/components/form/WorksForm.vue'

@Component({
  components: {
    WorksForm
  }
})
export default class Create extends Vue {
}
</script>
