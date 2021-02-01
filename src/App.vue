<template>
	<div id="app">
		<div>
			<button @click="type = 'range'">Range</button>
			<button @click="type = 'single'">Single</button>
			<button @click="type = 'month'">Month</button>
		</div>
		<br />
		<v-simple-calendar :type="type" :weekdayFormat="'cccccc'" :value="selectedRange" @change="changeValue"></v-simple-calendar>
	</div>
</template>

<script>
import VSimpleCalendar from './v-simple-calendar'
export default {
	components: {
		VSimpleCalendar,
	},
	data() {
		return {
			selectedRange: [new Date()],
			type: 'range',
		}
	},
	methods: {
		changeValue(value) {
			this.selectedRange = value
		},
	},
}
</script>

<style>
#app {
	text-align: center;
	padding: 50px;
	font-family: Arial, Roboto;
}
</style>
