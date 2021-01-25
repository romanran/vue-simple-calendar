<template>
	<div class="vcs-year-select">
		<tr v-for="(row, rowIndex) in yearsArray" :key="rowIndex" class="vcs-table__row">
			<td v-for="(year, yearIndex) in row" :key="yearIndex" class="vcs-table__cell">
				<div class="vcs-year-select__year" :class="{ selected: checkIfCurrentYear(year) }" v-show="year" @click="$emit('change', year)">
					{{ formatYear(year) }}
				</div>
			</td>
		</tr>
	</div>
</template>

<script>
import * as date from 'date-fns'
export default {
	props: {
		years: Array,
		value: Date,
	},
	computed: {
		yearsArray() {
			const yearArray = []
			let yearIndex = 0
			for (let row = 0; row < 3; row++) {
				const rowArray = []
				for (let cell = 0; cell < 4; cell++) {
					rowArray.push(this.years[yearIndex])
					yearIndex++
				}
				yearArray.push(rowArray)
			}
			return yearArray
		},
	},
	methods: {
		formatYear(year) {
			return date.getYear(year)
		},
		checkIfCurrentYear(year) {
			return date.isSameYear(year, this.value)
		},
	},
}
</script>

<style lang="scss">
.vcs-year-select__year {
	padding: 20px;
	&.selected {
		background: gold;
	}
}
</style>