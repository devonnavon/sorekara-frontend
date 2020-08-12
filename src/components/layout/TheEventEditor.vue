<template>
  <div class="pt-6">
    <div class="border border-orange w-full relative py-8">
      <button
        type="button"
        class="btn-close absolute left-0 top-0 ml-1 mt-1 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
        aria-label="Delete event"
      >
        <IconifyIcon
          :icon="icons.deleteIcon"
          class="text-orange h-5 w-5 transition duration-500 hover:text-red"
        />
      </button>
      <div class="border border-dotted border-orange w-11/12 relative mx-auto p-5">yo</div>
      <div class="flex flex-row items-center">
        <button
          class="font-display text-orange text-xl focus:outline-none outline-none self-center"
        >
          <IconifyIcon
            :icon="icons.plusCircleOutlined"
            class="text-orange text-center fill-current transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../bus";

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
  },
  props: {},
  data() {
    return {
      icons: {
        eyeOutlined,
        eyeInvisibleOutlined,
        settingOutlined,
        plusCircleOutlined,
        plusCircleFilled,
        deleteIcon,
      },
    };
  },
  computed: {},
  methods: {},
};
</script>

<style>
</style>