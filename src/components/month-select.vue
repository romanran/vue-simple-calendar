<template>
	<div class="vcs-month-select">
		<tr v-for="(row, rowIndex) in monthsArray" :key="rowIndex" class="vcs-table__row">
			<td
				v-for="(month, monthIndex) in row"
				:key="monthIndex"
				class="vcs-table__cell"
				:class="{ 'vcs-month-select__cell--selected': month.selected, 'vcs-month-select__cell--disabled': month.disabled }"
			>
				<div
					class="vcs-month-select__month"
					:class="{ 'vcs-month-select__month--selected': month.selected, 'vcs-month-select__month--disabled': month.disabled }"
					v-show="month.date"
					@click="$emit('change', month.date)"
				>
					{{ formatMonth(month.date) }}
				</div>
			</td>
		</tr>
	</div>
</template>

<script>
import { format, isSameMonth, startOfMonth, endOfMonth } from 'date-fns'
export default {
	props: {
		months: Array,
		calendarMonthFormat: String,
		locale: Object,
		value: Date,
		minDate: Date,
		maxDate: Date,
	},
	computed: {
		monthsArray() {
			const monthArray = []
			let monthIndex = 0
			for (let row = 0; row < 3; row++) {
				const rowArray = []
				for (let cell = 0; cell < 4; cell++) {
					const date = this.months[monthIndex]
					const monthObject = {
						date: date,
						disabled: this.checkIfDisabled(date),
						selected: this.checkIfCurrentMonth(date),
					}
					rowArray.push(monthObject)
					monthIndex++
				}
				monthArray.push(rowArray)
			}
			return monthArray
		},
	},
	methods: {
		formatMonth(month) {
			return format(month, this.calendarMonthFormat, { locale: this.locale })
		},
		checkIfCurrentMonth(month) {
			return isSameMonth(month, this.value)
		},
		checkIfDisabled(month) {
			return month < startOfMonth(this.minDate) || month > endOfMonth(this.maxDate)
		},
	},
}
</script>

<style lang="scss">
.vcs-month-select__month {
	padding: 20px;
	cursor: pointer;
	&:hover {
		background: lightcyan;
	}
}
.vcs-month-select__month--selected {
	background: gold;
}
.vcs-month-select__month--disabled {
	pointer-events: none;
	background: lightgray;
	color: gray;
}
</style>