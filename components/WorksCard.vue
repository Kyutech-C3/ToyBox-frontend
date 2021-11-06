<template>
  <div class="w-64 h-80 border-2 border-gray-400 rounded-3xl">
    <div class="h-1/2 border-b">
      <img class="h-full m-auto" :src="image">
    </div>
    <div class="h-1/2 p-3">
      <div class="h-1/4 text-center text-xl">
        {{ name }}
      </div>
      <div class="w-1/2 mx-auto my-0.5 border border-blue-500" />
      <div class="h-1/4 text-center">
        tag
      </div>
      <div class="h-1/4 text-right">
        {{ date }}
      </div>
      <div class="h-1/4">
        <div class="flex items-center">
          <img class="w-8 border border-gray-500 rounded-full" :src="users[0].image" alt="">
          <div class="ml-1.5">
            {{ users[0].name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface Users {
  image: string
  name: string
}

@Component
export default class WorksCard extends Vue {
  @Prop({ type: String, required: true })
  image: string = 'https://1.bp.blogspot.com/-OnSHKvYNcv4/XSGF5lk32TI/AAAAAAABTk4/acb-SM9CPBkQahuhNItcpNA2dsnhH0AiwCLcBGAs/s400/vr_game_mother_boy.png'

  @Prop({ type: String, required: true })
  name: string = '作品名'

  @Prop({ type: String, required: true })
  tags: string = 'タグ'

  @Prop({ type: String, required: true })
  date: string = '2021/10/31'

  @Prop({ type: Array, required: true })
  users: Users[] = [
    {
      image: 'https://3.bp.blogspot.com/-2VIWJTc7MBs/VCIiteBs3wI/AAAAAAAAmec/BkjJno4Qh5U/s170/animal_buta.png',
      name: 'ぶたさん'
    }
  ]
}
</script>
