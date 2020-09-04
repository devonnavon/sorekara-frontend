<template>
  <div v-if="newUrl" :style="{ backgroundImage: `url(${newUrl})` }" class="image"></div>
  <div v-else>
    <VueFileAgent
      v-show="componentState === 'VueFileAgent'"
      ref="vueFileAgent"
      :theme="'list'"
      :multiple="false"
      :deletable="true"
      :meta="true"
      :accept="'image/*,.zip'"
      :maxSize="'10MB'"
      :maxFiles="14"
      :helpText="'Choose images or zip files'"
      :errorText="{
				type: 'Invalid file type. Only images or zip Allowed',
				size: 'Files should not exceed 10MB in size',
			}"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
    ></VueFileAgent>
    <div v-show="componentState === 'Loading'" class="flex flex-row justify-center py-4">
      <!-- <vue-ellipse-progress
        :progress="progress"
        :determinate="false"
        color="#E85A0B"
        empty-color="#324c7e"
        :size="35"
        :thickness="thickness"
        :emptyThickness="emptyThickness"
        :lineMode="lineMode"
        animation="rs 700 1000"
        :loading="true"
        :no-data="true"
        :dot="dot"
      ></vue-ellipse-progress>-->
      <Loader />
    </div>
  </div>
</template>
<script>
import bus from "../../bus";
import uuid from "uuid";

import VueFileAgentPlugin from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";

import Loader from "../../components/ui/Loader.vue";

export default {
  name: "ImageItem",
  props: {
    url: String,
    id: Number,
  },
  components: {
    VueFileAgent: VueFileAgentPlugin.VueFileAgent,
    Loader,
  },
  created() {
    if (this.url) {
      this.componentState = "ImageMediaItem";
      this.newUrl = this.url;
    } else {
      this.componentState = "VueFileAgent";
    }
  },
  watch: {
    newUrl(newOne, oldOne) {
      // console.log(newOne);
      this.componentState = "ImageMediaItem";
    },
  },
  mounted() {
    //stuff below will be done somewhere other than mounted
    // const img = new Image();
    // const id = this.id;
    // img.onload = function() {
    // 	// console.log(img.width, "yoyo");
    // 	// console.log(img.height, "yoyo");
    // 	// bus.$emit("resize-card", id, img.height, img.width);
    // };
    // img.src = this.url;
    // // bus.$emit("resize-card", this.id, img.height, img.width);
  },
  data() {
    return {
      fileRecordsForUpload: [],
      componentState: null,
      newUrl: null,
      // progress: 45,
      // lineModes: [
      //   "normal",
      //   "in",
      //   "in-over",
      //   "out",
      //   "out-over",
      //   "top",
      //   "bottom",
      // ],
      // thickness: 3,
      // emptyThickness: 3,
      // dot: { size: 1, width: "1px" },
      // lineMode: "normal 0",
    };
  },
  methods: {
    uploadFiles() {
      // Using the default uploader. You may use another uploader instead.

      this.$refs.vueFileAgent.upload(this.fileRecordsForUpload);
      this.fileRecordsForUpload = [];
    },
    async filesSelected(fileRecordsNewlySelected) {
      //of the files dropped in filter out thos with an error then concat them to upload list
      this.componentState = "Loading";
      const validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      // upload to s3
      const filename = uuid();
      const url = await this.$api.file.upload(
        this.fileRecordsForUpload[0].file,
        filename
      );
      // const cardMedia = await this.$api.cardMedia.update({
      // 	id: parseInt(this.id),
      // 	url,
      // });
      this.newUrl = url;
    },
    onBeforeDelete(fileRecord) {
      //find the index of file to be deleted, remove from record list trigger delete event (fileDeleted)
      const i = this.fileRecordsForUpload.indexOf(fileRecord);
      this.fileRecordsForUpload.splice(i, 1);
      this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
    },
    fileDeleted(fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      //delete file from fileagent
      this.$refs.vueFileAgent.deleteUpload(fileRecord);
    },
    // randomNumberInRange() {
    //   (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
    // },
    // randomizeOptions() {
    //   const mode = this.lineModes[
    //     this.randomNumberInRange(0, this.lineModes.length - 1)
    //   ];
    //   const offset = this.randomNumberInRange(0, 15);
    //   this.lineMode = `${mode} ${offset}`.trim();
    //   this.progress = this.randomNumberInRange(0, 100);
    //   this.thickness = this.randomNumberInRange(1, 10);
    //   this.emptyThickness = this.randomNumberInRange(1, 10);
    //   this.dot.size = this.randomNumberInRange(1, 20);
    //   this.dot.width = `${this.randomNumberInRange(1, 10)}px`;
    // },
  },
};
</script>
<style>
.image {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: -1;
}
</style>
