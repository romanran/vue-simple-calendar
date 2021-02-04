<template>
	<div id="app">
		<div>
			<button @click="type = 'range'">Range</button>
			<button @click="type = 'single'">Single</button>
			<button @click="type = 'month'">Month</button>
		</div>
		<br />
		<v-simple-calendar
			:type="type"
			:weekdayFormat="'cccccc'"
			:value="selectedRange"
			@change="changeValue"
			:minDate="new Date('2021-01-03')"
			:maxDate="new Date('2021-04-25')"
		>
			<template v-slot:day-inside="{ day, formatDay }">{{ formatDay(day.date) }}</template>
		</v-simple-calendar>
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
			selectedRange: null,
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
