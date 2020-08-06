<!-- src/pages/TheHome/TheCallToAction.vue -->
<template>
  <div
    class="flex flex-col align-center overflow-hidden font-display w-100% py-16 md:w-4/5 mx-auto mr-0"
  >
    <img class="object-contain py-2 px-2 -mb-10" src="src/assets/curved-text.svg" />
    <div class="text-orange text-xl text-center">{{ callToAction }}</div>
    <div class="text-orange text-lg text-center pt-10">{{ textBody }}</div>
    <div class="text-orange text-lg text-center pt-3">{{ enjoy }}</div>
  </div>
</template>
<script>
export default {
  name: "TheCallToAction",
  components: {},

  data() {
    return {
      brandName: "SOREKARA",
      callToAction: "¡TRY IT!",
      textBody: `A place to commemorate your ephemeral event. Share pictures, songs, pdfs, merch, thoughts, gratitude, whatever you want. Create connections within your audience. Password protected so you control who is allowed inside.`,
      enjoy: "Enjoy your stay!",
    };
  },
};
</script>
<style></style>
