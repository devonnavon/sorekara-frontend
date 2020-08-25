<template>
  <vue-dropzone
    ref="imgDropzone"
    id="imgDropzone"
    :options="dropzoneOptions"
    @vdropzone-processing="newFileAdded"
    @vdropzone-complete="afterComplete"
    class="border border-dotted border-orange border-opacity-25 font-display text-base text-orange hover:bg-orange hover:bg-opacity-25 text-lg text-opacity-75"
  ></vue-dropzone>
</template>
<script>
import bus from "../../bus";

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "ImageMedia",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: "bad",
        thumbnailWidth: 250,
        thumbnailHeight: 250,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png, .gif",
        sendFileToServer: true,
        withCredentials: false,
      },
    };
  },
  methods: {
    async newFileAdded(file) {
      console.log("yo");
      this.dropzoneOptions.url = "https://httpbin.org/post";
    },
    async afterComplete(file) {
      //   try {
      //     const filename = uuid.v1();
      //     const url = await this.$api.file.upload(file, filename);
      //     this.$refs.imgDropzone.removeFile(file);
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
  },
};
</script>
<style>
</style>
