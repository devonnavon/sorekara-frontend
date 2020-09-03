<!-- home -->
<template>
  <div>
    <span>hellooo</span>
    <div v-html="contentHTML"></div>
  </div>
</template>
<script>
export default {
  name: "HtmlItem",
  components: {},
  props: {
    contentHTML: String,
  },
  data() {
    return {};
  },
};
</script>
<style></style>
