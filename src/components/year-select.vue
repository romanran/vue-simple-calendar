<template>
	<div class="vcs-year-select">
		<tr v-for="(row, rowIndex) in yearsArray" :key="rowIndex" class="vcs-table__row">
			<td
				v-for="(year, yearIndex) in row"
				:key="yearIndex"
				class="vcs-table__cell"
				:class="{ 'vcs-year-select__cell--selected': checkIfCurrentYear(year) }"
			>
				<div
					class="vcs-year-select__year"
					:class="{ 'vcs-year-select__year--selected': checkIfCurrentYear(year) }"
					v-show="year"
					@click="$emit('change', year)"
				>
					{{ formatYear(year) }}
				</div>
			</td>
		</tr>
	</div>
</template>

<script>
import { getYear, isSameYear } from 'date-fns'
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
			return getYear(year)
		},
		checkIfCurrentYear(year) {
			return isSameYear(year, this.value)
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
</style>