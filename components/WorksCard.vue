<template>
  <div class="h-80 border border-gray-300 rounded-3xl shadow-md">
    <div class="h-1/2 border-b">
      <img class="h-full m-auto" :src="image" />
    </div>
    <div class="h-1/2 p-3">
      <div class="mx-auto w-min">
        <div class="text-center text-xl w-max">
          {{ name }}
        </div>
        <div class="w-11/12 mx-auto my-0.5 border border-blue-500" />
      </div>
      <div class="flex justify-center my-2">
        <tag
          v-for="(tag, index) in tags"
          :tagText="tag"
          :key="index"
          class="px-3 py-0.5 mx-1"
        />
      </div>
      <div class="text-right mt-2">
        {{ date }}
      </div>
      <div class="my-0 flex">
        <div
          v-for="(user, index) in users"
          :key="index"
          class="flex items-center mx-1"
        >
          <img
            class="w-8 border border-gray-500 rounded-full"
            :src="user.image"
            alt=""
          />
          <div v-if="users.length === 1" class="ml-1.5">
            {{ user.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Tag from "@/components/Tag.vue";

interface Users {
  image: string;
  name: string;
}

@Component({
  components: {
    Tag,
  },
})
export default class WorksCard extends Vue {
  @Prop({ type: String, required: true })
  image: string =
    "https://1.bp.blogspot.com/-OnSHKvYNcv4/XSGF5lk32TI/AAAAAAABTk4/acb-SM9CPBkQahuhNItcpNA2dsnhH0AiwCLcBGAs/s400/vr_game_mother_boy.png";

  @Prop({ type: String, required: true })
  name: string = "作品名";

  @Prop({ type: String, required: true })
  tags: Array<string> = ["tag1", "tag2"];

  @Prop({ type: String, required: true })
  date: string = "2021/10/31";

  @Prop({ type: Array, required: true })
  users: Users[] = [
    {
      image:
        "https://3.bp.blogspot.com/-2VIWJTc7MBs/VCIiteBs3wI/AAAAAAAAmec/BkjJno4Qh5U/s170/animal_buta.png",
      name: "ぶたさん",
    },
    {
      image:
        "https://3.bp.blogspot.com/-2VIWJTc7MBs/VCIiteBs3wI/AAAAAAAAmec/BkjJno4Qh5U/s170/animal_buta.png",
      name: "ぶたさん",
    },
    {
      image:
        "https://3.bp.blogspot.com/-2VIWJTc7MBs/VCIiteBs3wI/AAAAAAAAmec/BkjJno4Qh5U/s170/animal_buta.png",
      name: "ぶたさん",
    },
  ];
}
</script>
