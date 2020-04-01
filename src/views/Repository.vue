<template>
    <div class="repository">
        <ul class="list">
            <li class="item" v-for="(item, index, key) of data" :key="key">
                <div class="name">{{ item.name }}</div>
                <div class="html_url">{{ item.html_url }}</div>
                <div class="homepage">{{ item.homepage }}</div>
                <div class="description">{{ item.description }}</div>
                <div class="languages">{{ item.languages }}</div>
                <div class="updated_at">{{ item.updated_at }}</div>
            </li>
        </ul>
        <div class="loading"></div>
    </div>
</template>

<script>
export default {
    name: "Repository",
    data: function() {
        return {
            page: 1,
            loading: true,
            data: [],
            backgroundUrl: ""
        };
    },
    computed: {},
    methods: {
        getData: function() {
            let that = this;
            this.$http({
                method: "get",
                url: `https://api.github.com/users/clhuang224/repos?page=${this.page}&per_page=5&sort=updated`,
                header: {
                    Accept: "application/vnd.github.v3+json"
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
    mounted() {
        this.getData();
    }
};
</script>

<style scoped></style>
