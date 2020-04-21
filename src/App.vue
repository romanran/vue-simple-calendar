<template>
	<div id="app">
		<calendar-renderless>
			<template slot-scope="{ months }">
				<calendar v-for="(month, monthIndex) in months" :key="monthIndex" :month="month"></calendar>
			</template>
		</calendar-renderless>
	</div>
</template>

<script>
	import Calendar from "./components/Calendar.vue";
	import CalendarRenderless from "./components/CalendarRenderless.vue";

	export default {
		name: "App",
		components: {
			Calendar,
			CalendarRenderless
		}
	};
</script>

<style></style> 