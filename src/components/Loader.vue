<template>
  <div class="loader" :data-type="type" :style="`z-index:${zIndex}`">
    <div class="circle" :style="`z-index:${zIndex + 1}`"></div>
  </div>
</template>
<script>
export default {
  name: "Loader",
  props: ["type", "zIndex"],
  mounted() {}
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
  &[data-type="global"] {
    position: fixed;
    width: 100%;
    height: 100vh;
  }

  .circle {
    border-radius: 50%;
    width: $loaderCircleSize;
    height: $loaderCircleSize;
    border-color: $loaderCircleColor transparent;
    border-width: 5px;
    border-style: solid;
    animation: spin 2s linear infinite;
    z-index: 999;
  }
  &[data-type="bottom"] {
    position: initial;
    width: 100%;
    height: 50px;
    .circle {
      width: 25px;
      height: 25px;
      border-width: 3px;
    }
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
