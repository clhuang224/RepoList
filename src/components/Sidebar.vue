<template>
    <div class="sidebar">
        <div class="name">{{ data.name }}</div>
        <img :src="data.avatar_url" alt="avatar" />
        <div class="company">{{ data.company }}</div>
        <div class="blog">{{ data.blog }}</div>
        <div class="email">{{ data.email }}</div>
        <div class="created_at">{{ data.created_at }}</div>
        <div class="html_url">{{ data.html_url }}</div>
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

<style scoped lang="scss">
.sidebar {
    width: 325px;
}
</style>
