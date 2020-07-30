<!-- src/App/index.vue -->
<template>
  <div>
    <TheHeader></TheHeader>
    <div>WHYs</div>
  </div>
</template>
<script>
import TheHeader from "../components/layout/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader: TheHeader,
  },

  data() {
    return {};
  },
};
</script>
<style></style>
