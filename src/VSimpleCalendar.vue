<template>
	<panels></panels>
</template>
<script>
	import Panels from './components/Panels.vue'
	import CalendarProvider from './CalendarProvider'
	import { provide, inject } from 'vue'
	export default {
		name: 'vue-simple-calendar',
		setup() {
			provide({ months: CalendarProvider.months(this.months), weekStartsOn: CalendarProvider.weekStartsOn(this.weekStartsOn), asd: 'test' })
		},
		data() {
			return {
				weekStartsOnValue: 1
			}
		},
		provide() {
			return {
				months: this.months,
				weekStartsOn: this.weekStartsOnValue,
				asd: 'test'
			}
		},
		props: {
			weekStartsOn: {
				type: Number,
				default: 1
			},
			months: Array
		},
		components: {
			Panels
		},
		watch: {
			weekStartsOn(value) {
				this.weekStartsOnValue = value
			}
		}
	}
</script>
<style lang="scss">
</style>