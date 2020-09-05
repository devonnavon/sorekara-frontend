<template>
  <!-- <div v-if="text">{{ text }}</div> -->
  <Trumbowyg :width="width" :containerWidth="containerWidth()" :id="id" :text="text"></Trumbowyg>
  <!-- <HtmlItem :contentHTML="contentHTML" v-else></HtmlItem> -->
  <!-- :style="`--margin-top: ${computedMargin}`" -->
  <!-- :style="margin-top: calculateWidth()" -->
</template>
<script>
import bus from "../../bus";
import Trumbowyg from "../../components/ui/Toolbar.vue";

// buttons.style.marginTop = "-109px";

export default {
  name: "TextItem",
  components: {
    Trumbowyg,
  },
  props: {
    id: Number,
    text: String,
    width: Number,
    // containerWidth: Number,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    console.log(this.$parent);
  },
  methods: {
    containerWidth() {
      return this.$parent.containerWidth;
    },
  },

  //   created() {
  //     if (!this.$refs.trumbo) {
  //       console.log("This doesn't exist yet!");
  //     }

  //     this.$nextTick(() => {
  //       if (this.$refs.trumbo) {
  //         console.log(this.$refs.trumbo);
  //         console.log(this.$refs.trumbo.$parent.$parent.$el.clientWidth);
  //       }
  //     });
  //   },
  //   updated() {
  //     this.$nextTick(() => {
  //       if (this.$refs.trumbo) {
  //         console.log(this.$refs.trumbo);
  //         console.log(this.$refs.trumbo.$parent.$parent.$el.clientWidth);
  //       }
  //     });
  //   },
  //   this.$refs.trumbo.querySelector("trumbowyg-button-pane")
  // mounted() {},
  //   computed: {
  //     toolbarMargin: function () {
  //       return {
  //         "one-line": this.width >= 8,
  //         "two-line": this.width >= 5 && this.width < 8,
  //       };
  //     },
  //   },

  // },
};
</script>
<style>
.trumbowyg-box {
  height: 100%;
  min-height: 88px;
  margin: auto;
  flex: 1;
}
.trumbowyg-editor,
.trumbowyg-textarea {
  min-height: calc(100% - 39px);
  height: 100%;
}

/* .one-line {
  padding-top: -37px;
}

.two-line {
  margin-top: -73px;
} */
/* .trumbowyg-button-pane {
  --margin-top: -109px;
  margin-top: var(--margin-top);
} */

/* @media only screen and (min-width: 600px) {
  .trumbowyg-button-pane {
    margin-top: -73px;
  }
}

@media only screen and (min-width: 767px) {
  .trumbowyg-button-pane {
    margin-top: -37px;
  }
}

@media only screen and (min-width: 865px) {
} */
</style>
