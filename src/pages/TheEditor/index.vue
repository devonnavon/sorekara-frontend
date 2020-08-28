<!-- home -->
<template>
  <div>
    <TheAppHeader></TheAppHeader>

    <div class="lg:p-3">{{eventInfo.title}}</div>
    <div class="lg:p-3">{{eventInfo.description}}</div>

    <TheEventEditor :eventCards="eventInfo.eventCards"></TheEventEditor>
  </div>
</template>
<script>
import TheAppHeader from "../TheHome/TheAppHeader.vue";
import TheEventEditor from "./TheEventEditor.vue";

export default {
  name: "TheEditor",
  components: {
    TheAppHeader,
    TheEventEditor,
  },
  data() {
    return {
      eventInfo: {},
    };
  },
  async created() {
    //request info for the event page we've been routed to
    //need to ensure this route checks that you are event owner (maybe? although how to we display)
    let response = await this.$api.event.event(this.$route.params.eventID);
    this.eventInfo = response;
    console.log(response);
  },
};
</script>
<style></style>
