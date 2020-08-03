<!-- src/components/layout/TheLoginModal -->
<template>
  <div>
    <BaseModal>
      <!-- <TheLoginForm></TheLoginForm>
      <TheRegisterForm></TheRegisterForm>-->
      <component v-bind:is="currentFormComponent"></component>
    </BaseModal>
  </div>
</template>
<script>
import BaseModal from "./BaseModal.vue";
import TheLoginForm from "./TheLoginForm.vue";
import TheRegisterForm from "./TheRegisterForm.vue";
import bus from "../../bus";

export default {
  name: "TheLoginRegisterModal",
  components: { BaseModal, TheLoginForm, TheRegisterForm },
  props: {},
  created() {
    bus.$on("form-switch", this.switchForm);
  },
  destroyed() {
    bus.$off("form-switch", this.switchForm);
  },
  data() {
    return {
      currentForm: "Login",
    };
  },
  computed: {
    currentFormComponent() {
      return `The${this.currentForm}Form`;
    },
  },
  methods: {
    switchForm(form) {
      this.currentForm = form;
    },
  },
};
</script>
<style></style>
