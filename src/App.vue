<template>
  <div id="app">
    <v-simple-calendar
      :type="'single'"
      :weekdayFormat="'cccccc'"
      :value="selectedRange"
      @change="changeValue"
    ></v-simple-calendar>
  </div>
</template>

<script>
import VSimpleCalendar from "./v-simple-calendar";
export default {
  components: {
    VSimpleCalendar,
  },
  data() {
    return {
      selectedRange: [new Date()],
    };
  },
  methods: {
    changeValue(value) {
      this.selectedRange = value;
    },
  },
};
</script>

<style>
#app {
  background: green;
}
</style>
