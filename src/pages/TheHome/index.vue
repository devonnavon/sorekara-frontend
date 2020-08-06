<!-- home -->
<template>
  <div>
    <TheEventTable :events="events"></TheEventTable>
  </div>
</template>
<script>
import TheEventTable from "../../components/layout/TheEventTable.vue";

export default {
  name: "TheHome",
  components: {
    TheEventTable,
  },
  data() {
    return { events: [] };
  },
  async created() {
    let response = await this.$api.event.events();
    this.events = response;
  },
};
</script>
<style></style>
