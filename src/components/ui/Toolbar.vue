<template>
  <!-- <div>
		<form method="post" action="/" @submit.prevent="submit()">
  <div>-->
  <trumbowyg
    v-if="!isHTML"
    ref="trumbo"
    v-model="content"
    :config="configs.basic"
    v-on-clickaway="closeMethod"
  ></trumbowyg>
  <div v-else v-html="content" @click="toggleHTML" class="p-5 h-full"></div>
  <!-- @click="toggleHTML -->
  <!-- @tbw-blur="toggleView"
  @tbw-init="triggerFocus()"-->
  <!-- v-on-clickaway="closeMethod" -->
  <!-- <htmlitem v-else :contentHTML="form.content"></htmlitem> -->
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

// import HtmlItem from "../../pages/TheEditor/HtmlItem.vue";

//clickaway stuff
import { mixin as clickaway } from "vue-clickaway";

import bus from "../../bus";

// :style="`margin-top: ${toolbarMargin}`"

export default {
  props: {
    width: Number,
    containerWidth: Number,
  },
  mixins: [clickaway],

  watch: {
    width: {
      immediate: false,
      handler: function () {
        this.setMargin();
      },
    },
    containerWidth: {
      immediate: false,
      handler: function () {
        this.setMobileMargin();
      },
    },
  },
  mounted() {
    this.setMargin();
    this.setMobileMargin();
  },
  updated() {
    this.setMargin();
    this.setMobileMargin();
  },

  data() {
    return {
      isHTML: false,

      content: "<p>You can put a whole lot of stuff in here</p>",

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
      // bus.$emit("tbw-blur", this.form.content);
      this.$refs.trumbo.el.trumbowyg("disable");
      this.$refs.trumbo.el.trumbowyg("destroy");
      this.isHTML = !this.isHTML;
    },
    toggleHTML() {
      this.isHTML = !this.isHTML;
    },
    checkClass(arr, val) {
      return arr.some(function (arrVal) {
        return arrVal.classList.contains(val);
      });
    },
    closeMethod(e) {
      var target = e.target;
      var parentList = [];
      while (target) {
        parentList.unshift(target);
        target = target.parentElement;
      }
      if (this.checkClass(parentList, "trumbowyg-editor")) return;
      if (this.checkClass(parentList, "trumbowyg-box")) return;
      if (this.checkClass(parentList, "trumbowyg-modal")) return;
      console.log(parentList);
      this.$refs.trumbo.el.trumbowyg("disable");
      this.$refs.trumbo.el.trumbowyg("destroy");
      this.isHTML = true;
    },
    containsElement(editor, element) {
      function predicate(item) {
        if (item.getEl().contains(element)) return true;

        if (item.menu) {
          if (predicate(item.menu)) return true;
        }

        if (item.items) {
          if (Array.from(item.items()).some(predicate)) return true;
        }

        return false;
      }

      return predicate(editor.theme.panel);
    },
    setMargin() {
      if (this.$refs.trumbo) {
        if (this.width >= 8) {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
            "-37px";

          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
              i
            ].style.marginTop = "-37px";
          }
        } else if (this.width >= 5 && this.width < 8) {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
            "-73px";
          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
              i
            ].style.marginTop = "-73px";
          }
        } else {
          this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
            "-109px";
          for (
            let i = 3;
            i <
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
              .childNodes.length;
            i++
          ) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
              i
            ].style.marginTop = "-109px";
          }
        }
      }
    },
    setMobileMargin() {
      if (this.width === 3) {
        if (this.$refs.trumbo) {
          if (this.containerWidth <= 287) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
              "-146px";
            for (
              let i = 3;
              i <
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
                .childNodes.length;
              i++
            ) {
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
                i
              ].style.marginTop = "-146px";
            }
          } else if (this.containerWidth <= 405) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
              "-109px";
            for (
              let i = 3;
              i <
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
                .childNodes.length;
              i++
            ) {
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
                i
              ].style.marginTop = "-109px";
            }
          } else if (this.containerWidth <= 718) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
              "-73px";
            for (
              let i = 3;
              i <
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
                .childNodes.length;
              i++
            ) {
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
                i
              ].style.marginTop = "-73px";
            }
          } else if (this.containerWidth <= 996) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
              "-37px";
            for (
              let i = 3;
              i <
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
                .childNodes.length;
              i++
            ) {
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
                i
              ].style.marginTop = "-37px";
            }
          } else if (this.containerWidth <= 1120) {
            this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
              "-146px";
            for (
              let i = 3;
              i <
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
                .childNodes.length;
              i++
            ) {
              this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
                i
              ].style.marginTop = "-146px";
            }
          } else if (this.containerWidth > 1120) {
            this.setMargin();
          }
        }
      }
    },
  },
};

// if (this.width === 3) {
// 	if (
// 		this.$refs.trumbo.$parent.$parent.$parent.$parent.$el.clientWidth <=
// 		1119
// 	) {
// 		console.log('this is hitting');
// 		this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[0].style.marginTop =
// 			'-146px';
// 		for (
// 			let i = 3;
// 			i <
// 			this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2]
// 				.childNodes.length;
// 			i++
// 		) {
// 			this.$refs.trumbo.$parent.$parent.$parent.$el.childNodes[2].childNodes[
// 				i
// 			].style.marginTop = '-146px';
// 		}
// 	}
// 	console.log(
// 		this.$refs.trumbo.$parent.$parent.$parent.$parent.$el.clientWidth
// 	);
// }
</script>
<style></style>
