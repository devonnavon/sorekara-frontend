
<template>
  <span class="text" style="height: 100px;">{{text}}</span>
</template>
<style>
</style>
<script>
export default {
  name: "CardItemY",
  props: {
    text: {
      type: String,
      default: "x",
    },
  },
  data: function () {
    return {};
  },
  mounted: function () {
    console.log("### " + this.text + " ready!");
    this.$parent.autoSize();
  },
};
</script>