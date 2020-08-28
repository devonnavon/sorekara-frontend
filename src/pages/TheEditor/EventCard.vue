<template>
  <div
    class="group border border-dashed border-orange w-full relative pt-8 border-opacity-25 hover:border-opacity-100"
  >
    <button
      type="button"
      class="btn-close absolute left-0 top-0 ml-2 mt-2 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
      aria-label="Delete event"
      @click="deleteEventCard"
    >
      <IconifyIcon
        :icon="icons.deleteIcon"
        class="text-orange h-5 w-5 transition duration-500 ease-in-out hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
      />
    </button>
    <div class="flex justify-center -mt-6">
      <button
        type="button"
        v-handle
        class="handle focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
        aria-label="Reorder Event Media"
      >
        <IconifyIcon
          :icon="icons.dragHorizontal"
          class="text-orange h-6 w-6 transition duration-500 hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
        />
      </button>
    </div>
    <!-- <SortableList
			v-model="cardItemCopy"
			:useDragHandle="true"
			@sort-end="itemMove"
		>
			<CardItem
				v-for="(media, index) in cardItemCopy"
				:index="index"
				:media="media"
				:key="media.id"
				class="my-4"
			></CardItem>
    </SortableList>-->

    <grid-layout
      :layout.sync="layout"
      :responsive-layouts="layouts"
      :col-num="3"
      :row-height="baseHeight"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :responsive="true"
      :use-css-transforms="true"
      :cols="{ md: 12, sm: 1}"
      :breakpoints="{md: 996, sm: 768}"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
      @layout-updated="layoutUpdatedEvent"
      @breakpoint-changed="breakpointChangedEvent"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :minW="3"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
        class="group border border-dotted border-orange relative mx-auto border-opacity-25 hover:border-opacity-100"
      >
        {{ 'i: '+ item.i }}
        <!-- <CardItem :index="index" :media="item" :key="item.id" :ref="item.id"></CardItem> -->
      </grid-item>
    </grid-layout>
    <div class="flex flex-row justify-center py-3">
      <DropDown :on-click="createCardItem" :items="mediaType" class="self-center z-50">
        <IconifyIcon
          :icon="icons.plusCircleOutlined"
          class="text-orange text-center fill-current bg-white transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none sm:text-opacity-0 sm:group-hover:text-opacity-100 transition duration-500 ease-in-out"
        />
      </DropDown>
    </div>
  </div>
</template>
<script>
import DropDown from "../../components/event/DropDown.vue";
import CardItem from "./CardItem.vue";

import { ElementMixin, HandleDirective } from "vue-slicksort";
import SortableList from "../../components/ui/SortableList.vue";

import VueGridLayout from "vue-grid-layout";

import IconifyIcon from "@iconify/vue";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";
import deleteIcon from "@iconify/icons-wpf/delete";
import dragHorizontal from "@iconify/icons-mdi/drag-horizontal";

import bus from "../../bus";

const cardItemInfo = [
  {
    id: 0,
    type: "text",
    url: "xxx.com",
    text: "hello",
    layout: {
      md: { x: 0, y: 0, w: 3, h: 2, i: 0 },
      sm: { x: 0, y: 3, w: 3, h: 2, i: 0 },
    },
  },
  {
    id: 1,
    type: "text",
    url: "xxx.com",
    text: "hello",
    layout: {
      md: { x: 3, y: 0, w: 3, h: 2, i: 1 },
      sm: { x: 0, y: 0, w: 3, h: 2, i: 1 },
    },
  },
];

const layoutsArray = cardItemInfo.map((e) => e.layout);
const cardItemCopy = {
  md: layoutsArray.map((e) => e.md),
  sm: layoutsArray.map((e) => e.sm),
};

export default {
  name: "EventCard",
  components: {
    DropDown,
    CardItem,
    IconifyIcon,
    SortableList,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  props: {
    size: { type: String, default: "full" },
    cardItem: { type: Array, default: () => [] },
    id: { type: String },
  },
  mixins: [ElementMixin],
  data() {
    return {
      // activeMedia: '',
      mediaType: ["text", "image"],
      icons: {
        plusCircleOutlined,
        deleteIcon,
        dragHorizontal,
      },

      baseHeight: 30,
      layout: cardItemCopy["md"],
      layouts: cardItemCopy,
      // cardItemCopy: this.cardItem
      // 	.slice()
      // 	.sort((a, b) => a.sortOrder - b.sortOrder),
    };
  },
  created() {
    bus.$on("card-media-delete", this.removeCardItem);
    // this.cardItemCopy.forEach((element, i) => {
    // 	this.$set(element, 'x', i);
    // 	this.$set(element, 'y', i);
    // 	this.$set(element, 'w', 1);
    // 	this.$set(element, 'h', 1);
    // 	this.$set(element, 'i', element.id);
    // });
  },
  methods: {
    layoutCreatedEvent: function (newLayout) {
      console.log("Created layout: ", newLayout);
    },
    layoutBeforeMountEvent: function (newLayout) {
      console.log("beforeMount layout: ", newLayout);
    },
    layoutMountedEvent: function (newLayout) {
      console.log("Mounted layout: ", newLayout);
    },
    layoutReadyEvent: function (newLayout) {
      console.log("Ready layout: ", newLayout);
    },
    layoutUpdatedEvent: function (newLayout) {
      console.log("Updated layout: ", newLayout);
    },
    moveEvent: function (i, newX, newY) {
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log(
        "RESIZE i=" +
          i +
          ", H=" +
          newH +
          ", W=" +
          newW +
          ", H(px)=" +
          newHPx +
          ", W(px)=" +
          newWPx
      );
    },
    movedEvent: function (i, newX, newY) {
      console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    /**
     *
     * @param i the item id/index
     * @param newH new height in grid rows
     * @param newW new width in grid columns
     * @param newHPx new height in pixels
     * @param newWPx new width in pixels
     *
     */
    resizedEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log(
        "RESIZED i=" +
          i +
          ", H=" +
          newH +
          ", W=" +
          newW +
          ", H(px)=" +
          newHPx +
          ", W(px)=" +
          newWPx
      );
    },
    /**
     *
     * @param i the item id/index
     * @param newH new height in grid rows
     * @param newW new width in grid columns
     * @param newHPx new height in pixels
     * @param newWPx new width in pixels
     *
     */
    containerResizedEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log(
        "CONTAINER RESIZED i=" +
          i +
          ", H=" +
          newH +
          ", W=" +
          newW +
          ", H(px)=" +
          newHPx +
          ", W(px)=" +
          newWPx
      );
    },
    /**
     *
     * @param newBreakpoint the breakpoint name
     * @param newLayout the chosen layout for the breakpoint
     *
     */
    breakpointChangedEvent: function (newBreakpoint, newLayout) {
      console.log(
        "BREAKPOINT CHANGED breakpoint=",
        newBreakpoint,
        ", layout: ",
        newLayout
      );
    },
    async deleteEventCard() {
      let response = await this.$api.eventCard.deleteEventCard(this.id);
      if (response) {
        bus.$emit("event-card-delete", this.id);
      }
    },
    async createCardItem(type) {
      let response = await this.$api.cardItem.create({
        eventCardId: this.id,
        type,
        sortOrder: this.cardItem.length + 1,
      });
      this.$set(response, "x", this.cardItemCopy.length);
      this.$set(response, "y", this.cardItemCopy.length);
      this.$set(response, "w", 10);
      this.$set(response, "h", 10);
      this.$set(response, "i", response.id);
      this.cardItemCopy.push(response);
    },
    removeCardItem(id) {
      const index = this.cardItemCopy.findIndex((item) => item.id === id);
      this.cardItemCopy.splice(index, 1);
    },
    async itemMove(e) {
      //card media!!!
      let cardItemId = this.cardItemCopy[e.oldIndex].id;
      await this.$api.cardItem.update({
        id: cardItemId,
        sortOrder: e.newIndex + 1,
      });
    },
  },
  directives: { handle: HandleDirective },
};
</script>
<style></style>
