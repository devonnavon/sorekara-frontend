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
    img.src = this.url;
    bus.$emit("resize-card", this.id, img.height, img.width);
    console.log(img.height, "yoyo");
  },
};
</script>
<style>
.image {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
}
</style>
