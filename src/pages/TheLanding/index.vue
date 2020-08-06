<!-- src/pages/TheHome/index.vue -->
<template>
  <div class="pt-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
      <TheQuestionList :textInfo="qAndA" :title="questionTitle"></TheQuestionList>
      <TheCallToAction class="order-first md:order-last"></TheCallToAction>
    </div>
    <div>
      <TheAnswerList :textInfo="qAndA"></TheAnswerList>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import bus from "../../bus";

import TheQuestionList from "./TheQuestionList.vue";
import TheAnswerList from "./TheAnswerList.vue";
import TheCallToAction from "./TheCallToAction.vue";

export default {
  name: "TheLanding",
  components: {
    TheQuestionList,
    TheAnswerList,
    TheCallToAction,
  },

  data() {
    return {
      focusedIndex: null,
      questionTitle:
        "What makes an event feel substantial? Even after the fact?",
      qAndA: [],
    };
  },
  created() {
    bus.$on("question-click", this.focusAnswer);
  },
  async mounted() {
    this.qAndA = await this.requestLandingTextData();
  },
  methods: {
    focusAnswer(index) {
      //if there is a currently focused object remove
      if (this.focusedIndex !== null) this.setFocus(this.focusedIndex, false);
      this.focusedIndex = index;
      this.setFocus(this.focusedIndex, true);
    },
    setFocus(index, bool) {
      let item = { ...this.qAndA[index] };
      item.focused = bool;
      this.$set(this.qAndA, index, item);
    },
    async requestLandingTextData() {
      let r = await axios.post(process.env.API_URL, {
        query: `
            query {
              landingTexts  {
                title
                question
                answer
              }
            }
        `,
      });
      return await r.data.data.landingTexts;
    },
  },
};
</script>
<style></style>
