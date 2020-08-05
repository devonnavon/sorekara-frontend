<!-- src/pages/TheHome/TheQuestionList.vue -->
<template>
  <div class="font-display">
    <h1 class="text-orange text-3xl pb-10">{{ title }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-orange text-x1">
      <div
        v-for="(text, index) in textInfo"
        :key="index"
        @click="questionClick(index)"
      >{{ text.question }}</div>
    </div>
  </div>
</template>
<script>
import bus from "../../bus";

export default {
  name: "TheQuestionList",
  components: {},
  props: {
    title: String,
    textInfo: Array,
  },
  data() {
    return {};
  },
  methods: {
    questionClick(index) {
      bus.$emit("question-click", index);
    },
  },
};
</script>
<style></style>
