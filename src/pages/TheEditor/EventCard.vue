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
      ref="grid"
      :layout.sync="layout"
      :responsive-layouts="layouts"
      :row-height="baseHeight"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :autoSize="true"
      :margin="margin"
      :use-css-transforms="true"
      :cols="{ md: 12, sm: 3}"
      :responsive="true"
      :breakpoints="{md: 996, sm: 768}"
      @layout-ready="layoutReadyEvent"
    >
      <grid-item
        :ref="`item_${item.i}`"
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :minW="3"
        class="group border border-dotted border-orange relative mx-auto border-opacity-25 hover:border-opacity-100"
      >
        <ImageCard
          v-if="cardItemsData[item.i].type==='image'"
          :url="cardItemsData[item.i].url"
          :id="item.i"
        ></ImageCard>
        <div v-show="cardItemsData[item.i].type==='text'">{{cardItemsData[item.i].text}}</div>
      </grid-item>
    </grid-layout>
    <div class="flex flex-row justify-center py-3">
      <button
        type="button"
        class="btn-close focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
        aria-label="Add Item"
        @click="addItem"
      >
        <IconifyIcon
          :icon="icons.plusCircleOutlined"
          class="text-orange text-center fill-current bg-white transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none sm:text-opacity-0 sm:group-hover:text-opacity-100 transition duration-500 ease-in-out"
        />
      </button>
    </div>
  </div>
</template>
<script>
import DropDown from "../../components/event/DropDown.vue";
import ImageCard from "./ImageCard.vue";

import { ElementMixin, HandleDirective } from "vue-slicksort";
import SortableList from "../../components/ui/SortableList.vue";

import VueGridLayout from "vue-grid-layout";

import IconifyIcon from "@iconify/vue";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";
import deleteIcon from "@iconify/icons-wpf/delete";
import dragHorizontal from "@iconify/icons-mdi/drag-horizontal";

import bus from "../../bus";

const cardItems = [
  {
    id: 0,
    type: "text",
    url: null,
    text: "some albums I like",
    // "hello myy man swell is firing today pretty cool huh gonna get pitted and shit hello myy man swell is firing today pretty cool huh gonna get pitted and shit hello myy man swell is firing today pretty cool huh gonna get pitted and shit hello myy man swell is firing today pretty cool huh gonna get pitted and shit hello myy man swell is firing today pretty cool huh gonna get pitted and shit hello myy man swell is firing today pretty cool huh gonna get pitted and shit hello myy man swell is firing today pretty cool huh gonna get pitted and shit hello myy man swell is firing today pretty cool huh gonna get pitted and shit ",
    layout: {
      md: { x: 0, y: 0, w: 12, h: 1, i: 0 },
      sm: { x: 0, y: 0, w: 3, h: 1, i: 0 },
    },
  },
  {
    id: 1,
    type: "image",
    url: "https://sorekara.s3-us-west-1.amazonaws.com/0015185617_10.jpg",
    text: null,
    layout: {
      md: { x: 0, y: 1, w: 4, h: 4, i: 1 },
      sm: { x: 0, y: 1, w: 4, h: 4, i: 1 },
    },
  },
  {
    id: 2,
    type: "image",
    url:
      "https://sorekara.s3-us-west-1.amazonaws.com/Are_You_Experienced_-_US_cover-edit.jpg",
    text: null,
    layout: {
      md: { x: 4, y: 1, w: 4, h: 4, i: 2 },
      sm: { x: 0, y: 5, w: 4, h: 4, i: 2 },
    },
  },
  {
    id: 3,
    type: "image",
    url: "https://sorekara.s3-us-west-1.amazonaws.com/61Tioa2nMYL.jpg",
    text: null,
    layout: {
      md: { x: 8, y: 1, w: 4, h: 4, i: 3 },
      sm: { x: 0, y: 9, w: 4, h: 4, i: 3 },
    },
  },
];

const layoutsArray = cardItems.map((e) => e.layout);
const layoutsObject = {
  md: layoutsArray.map((e) => e.md),
  sm: layoutsArray.map((e) => e.sm),
};

const cardItemsObject = cardItems.reduce((obj, item) => {
  delete item.layout;
  obj[item.id] = item;
  return obj;
}, {});

export default {
  name: "EventCard",
  components: {
    DropDown,
    ImageCard,
    IconifyIcon,
    SortableList,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  props: {
    size: { type: String, default: "full" },
    cardItems: { type: Array, default: () => [] },
    id: { type: String },
  },
  mixins: [ElementMixin],
  created() {
    bus.$on("card-media-delete", this.removeCardItem);
    bus.$on("resize-card", this.resizeCard);
  },
  mounted() {},
  data() {
    return {
      // activeMedia: '',
      mediaType: ["text", "image"],
      icons: {
        plusCircleOutlined,
        deleteIcon,
        dragHorizontal,
      },
      cardItemsData: cardItemsObject,
      columnNumber: 12,
      baseHeight: 87.66666666667,
      margin: [10, 10],
      layout: layoutsObject["md"],
      layouts: layoutsObject,
      // cardItemCopy: this.cardItem
      // 	.slice()
      // 	.sort((a, b) => a.sortOrder - b.sortOrder),
    };
  },
  methods: {
    resizeCard(id, height, width) {
      console.log(id, "hey");
      const item = this.$refs[`item_${id}`][0];
      const sizeInGrid = this.calcWH(height, width, item);
      this.layout.forEach((e) => {
        if (e.i === id) {
          e.h = sizeInGrid.h;
          e.w = sizeInGrid.w;
        }
      });
      this.$refs.grid.layoutUpdate();
    },
    calcColWidth(item) {
      const colWidth =
        (item.containerWidth - this.margin[0] * (item.cols + 1)) / item.cols;
      console.log(
        "### COLS=" +
          item.cols +
          " COL WIDTH=" +
          colWidth +
          " MARGIN " +
          this.margin[0] +
          " CONTAINER WIDTH " +
          item.containerWidth
      );
      return colWidth;
    },
    calcWH(height, width, item) {
      console.log("this means that calcWH is hitting");
      const colWidth = this.calcColWidth(item);
      // width = colWidth * w - (margin * (w - 1))
      // ...
      // w = (width + margin) / (colWidth + margin)
      let w = Math.round(
        (width + this.margin[0]) / (colWidth + this.margin[0])
      );
      let h = Math.round(
        (height + this.margin[1]) / (item.rowHeight + this.margin[1])
      );
      console.log("this his the height pre cap" + h);
      // Capping
      // w = Math.max(Math.min(w, item.cols - item.innerX), 0);
      // h = Math.max(Math.min(h, item.maxRows - item.innerY), 0);
      return { w, h };
    },
    layoutReadyEvent(newLayout) {
      newLayout.forEach((e) => {
        const itemDOM = this.$refs[`item_${e.i}`][0].$el;
        // if (this.cardItemsData[e.i].type === "image") {

        //   itemDOM.style.backgroundImage = `url(${this.cardItemsData[e.i].url})`;
        //   itemDOM.style.backgroundSize = "cover";
        //   itemDOM.style.backgroundPosition = "center center";
        // }
      });
    },
    async deleteEventCard() {
      let response = await this.$api.eventCard.deleteEventCard(this.id);
      if (response) {
        bus.$emit("event-card-delete", this.id);
      }
    },
    addItem() {
      console.log(this.layout);
      this.layout[3].y = 5;
      const item = {
        id: 3,
        type: "image",
        url: null,
        text: null,
        layout: {
          md: { x: 8, y: 10, w: 4, h: 4, i: 3 },
          sm: { x: 0, y: 20, w: 4, h: 4, i: 3 },
        },
      };
    },
    async createCardItem(type) {
      // let response = await this.$api.cardItem.create({
      //   eventCardId: this.id,
      //   type,
      //   sortOrder: this.cardItem.length + 1,
      // });
      // this.cardItemCopy.push(response);
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
<style>
</style>
