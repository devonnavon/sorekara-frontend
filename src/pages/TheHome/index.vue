<!-- home -->
<template>
  <div>
    <TheEventTable></TheEventTable>
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
    return {};
  },
};
</script>
<style></style>
