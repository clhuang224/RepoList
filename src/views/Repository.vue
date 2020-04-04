<template>
  <div class="repository">
    <ul class="list">
      <div v-for="(item, index, key) of data" :key="key">
        <li
          class="item"
          v-if="item.id !== 252436010"
          :style="{
            backgroundImage: `url(
                        https://clhuang224.github.io/screenshot/${data[index].id}.png)`
          }"
        >
          <div class="cover">
            <div class="bar">
              <h3 class="title">
                {{ item.name }}
              </h3>
              <p class="description">
                {{ item.description }}
              </p>
              <ul class="icons">
                <li class="html_url">
                  <a :href="item.html_url" target="_blank" :alt="item.html_url">
                    <font-awesome-icon class="icon" :icon="['fas', 'code']" />
                  </a>
                </li>
                <li class="homepage" v-if="item.homepage">
                  <a :href="item.homepage" target="_blank" :alt="item.homepage">
                    <font-awesome-icon class="icon" :icon="['fas', 'eye']" />
                  </a>
                </li>
              </ul>
              <ul class="languages" v-if="item.languages">
                <li
                  class="language"
                  v-for="(language, i, k) of item.languages.array"
                  :key="k"
                  :style="{
                    width: `${(language.value * 100) / item.languages.sum}%`,
                    borderColor: languageColor[language.name].color
                  }"
                  :data-text="language.name"
                ></li>
              </ul>
            </div>
          </div>
        </li>
      </div>
    </ul>
    <div class="noMore" v-if="noMore === true">已無更多資料</div>
    <Loader class="loader" type="bottom" zIndex="99" v-if="loading === true" />
  </div>
</template>

<script>
import languageColor from "../assets/json/colors.json";
import Loader from "../components/Loader";
export default {
  name: "Repository",
  components: { Loader },
  data: function() {
    return {
      page: 1,
      per_page: 3,
      noMore: false,
      loading: true,
      data: [],
      index: 0,
      languageColor: languageColor
    };
  },
  filters: {
    simplifyUrl: function(value) {
      return value ? value.replace("http://", "").replace("https://", "") : "";
    }
  },
  methods: {
    getData: function() {
      this.loading = true;
      let that = this;
      this.$http({
        method: "get",
        url: `https://api.github.com/users/${process.env.VUE_APP_ID}/repos`,
        headers: {
          Accept: "application/vnd.github.nebula-preview+json",
          Authorization: `Bearer ${process.env.VUE_APP_GITHUB_ACCESS_TOKEN_1}${process.env.VUE_APP_GITHUB_ACCESS_TOKEN_2}`,
          "Content-Type": "application/json"
        },
        params: {
          sort: "pushed",
          page: this.page,
          per_page: this.per_page
        }
      })
        .then(res => {
          let base = that.data.length;
          let languageLoading = new Array(res.data.length);
          if (res.data.length < that.per_page) {
            that.noMore = true;
            if (res.data.length === 0) {
              that.loading = false;
            }
          }
          for (let i = 0; i < languageLoading.length; i++) {
            languageLoading[i] = true;
          }
          for (let i = 0; i < res.data.length; i++) {
            that.data.push(res.data[i]);
          }
          for (let i = 0; i < languageLoading.length; i++) {
            that.getLanguages(base, i, languageLoading);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLanguages: function(base, offset, languageLoading) {
      let that = this;
      this.$http({
        method: "get",
        url: `https://api.github.com/repos/${process.env.VUE_APP_ID}/${
          this.data[base + offset].name
        }/languages`,
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${process.env.VUE_APP_GITHUB_ACCESS_TOKEN_1}${process.env.VUE_APP_GITHUB_ACCESS_TOKEN_2}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          let obj = {
            sum: 0,
            array: []
          };
          for (let key in res.data) {
            obj.array.push({
              name: key,
              value: res.data[key]
            });
            obj.sum += res.data[key];
          }
          that.data[base + offset].languages = obj;
          languageLoading[offset] = false;
          for (let i = 0; i < languageLoading.length; i++) {
            if (languageLoading[i] === true) {
              break;
            } else {
              if (i === languageLoading.length - 1) {
                that.loading = false;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  },
  created() {
    let that = this;
    document.addEventListener("scroll", () => {
      if (
        that.noMore === false &&
        document.documentElement.scrollHeight -
          window.innerHeight -
          document.documentElement.scrollTop <
          200 &&
        that.loading === false
      ) {
        that.page++;
        that.getData();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_color.scss";
$listTextSize: 16px;

.repository {
  margin-left: 250px;
  position: relative;
}
.list {
  font-size: $listTextSize;
  color: $primary;
}

.item {
  height: 150vh;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 10px #333;
  border: 5px solid $secondary;
  background-attachment: fixed;
  background-size: calc(100% - 250px);
  background-position: right 0 top 0;
  background-repeat: no-repeat;
  .cover {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .bar {
    padding: 3em;
    background-color: rgba(255, 255, 255, 1);
    width: 100%;
    position: absolute;
    top: 10%;
    box-shadow: 0 0 5px #888;
    .title {
      font-size: $listTextSize * 1.5;
      text-shadow: 1px 1px 1px #888;
      .updated_at {
        font-size: $listTextSize * 0.8;
      }
    }
    .description {
      font-size: $listTextSize;
      padding: 5px;
    }
    a {
      color: $primary;
      text-decoration: none;
    }
    .icons {
      display: flex;
      align-items: center;
      position: absolute;
      right: 2em;
      top: 2em;
      a {
        margin-left: 0.8em;
      }
      .icon {
        width: 1em;
        transition: 0.3s;
        &:hover {
          transform: scale(1.5);
          color: $tertiary-2;
        }
      }
    }
    .languages {
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 1.5em;
      left: 0;
      .language {
        display: flex;
        justify-content: center;
        font-size: 80%;
        padding: 5px;
        border-bottom: 0.5em solid;
        position: relative;
        cursor: pointer;
        &::after {
          content: attr(data-text);
          display: block;
          position: absolute;
          bottom: -1.8em;
          opacity: 0;
          transition: 0.4s;
        }
        &:hover::after {
          opacity: 1;
        }
      }
    }
  }
}
.noMore {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
@media (max-width: 768px) {
  .repository {
    margin: 0;
    .item {
      background-position: center top;
      background-size: 100%;
    }
  }
}
</style>
