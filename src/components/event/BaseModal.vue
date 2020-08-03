<!-- src/pages/TheHome/TheCallToAction.vue -->
<template>
  <div class="modal-backdrop">
    <div
      class="relative flex justify-center my-2 mx-4 md:mx-0 font-display text-orange font-semibold w-full max-w-xl bg-white rounded-lg shadow-md p-6 border border-orange"
    >
      <button
        type="button"
        class="btn-close absolute right-0 top-0"
        @click="close"
        aria-label="Close modal"
      >
        <IconifyIcon :icon="icons.closeOutline" class="text-orange fill-current h-6 w-6" />
      </button>
      <slot>Content Here!</slot>
    </div>
  </div>
</template>
<script>
import IconifyIcon from "@iconify/vue";
import closeOutline from "@iconify/icons-carbon/close-outline";
import bus from "../../bus";

export default {
  name: "BaseModal",
  components: {
    IconifyIcon,
  },
  data() {
    return {
      icons: {
        closeOutline,
      },
    };
  },
  methods: {
    close() {
      bus.$emit("modal-close");
    },
  },
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
}

.modal {
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  filter: blur(0px);
}
</style>
