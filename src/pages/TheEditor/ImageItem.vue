<template>
  <div v-if="newUrl" :style="{ backgroundImage: `url(${newUrl})` }" class="image"></div>
  <div class="h-full" v-else>
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
      :helpText="'Drag an image file here!'"
      :errorText="{
				type: 'Invalid file type. Only images allowed',
				size: 'Files should not exceed 10MB in size',
			}"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
      class="h-full text-orange font-display"
    ></VueFileAgent>
    <div
      v-show="componentState === 'Loading'"
      class="flex flex-row justify-center content-center h-full"
    >
      <Loader class="self-center justify-center" />
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
      this.newImageFlag = true;
      this.componentState = "VueFileAgent";
    }
  },
  watch: {
    newUrl(newOne, oldOne) {
      if (this.newImageFlag) {
        const img = new Image();
        const id = this.id;
        img.src = newOne;
        img.onload = () => {
          bus.$emit("resize-card", id, img.height, img.width);
        };
      }
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
      newImageFlag: false,
    };
  },
  methods: {
    // uploadFiles() {
    //   // Using the default uploader. You may use another uploader instead.
    //   this.$refs.vueFileAgent.upload(this.fileRecordsForUpload);
    //   this.fileRecordsForUpload = [];
    // },
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
      const response = await this.$api.cardItem.update({ id: this.id, url });
      this.newUrl = url;
    },
    // onBeforeDelete(fileRecord) {
    //   //find the index of file to be deleted, remove from record list trigger delete event (fileDeleted)
    //   const i = this.fileRecordsForUpload.indexOf(fileRecord);
    //   this.fileRecordsForUpload.splice(i, 1);
    //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
    // },
    // fileDeleted(fileRecord) {
    //   // Using the default uploader. You may use another uploader instead.
    //   //delete file from fileagent
    //   this.$refs.vueFileAgent.deleteUpload(fileRecord);
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

.grid-block-wrapper,
.vue-file-agent,
.file-input-wrapper,
.is-single {
  height: 100%;
}

.grid-block-wrapper > div:nth-child(2) > div:nth-child(1),
.grid-block-wrapper > div:nth-child(2),
.file-preview-wrapper {
  height: 100%;
}

.file-preview > span > .help-text {
  height: 100%;
  color: #e85a0b !important;
}

.file-preview {
  align-items: center;
  height: 100%;
}

.theme-list .vue-file-agent .file-preview-wrapper .file-preview {
  height: 100%;
}
.theme-list .vue-file-agent .file-preview-new svg {
  fill: #e85a0b;
  width: 36px;
  height: 100%;
  position: absolute;
  left: 10px;
  top: -1px !important;
}

/* .theme-list .vue-file-agent .file-preview-wrapper .file-preview {
  background: #00ffd5 !important;
  border: none;
  border-left: 0;
} */
</style>
