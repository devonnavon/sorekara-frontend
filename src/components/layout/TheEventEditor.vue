<template>
  <div class="pt-6">
    <TheEventCard></TheEventCard>
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

import TheEventCard from "../event/TheEventCard.vue";

import IconifyIcon from "@iconify/vue";
import eyeOutlined from "@iconify/icons-ant-design/eye-outlined";
import eyeInvisibleOutlined from "@iconify/icons-ant-design/eye-invisible-outlined";
import settingOutlined from "@iconify/icons-ant-design/setting-outlined";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";
import deleteIcon from "@iconify/icons-wpf/delete";

export default {
  name: "TheEventTable",
  components: {
    IconifyIcon,
    TheEventCard,
  },
  props: {},
  data() {
    return {
      icons: {
        settingOutlined,
        plusCircleOutlined,
        deleteIcon,
      },
    };
  },
};
</script>

<style>
</style>