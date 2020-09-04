<template>
  <vue-ellipse-progress
    :progress="progress"
    :determinate="false"
    color="#E85A0B"
    empty-color="#324c7e"
    :size="35"
    :thickness="thickness"
    :emptyThickness="emptyThickness"
    :lineMode="lineMode"
    animation="rs 700 1000"
    :loading="true"
    :no-data="true"
    :dot="dot"
  ></vue-ellipse-progress>
</template>
<script>
export default {
  name: "Loader",
  components: {},
  props: {},
  data() {
    return {
      progress: 45,
      lineModes: [
        "normal",
        "in",
        "in-over",
        "out",
        "out-over",
        "top",
        "bottom",
      ],
      thickness: 3,
      emptyThickness: 3,
      dot: { size: 1, width: "1px" },
      lineMode: "normal 0",
    };
  },
  methods: {
    randomNumberInRange() {
      (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeOptions() {
      const mode = this.lineModes[
        this.randomNumberInRange(0, this.lineModes.length - 1)
      ];
      const offset = this.randomNumberInRange(0, 15);
      this.lineMode = `${mode} ${offset}`.trim();
      this.progress = this.randomNumberInRange(0, 100);
      this.thickness = this.randomNumberInRange(1, 10);
      this.emptyThickness = this.randomNumberInRange(1, 10);
      this.dot.size = this.randomNumberInRange(1, 20);
      this.dot.width = `${this.randomNumberInRange(1, 10)}px`;
    },
  },
};
</script>
<style></style>
