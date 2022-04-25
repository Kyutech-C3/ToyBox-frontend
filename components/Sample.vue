<template>
  <div>
    <h1>
      {{ sample }}
    </h1>
    nuxt-property-decoratorの使い方は
    <a href="https://kalappo.net/nuxt-property-decorator-component/">こちら</a>
    <user-info />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// import UserInfo from '@/components/UserInfo.vue'

@Component({
  components: {
    // UserInfo
  }
})
export default class Sample extends Vue {
  @Prop({ type: String, required: true, default: 'not found' })
  sample: string | undefined
}
</script>

<style scoped></style>
