<template>
  <!-- <div>
		<form method="post" action="/" @submit.prevent="submit()">
  <div>-->
  <trumbowyg ref="trumbo" v-model="form.content" @tbw-blur="toggleView" :config="configs.basic"></trumbowyg>
</template>

<script>
import Trumbowyg from "vue-trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";
// Plugins are optional
import "trumbowyg/dist/plugins/colors/trumbowyg.colors.js";
import "trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.min.css";
import "trumbowyg/dist/plugins/pasteembed/trumbowyg.pasteembed.js";
import "trumbowyg/dist/plugins/emoji/ui/trumbowyg.emoji.min.css";
import "trumbowyg/dist/plugins/emoji/trumbowyg.emoji.min.js";
import "trumbowyg/dist/plugins/fontfamily/trumbowyg.fontfamily.min.js";
import "trumbowyg/dist/plugins/fontsize/trumbowyg.fontsize.min.js";

// :style="`margin-top: ${toolbarMargin}`"

export default {
  props: {
    width: Number,
  },
  watch: {
    width: {
      immediate: false,
      handler: function () {
        if (this.width >= 8) {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[0].style.marginTop =
            "-37px";

          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[
              i
            ].style.marginTop = "-37px";
          }
        } else if (this.width >= 5 && this.width < 8) {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[0].style.marginTop =
            "-73px";
          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[
              i
            ].style.marginTop = "-73px";
          }
        } else {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[0].style.marginTop =
            "-109px";
          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[
              i
            ].style.marginTop = "-109px";
          }
        }
      },
    },
  },
  created() {
    this.$nextTick(() => {
      if (this.$refs.trumbo) {
        if (this.width >= 8) {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[0].style.marginTop =
            "-37px";

          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[
              i
            ].style.marginTop = "-37px";
          }
        } else if (this.width >= 5 && this.width < 8) {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[0].style.marginTop =
            "-73px";
          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[
              i
            ].style.marginTop = "-73px";
          }
        } else {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[0].style.marginTop =
            "-109px";
          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[0].childNodes[
              i
            ].style.marginTop = "-109px";
          }
        }
      }
    });
  },
  computed: {
    toolbarMargin: function () {
      return {
        "-37px": this.width >= 8,
        "-73px": this.width >= 5 && this.width < 8,
      };
    },
  },

  data() {
    return {
      form: {
        content: "<h1>You can put a whole lot of stuff in here</h1>",
        body: null,
      },
      // http://alex-d.github.io/Trumbowyg/documentation.html#basic-options
      configs: {
        basic: {
          //   btnsAdd: [
          //     "foreColor",
          //     "backColor",
          //     "emoji",
          //     "fontfamily",
          //     "fontsize",
          //   ],
          //   resetCss: true,
          btns: [
            // ['viewHTML'],
            // ["formatting"],
            ["undo", "redo"], // Only supported in Blink browsers
            ["fontfamily"],
            ["fontsize"],
            ["foreColor"],
            ["backColor"],
            ["emoji"],
            ["strong", "em", "del"],
            ["link"],
            ["removeformat"],
            ["unorderedList", "orderedList"],
            ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
          ],
          plugins: {
            fontfamily: {
              fontList: [
                {
                  name: "Karrik Regular",
                  family: "Karrik-Regular, sans-serif",
                },
                {
                  name: "Happy Times at the IKOB",
                  family: "Happy Times at the IKOB, serif",
                },
                {
                  name: "Compagnon",
                  family: "Compagnon, serif",
                },
                {
                  name: "Lack Regular",
                  family: "Lack Regular, sans-serif",
                },
                {
                  name: "Lack Line",
                  family: "Lack Line, sans-serif",
                },
                {
                  name: "Typefesse",
                  family: "Typefesse, fantasy",
                },
                {
                  name: "Minipax",
                  family: "Minipax",
                },
                {
                  name: "Avara",
                  family: "Avara",
                },
                {
                  name: "Bluu Next",
                  family: "Bluu Next",
                },
                {
                  name: "Format 1452",
                  family: "Format 1452",
                },
                {
                  name: "Kaeru Kaeru",
                  family: "Kaeru Kaeru",
                },
                {
                  name: "Sporting Grotesque",
                  family: "Sporting Grotesque",
                },
                {
                  name: "Terminal Grotesque",
                  family: "Terminal Grotesque",
                },
              ],
            },
          },
        },
      },
    };
  },
  components: {
    Trumbowyg,
  },
  methods: {
    submit() {
      console.log("Form submit event", this.form);
      alert("Form submitted.");
    },
    setNewValue() {
      console.log("Set new value");
      this.form.content = '<h3 class="bg-success">New content inserted</h3>';
    },
    listenToBlurEvent(event) {
      console.log("listen to blur event");
    },
    listenToInitEvent(event) {
      console.log("listen to init event");
    },
    toggleView() {
      console.log(this.$refs.trumbo("html"));

      console.log("yo");
    },
  },
};
</script>
<style>
/* .trumbowyg-button-pane {
  margin-top: -37;
} */
</style>
