<!-- src/App/index.vue -->
<template>
  <div>
    <TheHeader></TheHeader>
    <TheLanding></TheLanding>
  </div>
</template>
<script>
import TheHeader from "../components/layout/TheHeader.vue";
import TheLanding from "../pages/TheLanding/index.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheLanding,
  },

  data() {
    return {};
  },
};
</script>
<style></style>
