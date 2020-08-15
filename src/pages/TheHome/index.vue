<!-- home -->
<template>
  <div>
    <TheAppHeader></TheAppHeader>
    <TheEventTable></TheEventTable>
  </div>
</template>
<script>
import TheEventTable from "./TheEventTable.vue";
import TheAppHeader from "./TheAppHeader.vue";

export default {
  name: "TheHome",
  components: {
    TheAppHeader,
    TheEventTable,
  },
  data() {
    return {};
  },
};
</script>
<style></style>
