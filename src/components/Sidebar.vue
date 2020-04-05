<template>
  <div class="sidebar" :class="{ hide: toggleSidebar === false }">
    <button class="toggleButton" @click="toggleSidebar = !toggleSidebar">
      <font-awesome-icon class="icon" :icon="['fas', 'ellipsis-v']" />
    </button>
    <div v-if="loading === false">
      <div
        class="avatar"
        :style="`background-image:url(${data.avatar_url})`"
      ></div>
      <h1>
        {{ data.name }}
        <span class="subtitle">{{ data.login }}</span>
      </h1>
      <ul class="list">
        <li class="item">
          <a
            :href="`https://www.google.com.tw/maps/search/${data.location}`"
            target="_blank"
          >
            <font-awesome-icon class="icon" :icon="['fas', 'map-marker-alt']" />
            <span class="text">{{ data.location }}</span>
          </a>
        </li>
        <li class="item">
          <a :href="data.blog" target="_blank">
            <font-awesome-icon class="icon" :icon="['fas', 'rss']" />
            <span class="text">{{ data.blog | simplifyUrl }}</span>
          </a>
        </li>
        <li class="item">
          <a :href="`mailto:${data.email}`">
            <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
            <span class="text">{{ data.email }}</span>
          </a>
        </li>
        <li class="item">
          <a :href="data.html_url" target="_blank">
            <font-awesome-icon class="icon" :icon="['fab', 'github']" />
            <span class="text">{{ data.html_url | simplifyUrl }}</span>
          </a>
        </li>
      </ul>
    </div>
    <Loader type="global" zIndex="999" v-else></Loader>
  </div>
</template>

<script>
import Loader from "./Loader";
export default {
  name: "Sidebar",
  components: { Loader },
  data: () => ({
    data: [],
    loading: true,
    toggleSidebar: true
  }),
  methods: {
    getData: function() {
      this.loading = true;
      let that = this;
      this.$http({
        method: "get",
        url: `https://api.github.com/users/${process.env.VUE_APP_ID}`,
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${process.env.VUE_APP_GITHUB_ACCESS_TOKEN_1}${process.env.VUE_APP_GITHUB_ACCESS_TOKEN_2}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          that.data = res.data;
          that.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    simplifyUrl: function(value) {
      return value ? value.replace("http://", "").replace("https://", "") : "";
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/_color.scss";

$sidebarWidth: 250px;
$avatarSize: $sidebarWidth * 0.6;

$titleSize: 1.2rem;

$listTextSize: 0.8rem;

.sidebar {
  color: $secondary;
  background-color: $primary;
  height: 100vh;
  padding: 10px;
  position: fixed;
  display: flex;
  flex-direction: column;
  width: $sidebarWidth;
  z-index: 99999;
  transition: transform cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s;
  box-shadow: 0 0 5px #333;
  .toggleButton {
    position: absolute;
    right: 5px;
    top: 15px;
    width: 30px;
    height: 30px;
    font-size: 2em;
    background: none;
    border: none;
    color: $secondary;
    border-radius: 0 5px 5px 0;
    transition: transform cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s,
      background-color cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s;
    &:hover {
      color: $tertiary-1;
    }
  }
  &.hide {
    transform: translateX(-250px);
    .toggleButton {
      transform: translateX(40px);
      color: $primary;
      background-color: $secondary;
      border: 1px solid #eee;
      border-left: none;
      &:hover {
        color: $tertiary-1;
      }
    }
  }
}

.avatar {
  width: $avatarSize;
  height: $avatarSize;
  border-radius: 50%;
  background-size: contain;
  background-position: center center;
  align-self: center;
  margin: 20px;
}
h1 {
  padding: 5px;
  font-size: $titleSize;
  .subtitle {
    font-size: $titleSize * 0.7;
    opacity: 0.7;
  }
}

.list {
  font-size: $listTextSize;
  padding: 5px;
  .icon {
    margin-right: 0.3em;
    width: 1em;
  }
  .item {
    padding: 6px;
    @import "../assets/scss/_link.scss";
    a {
      color: $secondary;
      &::after {
        background-color: $tertiary-2;
        bottom: -10%;
        height: 3px;
      }
      &:hover::after {
        opacity: 1;
      }
    }
  }
}
</style>
