<!-- home -->
<template>
  <div>
    <TheAppHeader></TheAppHeader>
    <TheEventEditor></TheEventEditor>
    <div>{{eventId}}</div>
  </div>
</template>
<script>
import TheAppHeader from "../../components/layout/TheAppHeader.vue";
import TheEventEditor from "../../components/layout/TheEventEditor.vue";

export default {
  name: "TheEditor",
  components: {
    TheAppHeader,
    TheEventEditor,
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
