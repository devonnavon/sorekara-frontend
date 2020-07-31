<!-- src/pages/TheHome/index.vue -->
<template>
  <div class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
      <TheQuestionList :textInfo="qAndA" :title="questionTitle"></TheQuestionList>
      <TheCallToAction class="order-first sm:order-last"></TheCallToAction>
    </div>
    <div>
      <TheAnswerList :textInfo="qAndA"></TheAnswerList>
    </div>
  </div>
</template>
<script>
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
      qAndA: [
        {
          title: "the space",
          question: "The space? A unique environment to associate it to?",
          answer:
            "Curate your post event space just as you would the event itself. Choose fonts, colors, background images, layouts, and more!",
        },
        {
          title: "the artifacts",
          question:
            "Is it social? Seeing expected and unexpected people, making friends, and having side conversations.",
          answer:
            "A place to hold all “things” related to your event. Further readings, slides, songs, recordings, pictures, merch, it’s up to you.",
        },
        {
          title: "the social",
          question: "Or is it simply the intimacy of gathering collectively.",
          answer:
            "Encourage connections within your audience. Facilitate further discussion, exchanging of contact info, and hopefully the creation of smaller, tighter knit communities.",
        },
        {
          title: "the host connection",
          question:
            "Artifacts? Whether it be pictures, merch, wristbands, and etc.",
          answer:
            "Engagement with your audience doesn’t have to end when the event does. Share thoughts, have conversations, make friends!",
        },
        {
          title: "the collective intimacy",
          question: "Connection to the artist or organizer?",
          answer:
            "Ultimately, sorekara aims to provide a space where you can revel in the post event glow with your community of like-minded folks.",
        },
      ],
    };
  },
  created() {
    bus.$on("question-click", this.focusAnswer);
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
  },
};
</script>
<style></style>
