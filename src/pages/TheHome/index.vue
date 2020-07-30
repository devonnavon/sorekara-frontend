<!-- src/pages/TheHome/index.vue -->
<template>
  <div>
    <TheQuestionList></TheQuestionList>
    <TheAnswerList></TheAnswerList>
    <TheCallToAction></TheCallToAction>
  </div>
</template>
<script>
import TheQuestionList from "./TheQuestionList.vue";
import TheAnswerList from "./TheAnswerList.vue";
import TheCallToAction from "./TheCallToAction.vue";

export default {
  name: "TheHome",
  components: {
    TheQuestionList,
    TheAnswerList,
    TheCallToAction,
  },

  data() {
    return {};
  },
};
</script>
<style></style>
