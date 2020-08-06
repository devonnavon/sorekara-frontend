<template>
  <div class="font-sans antialiased" id="app">
    <nav class="flex items-center justify-between flex-no-wrap bg-white">
      <div class="flex items-center">
        <img class="object-contain" src="src/assets/logo.svg" />
      </div>
      <div class="block sm:hidden">
        <button @click="showModal('Login')" class="flex items-end flex-shrink-1 pt-2 ml-5">
          <!-- border rounded text-orange-lighter border-white-light hover:text-white hover:border-white -->
          <!-- <svg
						class="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>-->
          <IconifyIcon :icon="icons.enterIcon" class="text-orange fill-current h-6 w-6" />
        </button>
      </div>
      <div
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto justify-end self-end hidden sm:show"
        v-show="!loggedIn"
      >
        <div class="self-end" @click="showModal('Login')">
          <a
            href="#"
            class="no-underline inline-block text-base px-4 leading-none border rounded text-orange border-white hover:text-opacity-60 mt-4 sm:mt-0 font-display self-end"
          >LOG IN</a>
        </div>
        <div class="self-end" @click="showModal('Register')">
          <a
            href="#"
            class="no-underline inline-block text-base pl-4 leading-none border rounded text-orange border-white hover:text-opacity-60 mt-4 sm:mt-0 font-display self-end"
          >SIGN UP</a>
        </div>
      </div>
      <div
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto justify-end self-end hidden sm:show"
        v-show="loggedIn"
      >
        <div class="self-end" @click="logOut">
          <a
            href="#"
            class="no-underline inline-block text-base pl-4 leading-none border rounded text-orange border-white hover:text-opacity-60 mt-4 sm:mt-0 font-display self-end"
          >LOG OUT</a>
        </div>
      </div>
    </nav>
    <transition name="fade">
      <TheLoginRegisterModal v-show="isModalVisible" />
    </transition>
  </div>
</template>

<script>
// import logo from './../../assets/logo.svg';
import bus from "../../bus";
import IconifyIcon from "@iconify/vue";
import enterIcon from "@iconify/icons-gg/enter";
import TheLoginRegisterModal from "../event/TheLoginRegisterModal.vue";

export default {
  name: "app-header",
  props: {
    loggedIn: Boolean,
  },
  components: {
    IconifyIcon,
    TheLoginRegisterModal,
  },
  created() {
    bus.$on("modal-close", this.closeModal);
  },
  destroyed() {
    bus.$off("modal-close", this.closeModal);
  },
  data() {
    return {
      icons: {
        enterIcon,
      },
      isModalVisible: false,
    };
  },
  methods: {
    showModal(form) {
      bus.$emit("form-switch", form);
      this.isModalVisible = true;
    },
    closeModal() {
      if (this.isModalVisible) {
        bus.$emit("form-switch", "");
        this.isModalVisible = false;
      }
    },
    logOut() {
      bus.$emit("log-out");
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s !important;
}
.fade-enter,
.fade-leave-to {
  opacity: 0 !important;
}
</style>
