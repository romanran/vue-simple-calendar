<template>
	<div class="vcs-month-select">
		<tr v-for="(row, rowIndex) in monthsArray" :key="rowIndex" class="vcs-table__row">
			<td v-for="(month, monthIndex) in row" :key="monthIndex" class="vcs-table__cell">
				<div class="vcs-month-select__month" :class="{ selected: checkIfCurrentMonth(month) }" v-show="month" @click="$emit('change', month)">
					{{ formatMonth(month) }}
				</div>
			</td>
		</tr>
	</div>
</template>

<script>
import * as date from 'date-fns'
export default {
	props: {
		months: Array,
		calendarMonthFormat: String,
		locale: Object,
		value: Date,
	},
	computed: {
		monthsArray() {
			const monthArray = []
			let monthIndex = 0
			for (let row = 0; row < 3; row++) {
				const rowArray = []
				for (let cell = 0; cell < 4; cell++) {
					rowArray.push(this.months[monthIndex])
					monthIndex++
				}
				monthArray.push(rowArray)
			}
			return monthArray
		},
	},
	methods: {
		formatMonth(month) {
			return date.format(month, this.calendarMonthFormat, { locale: this.locale })
		},
		checkIfCurrentMonth(month) {
			return date.isSameMonth(month, this.value)
		},
	},
}
</script>

<style lang="scss">
.vcs-month-select__month {
	padding: 20px;
	&.selected {
		background: gold;
	}
}
</style>