<template>
  <div class="pt-6">
    <SortableList lockAxis="y" v-model="eventCardsCopy" :pressDelay="150">
      <TheEventCard
        v-for="(eventCard, index) in eventCardsCopy"
        :index="index"
        :key="eventCard.id"
        :size="eventCard.size"
        :cardMedia="eventCard.cardMedia"
      ></TheEventCard>

      <!-- <TheEventCard
			v-for="eventCard in eventCardsSorted"
			:key="eventCard.id"
			:size="eventCard.size"
			:cardMedia="eventCard.cardMedia"
      ></TheEventCard>-->
    </SortableList>
    <div class="flex flex-row justify-center py-4">
      <button class="font-display text-orange text-4xl focus:outline-none outline-none self-center">
        <IconifyIcon
          :icon="icons.plusCircleOutlined"
          class="text-orange text-center fill-current transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none"
        />
      </button>
    </div>
  </div>
</template>

<script>
import bus from "../../bus";
import { SlickItem, SlickList } from "vue-slicksort";
import SortableList from "../../components/ui/SortableList.vue";

import TheEventCard from "./TheEventCard.vue";

import IconifyIcon from "@iconify/vue";
import eyeOutlined from "@iconify/icons-ant-design/eye-outlined";
import eyeInvisibleOutlined from "@iconify/icons-ant-design/eye-invisible-outlined";
import settingOutlined from "@iconify/icons-ant-design/setting-outlined";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";
import deleteIcon from "@iconify/icons-wpf/delete";

export default {
  name: "TheEventEditor",
  components: {
    IconifyIcon,
    TheEventCard,
    SortableList,
  },
  props: {
    eventCards: { type: Array, default: () => [] },
  },
  data() {
    return {
      icons: {
        settingOutlined,
        plusCircleOutlined,
        deleteIcon,
      },
      eventCardsCopy: [],
    };
  },
  watch: {
    eventCards: function (newVal, oldVal) {
      // watch it
      this.eventCardsCopy = newVal;
    },
  },
  computed: {
    eventCardsSorted() {
      return this.eventCards.sort((a, b) => a.sortOrder > b.sortOrder);
    },
  },
};
</script>

<style></style>
