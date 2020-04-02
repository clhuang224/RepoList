<template>
    <div class="sidebar">
        <div
            class="avatar"
            :style="`background-image:url(${data.avatar_url})`"
        ></div>
        <h1>
            {{ data.name }} <span class="subtitle">{{ data.login }}</span>
        </h1>
        <ul class="list">
            <li class="item">
                <a
                    :href="
                        `https://www.google.com.tw/maps/search/${data.location}`
                    "
                >
                    <font-awesome-icon
                        class="icon"
                        :icon="['fas', 'map-marker-alt']"
                    />
                    <span class="text">{{ data.location }}</span>
                </a>
            </li>
            <li class="item">
                <a :href="data.blog">
                    <font-awesome-icon class="icon" :icon="['fas', 'rss']" />
                    <span class="text">{{ data.blog | simplifyUrl }}</span>
                </a>
            </li>
            <li class="item">
                <a :href="`mailto:${data.email}`">
                    <font-awesome-icon
                        class="icon"
                        :icon="['fas', 'envelope']"
                    />
                    <span class="text">{{ data.email }}</span>
                </a>
            </li>
            <li class="item">
                <a :href="data.html_url">
                    <font-awesome-icon class="icon" :icon="['fab', 'github']" />
                    <span class="text">{{ data.html_url | simplifyUrl }}</span>
                </a>
            </li>
        </ul>

        <div class="loading"></div>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    data: () => ({
        data: [],
        loading: true
    }),
    methods: {
        getData: function() {
            let that = this;
            this.$http({
                method: "get",
                url: `https://api.github.com/users/${process.env.VUE_APP_ID}`,
                header: {
                    Accept: "application/vnd.github.v3+json"
                },
                params: {
                    access_token: process.env.VUE_APP_GITHUB_ACCESS_TOKEN
                }
            })
                .then(res => {
                    that.data = res.data;
                    that.loading = false;
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    filters: {
        simplifyUrl: function(value) {
            return value
                ? value.replace("http://", "").replace("https://", "")
                : "";
        }
    },
    mounted() {
        this.getData();
    }
};
</script>

<style scoped lang="scss">
$sidebarTextColor: #fff;
$sidebarHoverColor: #fff;

$sidebarWidth: 250px;
$avatarSize: $sidebarWidth * 0.6;

$titleSize: 1.2rem;

$listTextSize: 0.8rem;

.sidebar {
    color: $sidebarTextColor;
    padding: 10px;
    display: flex;
    flex-direction: column;
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
            color: $sidebarTextColor;
            &::after{
                background-color: $sidebarHoverColor;
            }
        }
    }
}
</style>
