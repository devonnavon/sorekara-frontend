<template>
  <div>
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
      class="border border-dashed border-orange"
    ></VueFileAgent>
    <!-- <div v-show="componentState === 'Loading'"> -->
    <div v-show="componentState === 'Loading'" class="flex flex-row justify-center py-4">
      <vue-ellipse-progress
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
      ></vue-ellipse-progress>
    </div>
    <img v-show="componentState === 'ImageMediaItem'" :src="newUrl" />
  </div>
</template>
<script>
import bus from "../../bus";

import VueFileAgentPlugin from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";
import Interval from "./interval.js";
// import { VueEllipseProgress } from "vue-ellipse-progress";

import uuid from "uuid";

export default {
  name: "ImageMedia",
  props: {
    url: String,
    id: String,
  },
  components: {
    VueFileAgent: VueFileAgentPlugin.VueFileAgent,
    // VueEllipseProgress,
  },
  created() {
    if (this.url) {
      this.componentState = "ImageMediaItem";
      //   this.randomizeOptions();
      this.newUrl = this.url;
    } else {
      this.componentState = "VueFileAgent";
    }
  },
  // mounted() {
  // 	Interval.addTask(this.randomizeOptions);
  // },
  data() {
    return {
      fileRecordsForUpload: [],
      componentState: null,
      newUrl: null,
      progress: 45,
      lineModes: [
        "normal",
        "in",
        "in-over",
        "out",
        "out-over",
        "top",
        "bottom",
      ],
      thickness: 3,
      emptyThickness: 3,
      dot: { size: 1, width: "1px" },
      lineMode: "normal 0",
    };
  },
  watch: {
    newUrl(newOne, oldOne) {
      console.log(newOne);
      this.componentState = "ImageMediaItem";
    },
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
      const cardMedia = await this.$api.cardMedia.update({
        id: parseInt(this.id),
        url,
      });
      this.newUrl = cardMedia.url;
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
    randomNumberInRange() {
      (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeOptions() {
      const mode = this.lineModes[
        this.randomNumberInRange(0, this.lineModes.length - 1)
      ];
      const offset = this.randomNumberInRange(0, 15);
      this.lineMode = `${mode} ${offset}`.trim();
      this.progress = this.randomNumberInRange(0, 100);
      this.thickness = this.randomNumberInRange(1, 10);
      this.emptyThickness = this.randomNumberInRange(1, 10);
      this.dot.size = this.randomNumberInRange(1, 20);
      this.dot.width = `${this.randomNumberInRange(1, 10)}px`;
    },
  },
  // computed: {
  // 	component() {
  // 		return this.test ? 'vue-ellipse-progress-test' : 'vue-ellipse-progress';
  // 	},
  // },
  mounted() {
    Interval.addTask(this.randomizeOptions);
  },
};
</script>
<style></style>
