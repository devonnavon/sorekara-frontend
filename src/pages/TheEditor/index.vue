<!-- home -->
<template>
  <div>
    <TheAppHeader></TheAppHeader>
    <div>{{eventId}}</div>
  </div>
</template>
<script>
import TheEventTable from "../../components/layout/TheEventTable.vue";
import TheAppHeader from "../../components/layout/TheAppHeader.vue";

export default {
  name: "TheEditor",
  components: {
    TheAppHeader,
  },
  data() {
    return {
      eventId: this.$route.params.eventID,
    };
  },
  created() {
    console.log(id);
  },
};
</script>
<style></style>
