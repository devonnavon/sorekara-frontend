<template>
  <div :style="{ backgroundImage: `url(${url})` }" class="image"></div>
</template>
<script>
import bus from "../../bus";

export default {
  name: "ImageCard",
  props: {
    url: String,
    id: Number,
  },
  data() {
    return {};
  },
  mounted() {
    const img = new Image();
    const id = this.id;
    img.onload = function () {
      // console.log(img.width, "yoyo");
      // console.log(img.height, "yoyo");
      // bus.$emit("resize-card", id, img.height, img.width);
    };
    img.src = this.url;
    // bus.$emit("resize-card", this.id, img.height, img.width);
  },
};
</script>
<style>
.image {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
