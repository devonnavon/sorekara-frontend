<!-- home -->
<template>
  <div>
    <TheAppHeader></TheAppHeader>
    <TheEventEditor :eventCards="eventInfo.eventCards"></TheEventEditor>
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
      eventInfo: {
        id: "1",
        title: "my super sick concert",
        description:
          "its gonna be cool, we wont touch, no germs etc. gOOd vIBes onLY",
        eventDate: "2020-08-13T19:08:24.033Z",
        published: false,
        password: "password",
        eventCards: [
          {
            id: "2",
            size: "full",
            sortOrder: 1,
            cardMedia: [],
          },
          {
            id: "3",
            size: "half",
            sortOrder: 2,
            cardMedia: [
              {
                id: "1",
                type: "text",
                url: null,
                sortOrder: 1,
                text: "hey man yo",
              },
              {
                id: "2",
                type: "image",
                url: null,
                sortOrder: 2,
                text: "please!",
              },
            ],
          },
          {
            id: "4",
            size: "half",
            sortOrder: 3,
            cardMedia: [
              {
                id: "3",
                type: "text",
                url: null,
                sortOrder: 1,
                text: "hey man yo",
              },
              {
                id: "4",
                type: "image",
                url: null,
                sortOrder: 2,
                text: "please!",
              },
            ],
          },
        ],
      },
    };
  },
  created() {},
};
</script>
<style></style>
