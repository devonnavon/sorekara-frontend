<template>
  <div class="border border-orange w-full relative pt-8">
    <button
      type="button"
      class="btn-close absolute left-0 top-0 ml-2 mt-2 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
      aria-label="Delete event"
      @click="deleteEventCard"
    >
      <IconifyIcon
        :icon="icons.deleteIcon"
        class="text-orange h-5 w-5 transition duration-500 hover:text-red"
      />
    </button>
    <div class="border border-dotted border-orange w-11/12 relative mx-auto p-5">{{ cardMedia }}</div>
    <SortableList v-model="cardMediaCopy" :distance="5">
      <TheCardMedia
        v-for="(media, index) in cardMediaCopy"
        :index="index"
        :media="media"
        :key="media.id"
      ></TheCardMedia>
    </SortableList>

    <!-- <TheCardMedia
			v-for="media in cardMedia"
			:media="media"
			:key="media.id"
    ></TheCardMedia>-->
    <div class="flex flex-row justify-center py-3">
      <DropDown :on-click="chooseMedia" :items="mediaType" class="self-center z-50">
        <IconifyIcon
          :icon="icons.plusCircleOutlined"
          class="text-orange text-center fill-current bg-white transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none"
        />
      </DropDown>
    </div>
  </div>
</template>
<script>
import DropDown from "../../components/event/DropDown.vue";
import TheCardMedia from "./TheCardMedia.vue";

import { ElementMixin } from "vue-slicksort";
import SortableList from "../../components/ui/SortableList.vue";

import IconifyIcon from "@iconify/vue";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";
import deleteIcon from "@iconify/icons-wpf/delete";
import bus from "../../bus";

export default {
  name: "TheEventCard",
  components: {
    DropDown,
    TheCardMedia,
    IconifyIcon,
    SortableList,
  },
  props: {
    size: { type: String, default: "full" },
    cardMedia: { type: Array, default: () => [] },
    id: { type: String },
  },
  mixins: [ElementMixin],
  data() {
    return {
      activeMedia: "",
      mediaType: ["Text", "Image"],
      icons: {
        plusCircleOutlined,
        deleteIcon,
      },
      cardMediaCopy: this.cardMedia,
    };
  },
  methods: {
    chooseMedia(mediaType) {
      this.activeMedia = mediaType;
    },
    async deleteEventCard() {
      console.log(this.id);
      let response = await this.$api.eventCard.deleteEventCard(this.id);
      if (response) {
        bus.$emit("event-card-delete", this.id);
      }
    },
  },
  // watch: {
  // 	cardMedia: function(newVal, oldVal) {
  // 		// watch it
  // 		this.cardMediaCopy = newVal;
  // 	},
  // },
};
</script>
<style></style>
