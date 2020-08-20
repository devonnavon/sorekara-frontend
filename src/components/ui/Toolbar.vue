<template>
  <div>
    <main class="container">
      <div class="row">
        <div class="col-md-8 mb-3">
          <form method="post" action="/" @submit.prevent="submit()">
            <div class="form-group">
              <label>Basic example</label>
              <trumbowyg v-model="form.content" class="form-control" :config="configs.basic"></trumbowyg>
            </div>

            <div class="form-group">
              <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
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

export default {
  data() {
    return {
      form: {
        content: "<h1>Preloaded content</h1>",
        body: null,
      },
      // http://alex-d.github.io/Trumbowyg/documentation.html#basic-options
      configs: {
        basic: {
          autogrow: true,
          //   btnsAdd: [
          //     "foreColor",
          //     "backColor",
          //     "emoji",
          //     "fontfamily",
          //     "fontsize",
          //   ],
          autogrowOnEnter: true,
          //   resetCss: true,
          btns: [
            ["viewHTML"],
            // ["formatting"],
            ["undo", "redo"], // Only supported in Blink browsers
            ["fontfamily"],
            ["fontsize"],
            ["foreColor"],
            ["backColor"],
            ["emoji"],
            ["strong", "em", "del"],
            ["link"],
            ["insertImage"],
            ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
            ["unorderedList", "orderedList"],
            ["removeformat"],
            ["fullscreen"],
          ],
          plugins: {
            fontfamily: {
              fontList: [
                {
                  name: "Karrik-Regular",
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
  },
};
</script>
<style>
.trumbowyg-box,
.trumbowyg-editor {
  margin: 0;
}
</style>
