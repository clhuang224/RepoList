<template>
    <div class="loader">
        <div class="circle"></div>
    </div>
</template>
<script>
export default {
    name: "Loader"
};
</script>

<style scoped lang="scss">
$loaderBackgroundColor: #000;
$loaderCircleColor: #fff;
$loaderCircleSize: 50px;
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: $loaderBackgroundColor;
    .circle {
        border-radius: 50%;
        width: $loaderCircleSize;
        height: $loaderCircleSize;
        border-color: $loaderCircleColor transparent;
        border-width: 5px;
        border-style: solid;
        animation: spin 2s linear infinite;
    }
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
