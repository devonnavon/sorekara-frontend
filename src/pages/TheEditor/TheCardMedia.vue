<template>
  <div class="border border-dotted border-orange w-11/12 relative mx-auto p-5">
    <button
      type="button"
      class="btn-close absolute left-0 top-0 ml-2 mt-2 focus:outline-none transition duration-500 ease-in-out self-center outline-none transform hover:-translate-y-1 hover:scale-105"
      aria-label="Delete event"
    >
      <IconifyIcon
        :icon="icons.deleteIcon"
        class="text-orange h-3 w-3 transition duration-500 hover:text-red"
      />
    </button>
    <div>{{ media.id }}</div>
  </div>
</template>
<script>
import IconifyIcon from "@iconify/vue";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";
import deleteIcon from "@iconify/icons-wpf/delete";
import bus from "../../bus";

import { ElementMixin } from "vue-slicksort";

export default {
  name: "TheCardMedia",
  components: {
    IconifyIcon,
  },
  props: { media: { type: Object, default: () => [] } },
  data() {
    return {
      icons: {
        plusCircleOutlined,
        deleteIcon,
      },
    };
  },
  mixins: [ElementMixin],
  methods: {},
};
</script>
<style></style>
