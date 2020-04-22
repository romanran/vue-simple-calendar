<template>
	<div class="vcs__panels">
		<calendar
			v-for="(month, monthIndex) in months"
			:key="monthIndex"
			:month="month"
			:weekStartsOn="weekStartsOn"
		></calendar>
	</div>
</template>

<script>
	import Calendar from './Calendar.vue'

	export default {
		inject: ['months', 'weekStartsOn', 'asd'],
		components: {
			Calendar
		}
	}
</script>

<style>
</style>