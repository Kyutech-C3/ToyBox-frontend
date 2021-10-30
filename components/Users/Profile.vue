<template>
  <div class="flex flex-col content-center justify-center items-center border-2 border-gray-400 rounded-3xl px-60">
    <div class="m-5">
      <img class="w-64 border-2 border-gray-400 rounded-full" :src="userImage" alt="User image">
    </div>
    <div class="text-4xl m-5">
      {{ userName }}
    </div>
    <div class="text-2xl m-5">
      {{ userDescription }}
    </div>
    <div v-show="!isDisableEdit" class="m-5">
      <custom-button
        title="プロフィール編集"
        @click="showEditProfile = true"
      />
      <div
        v-show="showEditProfile"
        class="bg-gray-300 fixed h-screen inset-0 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white w-2/3 h-2/3 rounded-md">
          <custom-button
            title="とじる"
            @click="showEditProfile = false"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-around w-full my-5">
      <a :href="githubLink" target="_blank" title="GitHub">
        <font-awesome-icon class="w-10 text-gray-500" :icon="['fab', 'github']" />
      </a>
      <a :href="twitterLink" target="_blank" title="Twitter">
        <font-awesome-icon class="w-10 text-gray-500" :icon="['fab', 'twitter']" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CustomButton from '@/components/ToyboxButton.vue'

@Component({
  components: {
    CustomButton
  }
})
export default class Profile extends Vue {
  @Prop({ type: String, required: true })
  userImage!: string

  @Prop({ type: String, required: true })
  userName!: string

  @Prop({ type: String, required: true })
  userDescription!: string

  @Prop({ type: String, required: true })
  githubLink!: string

  @Prop({ type: String, required: true })
  twitterLink!: string

  @Prop({ type: Boolean, required: false, default: false })
  isDisableEdit!: boolean

  showEditProfile: boolean = false
}
</script>
