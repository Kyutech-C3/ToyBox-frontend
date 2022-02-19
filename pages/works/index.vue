<template>
  <div class="w-192 mx-auto">
    <refine-search-form class="w-11/12 mx-auto my-16" />
    <div class="flex flex-wrap w-full">
      <works-card
        v-for="(workData, index) in responses"
        :key="index"
        :image="workData.user.avatar_url"
        :name="workData.title"
        :tags="workData"
        :date="workData.updated_at"
        :users="workData.user"
        class="h-80 card-width"
      />
    </div>
    <div>{{ responses }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import axios from "axios";
import WorksCard from "~/components/WorksCard.vue";
import RefineSearchForm from "~/components/RefineSearchForm.vue";
import { Work } from "~/types";

@Component({
  components: {
    WorksCard,
    RefineSearchForm,
  },
  async asyncData() {
    const response = await axios.get("/works");
    console.log(response.data);
    if (response.data.length === 0) {
      alert("作品がありません");
    } else if (!response.data) {
      alert("作品一覧の取得に失敗しました");
    }

    return { workList: response.data };
  },
})
export default class WorkIndex extends Vue {
  worksData = [
    {
      id: "1",
      title: "hoge",
      description: "hogehoge",
      description_html: "<h2>hogehoge</h2>",
      github_url: "",
      work_url: "",
      user: {
        id: "1",
        name: "hoge",
        email: "hoge@hoge.com",
        display_name: "hogehoge",
        avatar_url: "",
        profile: "",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      community: {
        name: "hack",
        description: "hackhack",
        id: "1",
        description_html: "<h3>hackhack</h3>",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      private: false,
      created_at: "2021/20/20 12:42:23",
      updated_at: "2021/20/20 12:42:23",
    },
    {
      id: "2",
      title: "hoge",
      description: "hogehoge",
      description_html: "<h2>hogehoge</h2>",
      github_url: "",
      work_url: "",
      user: {
        id: "1",
        name: "hoge",
        email: "hoge@hoge.com",
        display_name: "hogehoge",
        avatar_url: "",
        profile: "",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      community: {
        name: "hack",
        description: "hackhack",
        id: "1",
        description_html: "<h3>hackhack</h3>",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      private: false,
      created_at: "2021/20/20 12:42:23",
      updated_at: "2021/20/20 12:42:23",
    },
    {
      id: "3",
      title: "hoge",
      description: "hogehoge",
      description_html: "<h2>hogehoge</h2>",
      github_url: "",
      work_url: "",
      user: {
        id: "2",
        name: "hoge",
        email: "hoge@hoge.com",
        display_name: "hogehoge",
        avatar_url: "",
        profile: "",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      community: {
        name: "hack",
        description: "hackhack",
        id: "1",
        description_html: "<h3>hackhack</h3>",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      private: false,
      created_at: "2021/20/20 12:42:23",
      updated_at: "2021/20/20 12:42:23",
    },
    {
      id: "4",
      title: "hoge",
      description: "hogehoge",
      description_html: "<h2>hogehoge</h2>",
      github_url: "",
      work_url: "",
      user: {
        id: "1",
        name: "hoge",
        email: "hoge@hoge.com",
        display_name: "hogehoge",
        avatar_url: "",
        profile: "",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      community: {
        name: "hack",
        description: "hackhack",
        id: "1",
        description_html: "<h3>hackhack</h3>",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      private: false,
      created_at: "2021/20/20 12:42:23",
      updated_at: "2021/20/20 12:42:23",
    },
    {
      id: "5",
      title: "hoge",
      description: "hogehoge",
      description_html: "<h2>hogehoge</h2>",
      github_url: "",
      work_url: "",
      user: {
        id: "1",
        name: "hoge",
        email: "hoge@hoge.com",
        display_name: "hogehoge",
        avatar_url: "",
        profile: "",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      community: {
        name: "hack",
        description: "hackhack",
        id: "1",
        description_html: "<h3>hackhack</h3>",
        created_at: "2021/20/20 12:42:23",
        updated_at: "2021/20/20 12:42:23",
      },
      private: false,
      created_at: "2021/20/20 12:42:23",
      updated_at: "2021/20/20 12:42:23",
    },
  ] as Array<Work>;

  workList: Array<Work> = [];

  get responses() {
    // console.log(this.workList);
    return this.workList;
  }
  // @Provide() workList: Array<Work> = [];
}
</script>

<style scoped>
.card-width {
  width: calc(33.333% - 10px);
  min-width: 230px;
  margin: 0 15px 15px 0;
}
.card-width:nth-child(3n) {
  margin-right: 0;
}
.card-list {
  min-width: 760px;
  max-width: 850px;
}
</style>
