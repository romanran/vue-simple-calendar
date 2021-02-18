<template>
	<div class="vcs-year-select">
		<tr v-for="(row, rowIndex) in yearsArray" :key="rowIndex" class="vcs-table__row">
			<td
				v-for="(year, yearIndex) in row"
				:key="yearIndex"
				class="vcs-table__cell vcs-year-select__cell"
				:class="{ 'vcs-year-select__cell--selected': year.selected, 'vcs-year-select__cel--disabled': year.disabled }"
			>
				<div
					class="vcs-year-select__year"
					:class="{ 'vcs-year-select__year--selected': year.selected, 'vcs-year-select__year--disabled': year.disabled }"
					v-show="year.date"
					@click="$emit('change', year.date)"
				>
					{{ formatYear(year.date) }}
				</div>
			</td>
		</tr>
	</div>
</template>

<script>
import { getYear, isSameYear, endOfYear, startOfYear } from 'date-fns'
export default {
	props: {
		years: Array,
		value: Date,
		minDate: Date,
		maxDate: Date,
	},
	computed: {
		yearsArray() {
			const yearArray = []
			let yearIndex = 0
			for (let row = 0; row < 3; row++) {
				const rowArray = []
				for (let cell = 0; cell < 4; cell++) {
					const date = this.years[yearIndex]
					const yearObject = {
						date: date,
						disabled: this.checkIfDisabled(date),
						selected: this.checkIfCurrentYear(date),
					}
					rowArray.push(yearObject)
					yearIndex++
				}
				yearArray.push(rowArray)
			}
			return yearArray
		},
	},
	methods: {
		formatYear(year) {
			return getYear(year)
		},
		checkIfCurrentYear(year) {
			return isSameYear(year, this.value)
		},
		checkIfDisabled(year) {
			return year < startOfYear(this.minDate) || year > endOfYear(this.maxDate)
		},
	},
}
</script>

<style lang="scss">
.vcs-year-select__year {
	padding: 20px;
	cursor: pointer;
	&:hover {
		background: lightcyan;
	}
}
.vcs-year-select__year--selected {
	background: gold;
}
.vcs-year-select__year--disabled {
	pointer-events: none;
	background: lightgray;
	color: gray;
}
</style>