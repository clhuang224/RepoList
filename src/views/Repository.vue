<template>
    <div class="repository">
        <ul class="list" v-if="loading === false">
            <div v-for="(item, index, key) of data" :key="key">
                <li
                    class="item"
                    v-if="item.id !== 252436010"
                    :style="{
                        backgroundImage: `url(
                        https://clhuang224.github.io/screenshot/${item.id}.png)`
                    }"
                >
                    <div class="cover">
                        <div class="bar">
                            <h3 class="title">
                                {{ item.name }}
                            </h3>
                            <p class="description">{{ item.description }}</p>
                            <ul class="icons">
                                <li class="html_url">
                                    <a
                                        :href="item.html_url"
                                        target="_blank"
                                        :alt="item.html_url"
                                    >
                                        <font-awesome-icon
                                            class="icon"
                                            :icon="['fas', 'code']"
                                        />
                                    </a>
                                </li>
                                <li class="homepage" v-if="item.homepage">
                                    <a
                                        :href="item.homepage"
                                        target="_blank"
                                        :alt="item.homepage"
                                    >
                                        <font-awesome-icon
                                            class="icon"
                                            :icon="['fas', 'eye']"
                                        />
                                    </a>
                                </li>
                            </ul>
                            <ul class="languages" v-if="item.languages">
                                <li
                                    class="language"
                                    v-for="(language, i, k) of item.languages
                                        .array"
                                    :key="k"
                                    :style="{
                                        width: `${(language.value * 100) /
                                            item.languages.sum}%`,
                                        borderColor:
                                            languageColor[language.name].color
                                    }"
                                    :data-text="language.name"
                                ></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </div>
        </ul>
        <Loader class="loader" v-if="loading === true" />
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
            loading: true,
            data: [],
            languageColor: languageColor
        };
    },
    filters: {
        simplifyUrl: function(value) {
            return value
                ? value.replace("http://", "").replace("https://", "")
                : "";
        }
    },
    methods: {
        getData: function() {
            this.loading = true;
            let that = this;
            this.$http({
                method: "get",
                url: `https://api.github.com/users/clhuang224/repos`,
                header: {
                    Accept: "application/vnd.github.nebula-preview+json"
                },
                params: {
                    // access_token: process.env.VUE_APP_GITHUB_ACCESS_TOKEN,
                    sort: "pushed",
                    page: this.page,
                    per_page: 100
                }
            })
                .then(res => {
                    that.data = res.data;
                    for (let i = 0; i < that.data.length; i++) {
                        if (i === that.data.length - 1) {
                            that.getLanguages(i, true);
                        }
                    }
                })
                .catch(err => {
                    throw err;
                });
        },
        getLanguages: function(index, last) {
            let that = this;
            this.$http({
                method: "get",
                url: `https://api.github.com/repos/clhuang224/${this.data[index].name}/languages`,
                header: {
                    Accept: "application/vnd.github.v3+json"
                },
                // params: {
                //     access_token: process.env.VUE_APP_GITHUB_ACCESS_TOKEN
                // }
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
                    that.data[index].languages = obj;
                    if (last) {
                        this.loading = false;
                    }
                })
                .catch(err => {
                    that.data[index].languages = undefined;
                    console.log(err);
                });
        }
    },
    mounted() {
        this.getData();
    }
};
</script>

<style lang="scss" scoped>
$listTextSize: 16px;
$listTextColor: #000;

.repository {
    margin-left: 250px;
    position: relative;
}
.list {
    font-size: $listTextSize;
    color: $listTextColor;
}

.item {
    background-attachment: fixed;
    background-size: calc(100% - 250px);
    background-position: right 0 top 0;
    background-repeat: no-repeat;
    height: 150vh;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 10px #333;
    border: 5px solid #fff;
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
            color: $listTextColor;
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
                }
            }
        }
        .languages {
            display: flex;
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
.loader {
    height: 100vh;
}
</style>
