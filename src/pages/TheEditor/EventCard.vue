<template>
  <div
    class="border border-dashed border-orange w-full relative pt-8 border-opacity-25 hover:border-opacity-100"
  >
    <div class="group">
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
      :col-num="columnNumber"
      :use-css-transforms="false"
      :responsive="false"
      :breakpoints="gridBreakPoints"
      @layout-updated="windowResize"
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
        @resized="resizedEvent"
        @moved="movedEvent"
      >
        <component
          :is="getItemType(cardItemsData[item.i].type)"
          :id="item.i"
          :text="cardItemsData[item.i].text"
          :url="cardItemsData[item.i].url"
          :width="item.w"
        ></component>
        <button
          type="button"
          class="z-50 btn-close absolute left-0 top-0 ml-2 mt-2 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
          aria-label="Delete event"
          @click="deleteCardItem(item.i)"
        >
          <IconifyIcon
            :icon="icons.deleteIcon"
            class="text-orange h-5 w-5 absolute transition duration-500 ease-in-out hover:text-red sm:text-opacity-0 sm:group-hover:text-opacity-100"
          />
        </button>
      </grid-item>
    </grid-layout>
    <div class="flex flex-row justify-center py-3">
      <button
        type="button"
        class="btn-close focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
        aria-label="Add Item"
        @click="addCardItem"
      >
        <IconifyIcon
          :icon="icons.plusCircleOutlined"
          class="text-orange text-center fill-current bg-white transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none transition duration-500 ease-in-out"
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
    cardItems: { type: Array, default: () => [] },
    id: { type: String },
  },
  mixins: [ElementMixin],
  created() {
    bus.$on("type-selected", this.updateItemType);
    bus.$on("resize-card", this.componentResize);
    window.addEventListener("resize", this.windowResize);
  },
  async mounted() {
    //get the layoutsObject in proper form (tough)
    const layoutKeys = {};
    this.currentSize = this.getCurrentSize();
    this.columnNumber = this.currentSize === "sm" ? 3 : 12;

    const layoutsObject = await this.cardItems
      .map((e) => e.layout) //get layout arrays
      .reduce((acc, val) => acc.concat(val), []) //pull all arrays into one array
      .reduce((obj, val) => {
        //matching screen keys and putting the rest in array of objects
        let { screen, id, ...item } = val;

        //this might be best done somewhere else backend ids are strings
        item.i = parseInt(item.i);

        //layout keys object so we can find the id of a layout object for update
        //super annoying because things stored in "responsive" layout aren't responsive
        if (!layoutKeys[item.i]) layoutKeys[item.i] = {};
        layoutKeys[item.i][screen] = id;

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
    if (this.cardItems.length > 0) {
      this.cardItemsData = await cardItemsObject;
      this.layout = await layoutsObject[this.currentSize];
      this.layouts = await layoutsObject;
      this.layoutKeys = await layoutKeys;
    }
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
      columnNumber: 12,
      baseHeight: 87.66666666667,
      margin: [10, 10],
      layout: [],
      layouts: {},
      cardItemsData: {}, //cardItemsObject,
      layoutKeys: {},
      gridBreakPoints: { md: 996, sm: 768 },
      currentSize: null,
    };
  },
  methods: {
    windowResize() {
      if (this.currentSize !== this.getCurrentSize()) {
        this.currentSize = this.getCurrentSize();
        this.columnNumber = this.currentSize === "sm" ? 3 : 12;
        this.layout = this.layouts[this.currentSize];
      }
      //calc column size
      const colSize =
        (this.$refs.grid.$el.clientWidth -
          this.margin[0] * (this.columnNumber + 1)) /
        this.columnNumber;
      this.baseHeight = colSize;
    },
    componentResize(id, h, w) {
      console.log(id, "id");
      console.log(h, "h");
      console.log(w, "w");
      const factor = h / w;
      for (let i in this.layouts) {
        let ref = this.layouts[i].filter((e) => e.i === id)[0];
        ref.h = Math.round(ref.w * factor);
        this.$refs.grid.layoutUpdate();
      }
      this.updateLayouts();
    },
    getCurrentSize() {
      //gets the current screen size (md or sm)
      if (this.$refs.grid.$el.clientWidth > this.gridBreakPoints.md)
        return "md";
      return "sm";
    },
    getItemType(type) {
      if (type) return `${type.charAt(0).toUpperCase() + type.slice(1)}Item`;
      return "NewItem";
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      this.updateLayouts();
    },
    movedEvent(i, newX, newY) {
      this.updateLayouts();
    },
    async updateLayouts() {
      const newLayout = this.layout.map((e) => {
        const currentSize = this.getCurrentSize();
        let { moved, i, ...data } = e;
        return {
          id: this.layoutKeys[i][currentSize],
          screen: currentSize,
          ...data,
        };
      });
      await this.$api.cardItemLayout.update(newLayout);
    },
    async updateItemType(id, type) {
      const response = await this.$api.cardItem.update({ id, type });
      this.cardItemsData[id].type = await response.type;
    },
    async addCardItem() {
      const nextLine = this.getNextLine();
      const newLayout = { x: 0, w: 12, h: 1 };
      const newLayouts = [
        { screen: "md", ...newLayout, y: nextLine.md },
        { screen: "sm", ...newLayout, y: nextLine.sm },
      ];
      const cardItem = await this.$api.cardItem.create({
        eventCardId: "" + this.id,
        layouts: newLayouts,
      });
      //back to grid item format, pull out screen convert i to int
      const layoutKey = {};

      const newLayoutsBackend = cardItem.layout.reduce((obj, item) => {
        let { screen, i, id, ...info } = item;
        if (!layoutKey[i]) layoutKey[i] = {};
        layoutKey[i][screen] = id;

        obj[screen] = { ...info, i: parseInt(i) };
        return obj;
      }, {});

      this.$set(this.cardItemsData, cardItem.id, { type: null });
      //we have to update both the dynamic layouts and the current layout
      //annoying but no better solution as of now

      this.layoutKeys = Object.assign({}, this.layoutKeys, layoutKey);
      this.layouts["md"].push(newLayoutsBackend.md);
      this.layouts["sm"].push(newLayoutsBackend.sm);
    },
    async deleteCardItem(id) {
      const response = await this.$api.cardItem.deleteCardItem(id);
      if (response) {
        this.$delete(this.cardItemsData, id);
        [this.layouts["md"], this.layouts["sm"]].forEach((layout) => {
          layout.splice(layout.map((e) => e.i).indexOf(id), 1); //remove from everylayout where i = id
        });
      }
    },
    async deleteEventCard() {
      const response = await this.$api.eventCard.deleteEventCard(this.id);
      if (response) {
        bus.$emit("event-card-delete", this.id);
      }
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
    // resizeCard(id, height, width) {
    // 	//will borrow logic later
    // 	console.log(id, 'hey');
    // 	const item = this.$refs[`item_${id}`][0];
    // 	const sizeInGrid = this.calcWH(height, width, item);
    // 	this.layout.forEach((e) => {
    // 		if (e.i === id) {
    // 			e.h = sizeInGrid.h;
    // 			e.w = sizeInGrid.w;
    // 		}
    // 	});
    // 	this.$refs.grid.layoutUpdate();
    // },
    // calcColWidth(item) {
    // 	const colWidth =
    // 		(item.containerWidth - this.margin[0] * (item.cols + 1)) / item.cols;
    // 	console.log(
    // 		'### COLS=' +
    // 			item.cols +
    // 			' COL WIDTH=' +
    // 			colWidth +
    // 			' MARGIN ' +
    // 			this.margin[0] +
    // 			' CONTAINER WIDTH ' +
    // 			item.containerWidth
    // 	);
    // 	return colWidth;
    // },
    // calcWH(height, width, item) {
    // 	console.log('this means that calcWH is hitting');
    // 	const colWidth = this.calcColWidth(item);
    // 	// width = colWidth * w - (margin * (w - 1))
    // 	// ...
    // 	// w = (width + margin) / (colWidth + margin)
    // 	let w = Math.round(
    // 		(width + this.margin[0]) / (colWidth + this.margin[0])
    // 	);
    // 	let h = Math.round(
    // 		(height + this.margin[1]) / (item.rowHeight + this.margin[1])
    // 	);
    // 	console.log('this his the height pre cap' + h);
    // 	// Capping
    // 	// w = Math.max(Math.min(w, item.cols - item.innerX), 0);
    // 	// h = Math.max(Math.min(h, item.maxRows - item.innerY), 0);
    // 	return { w, h };
    // },
  },
  directives: { handle: HandleDirective },
};
</script>
<style></style>
