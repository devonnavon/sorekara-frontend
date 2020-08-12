<!-- src/App/index.vue -->
<template>
  <div class="xl:container mx-auto px-6 sm:px-12 pt-6">
    <RouterView />
  </div>
</template>
<script>
import bus from "../bus";
import TheLanding from "../pages/TheLanding/index.vue";
import TheHome from "../pages/TheHome/index.vue";
import TheEditor from "../pages/TheEditor/index.vue";

import jwt from "jsonwebtoken";

export default {
  name: "App",
  components: {
    TheLanding,
    TheHome,
    TheEditor,
  },
  data() {
    return { user: {} };
  },
  created() {
    bus.$on("log-out", () => {
      localStorage.clear();
      this.loggedIn = false;
      this.$router.push("/");
    });
    bus.$on("login-success", (token) => {
      localStorage.token = token;
      this.user = jwt.decode(token);
      this.loggedIn = true;
      this.$router.push(`/${this.user.username}`);
    });
    if (localStorage.token) {
      this.loggedIn = true;
    }
    bus.$on("edit-event", (event) => {
      let route = this.$router.resolve(`/edit/${event.id}`);
      window.open(route.href, "_blank");
    });
  },
  beforeUpdate() {
    if (this.$router.currentRoute.path === "/" && this.loggedIn)
      this.$router.push(`/${this.user.username}`);
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {},
};
</script>
<style></style>
