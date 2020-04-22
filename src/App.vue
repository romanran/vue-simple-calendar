<template>
	<div id="app" @click="weekStartsOn = 5">
		<v-simple-calendar :months="[new Date()]" :weekStartsOn="weekStartsOn"></v-simple-calendar>
	</div>
</template>

<script>
	import VSimpleCalendar from './VSimpleCalendar'
	export default {
		components: {
			VSimpleCalendar
		},
		data() {
			return {
				weekStartsOn: 1
			}
		}
	}
</script>

<style>
	#app {
		background: green;
	}
</style> 