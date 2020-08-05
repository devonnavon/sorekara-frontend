<!-- landing -->
<template>
  <div class="pt-6 lg:p-6">
    <TheEventTable></TheEventTable>
  </div>
</template>
<script>
import TheEventTable from "./TheEventTable.vue";

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
