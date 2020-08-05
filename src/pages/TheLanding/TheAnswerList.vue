<!-- src/pages/TheHome/TheAnswerList.vue -->
<template>
  <div>
    <div v-for="(text, index) in textInfo" :key="index">
      <div class="font-display w-100% sm:w-2/5">
        <div class="text-orange text-3xl pb-3">{{ text.title }}</div>
        <div class="text-orange text-x1 pb-10">{{ text.answer }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheAnswerList",
  components: {},
  props: {
    textInfo: Array,
  },
  data() {
    return {};
  },
};
</script>
<style></style>
