<!-- src/App/index.vue -->
<template>
  <div>
    <TheHeader></TheHeader>
    <TheLanding v-if="!token"></TheLanding>
    <TheHome v-else></TheHome>
  </div>
</template>
<script>
import bus from "../bus";
import TheHeader from "../components/layout/TheHeader.vue";
import TheLanding from "../pages/TheLanding/index.vue";
import TheHome from "../pages/TheHome/index.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheLanding,
    TheHome,
  },
  created() {
    bus.$on("login-success", this.login);
  },
  data() {
    return {
      //   loggedIn: false,
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    },
  },
  methods: {
    login(token) {
      localStorage.setItem("token", token);
    },
  },
};
</script>
<style></style>
