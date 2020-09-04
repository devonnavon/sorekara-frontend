<template>
  <div class="flex justify-center content-center h-full">
    <button
      @click="selectType('text')"
      class="rounded-full h-12 w-12 flex items-center justify-center self-center bg-orange mx-4"
    >
      <IconifyIcon :icon="icons.bxText" class="text-white fill-current text-4xl self-center" />
    </button>
    <button
      @click="selectType('image')"
      class="rounded-full h-12 w-12 flex items-center justify-center self-center bg-orange mx-4"
    >
      <IconifyIcon :icon="icons.fileImageOutlined" class="text-white fill-current text-4xl" />
    </button>
  </div>
</template>
<script>
import bus from "../../bus";

import IconifyIcon from "@iconify/vue";
import bxText from "@iconify/icons-bx/bx-text";
import fileImageOutlined from "@iconify/icons-ant-design/file-image-outlined";

export default {
  components: {
    IconifyIcon,
  },
  name: "NewItem",
  props: {
    id: Number,
  },
  mounted() {},
  data() {
    return {
      icons: {
        bxText,
        fileImageOutlined,
      },
    };
  },
  methods: {
    selectType(type) {
      bus.$emit("type-selected", this.id, type);
    },
  },
};
</script>
<style></style>
