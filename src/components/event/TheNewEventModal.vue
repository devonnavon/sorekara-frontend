<template>
  <div>
    <BaseModal>
      <!-- <TheLoginForm></TheLoginForm>
      <TheRegisterForm></TheRegisterForm>-->
      <transition name="fade" mode="out-in">
        <div>hey</div>
      </transition>
      <!-- <component v-bind:is="currentFormComponent"></component> -->
    </BaseModal>
  </div>
</template>
<script>
import BaseModal from "./BaseModal.vue";
import bus from "../../bus";

export default {
  name: "TheNewEventModal",
  components: { BaseModal },
  props: {},
  data() {
    return {
      currentForm: "",
    };
  },
  computed: {},
  methods: {},
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
