<template>
  <div id="app" class="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
export default {
  name: "App",
  components: { Sidebar },
  metaInfo: {
    title: "Lynn's RepoList",
    meta: [
      {
        name: "description",
        content: "這裡展示 Lynn 的 GitHub 專案。"
      },
      {
        property: "og:title",
        content: "Lynn's RepoList"
      },
      {
        property: "og:site_name",
        content: "Lynn's RepoList"
      },
      {
        property: "og:description",
        content: "這裡展示 Lynn 的 GitHub 專案。"
      },
      {
        property: "og:image",
        content:
          "https://avatars1.githubusercontent.com/u/47549901?s=460&u=fb0010a5ba241311fcaad2826a7dda7119a173e5&v=4"
      },
      {
        property: "og:url",
        content: "https://github.com/clhuang224/RepoList"
      }
    ]
  }
};
</script>

<style lang="scss">
@import "reset-css";
@import "./assets/scss/_font.scss";

* {
  box-sizing: border-box;
}
.app {
  font-family: "huninn";
  font-size: 12px;
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  button {
    cursor: pointer;
    outline: none;
  }
}
</style>
