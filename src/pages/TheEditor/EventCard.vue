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
      :use-css-transforms="false"
      :cols="{ md: 12, sm: 3 }"
      :responsive="true"
      :breakpoints="gridBreakPoints"
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
        <component
          :is="getItemType(cardItemsData[item.i].type)"
          :id="item.i"
          :text="cardItemsData[item.i].text"
          :url="cardItemsData[item.i].url"
          :width="item.w"
        ></component>
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
import ImageItem from "./ImageItem.vue";
import TextItem from "./TextItem.vue";
import NewItem from "./NewItem.vue";

import { ElementMixin, HandleDirective } from "vue-slicksort";
import VueGridLayout from "vue-grid-layout";

import IconifyIcon from "@iconify/vue";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";
import deleteIcon from "@iconify/icons-wpf/delete";
import dragHorizontal from "@iconify/icons-mdi/drag-horizontal";

import bus from "../../bus";

export default {
  name: "EventCard",
  components: {
    NewItem,
    ImageItem,
    TextItem,
    IconifyIcon,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  props: {
    size: { type: String, default: "full" },
    cardItems: { type: Array, default: () => Promise() },
    id: { type: String },
  },
  mixins: [ElementMixin],
  created() {
    bus.$on("type-selected", this.updateItemType);
    //not used rn
    bus.$on("card-media-delete", this.removeItem);
    bus.$on("resize-card", this.resizeCard);
  },
  async mounted() {
    //get the layoutsObject in proper form (tough)
    const layoutsObject = await this.cardItems
      .map((e) => e.layout) //get layout arrays
      .reduce((acc, val) => acc.concat(val), []) //pull all arrays into one array
      .reduce((obj, val) => {
        //matching screen keys and putting the rest in array of objects
        let { screen, ...item } = val;

        //this might be best done somewhere else backend ids are strings
        item.i = parseInt(item.i);

        if (obj[screen]) {
          obj[screen].push(item);
          return obj;
        }
        obj[screen] = [item];
        return obj;
      }, {});

    const cardItemsObject = await this.cardItems.reduce((obj, item) => {
      let { layout, ...data } = item;
      obj[parseInt(data.id)] = data;
      return obj;
    }, {});

    this.cardItemsData = await cardItemsObject;
    this.layout = await layoutsObject["md"];
    this.layouts = await layoutsObject;
  },
  data() {
    return {
      // activeMedia: '',
      mediaType: ["text", "image"],
      icons: {
        plusCircleOutlined,
        deleteIcon,
        dragHorizontal,
      },
      cardItemsData: {}, //cardItemsObject,
      columnNumber: 12,
      baseHeight: 87.66666666667,
      margin: [10, 10],
      layout: [], //layoutsObject["md"],
      layouts: {}, //layoutsObject,
      gridBreakPoints: { md: 996, sm: 768 },
      // cardItemCopy: this.cardItem
      // 	.slice()
      // 	.sort((a, b) => a.sortOrder - b.sortOrder),
    };
  },
  computed: {
    currentSize() {
      //gets the current screen size (md or sm)
      if (window.screen.width > this.gridBreakPoints.md) return "md";
      return "sm";
    },
  },

  methods: {
    getItemType(type) {
      if (type) return `${type.charAt(0).toUpperCase() + type.slice(1)}Item`;
      return "NewItem";
    },
    updateItemType(id, type) {
      //API CALL ************************************************************************
      //UPDATE TYPE AT ID
      //this.$set(this.someObject, 'b', 2)
      // console.log(this.cardItemsData[id]);
      // this.$set(this.cardItemsData, id )
      this.cardItemsData[id].type = type;
    },
    async deleteEventCard() {
      let response = await this.$api.eventCard.deleteEventCard(this.id);
      if (response) {
        bus.$emit("event-card-delete", this.id);
      }
    },
    addItem() {
      const nextLine = this.getNextLine();
      const itemData = {
        //api call soon!
        id: 4,
        type: null,
        url: null,
        text: null,
      };
      this.cardItemsData[itemData.id] = itemData;

      const newLayout = { x: 0, w: 12, h: 1, i: itemData.id };
      const newLayouts = {
        md: { ...newLayout },
        sm: { ...newLayout },
      };
      newLayouts.md.y = nextLine.md;
      newLayouts.sm.y = nextLine.sm;
      //we have to update both the dynamic layouts and the current layout
      //annoying but no better solution as of now
      this.layout.push(newLayouts[this.currentSize]);
      this.layouts["md"].push(newLayouts.md);
      this.layouts["sm"].push(newLayouts.sm);
    },
    getNextLine() {
      //gets the next line in the event card for both screen sizes
      const nextLine = {};
      for (let key in this.layouts) {
        nextLine[key] = this.layouts[key].reduce((acc, val) => {
          const heightFromTop = val.y + val.h;
          if (heightFromTop > acc) return heightFromTop;
          else return acc;
        }, 0);
      }
      return nextLine;
    },
    // *********************************************************************************************************************************************
    //all this stuff needs to be refactored later!!!!
    // *********************************************************************************************************************************************

    async createCardItem(type) {
      //will be replaced by addItem leave for now
      // let response = await this.$api.cardItem.create({
      //   eventCardId: this.id,
      //   type,
      //   sortOrder: this.cardItem.length + 1,
      // });
      // this.cardItemCopy.push(response);
    },
    removeItem(id) {
      const index = this.cardItemCopy.findIndex((item) => item.id === id);
      this.cardItemCopy.splice(index, 1);
    },
    async itemMove(e) {
      //need to rewrite for grid
      //card media!!!
      let cardItemId = this.cardItemCopy[e.oldIndex].id;
      await this.$api.cardItem.update({
        id: cardItemId,
        sortOrder: e.newIndex + 1,
      });
    },
    resizeCard(id, height, width) {
      //will borrow logic later
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
  },
  directives: { handle: HandleDirective },
};
</script>
<style></style>
