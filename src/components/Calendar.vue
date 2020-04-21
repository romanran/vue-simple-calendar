<template>
	<div class="vcs-table">
		<tr v-for="(row, rowIndex) in monthArray" :key="rowIndex" class="vcs-table__row">
			<td v-for="(day, dayIndex) in row" :key="dayIndex" class="vcs-table__cell">
				<slot :day="day">
					<div class="vcs-table__day" :class="{'gray': !day.isInMonth}">{{day.date | formatDay}}</div>
				</slot>
			</td>
		</tr>
	</div>
</template>

<script>
	import * as date from 'date-fns'
	import { last } from 'lodash-es'
	export default {
		props: {
			month: Date
		},
		data() {
			return {
				currentYear: 2020,
				currentDay: 20,
				currentMonth: 1
			}
		},
		filters: {
			formatDay(value) {
				if (value) {
					return date.format(value, 'd')
				}
			}
		},
		computed: {
			monthDays() {
				return date.eachDayOfInterval({ start: date.startOfMonth(this.month), end: date.endOfMonth(this.month) })
			},
			monthArray() {
				let currentMonthDay = 0
				let nextMonthDay = 1
				const monthArray = []
				let monthStarted = false
				for (let row = 0; row < 6; row++) {
					const rowArray = []
					for (let cell = 0; cell < 7; cell++) {
						if (row === 0 && cell === this.firstDay) {
							monthStarted = true
						}
						const day = {
							date: null,
							isInMonth: false,
							isAfter: false,
							isBefore: false
						}
						if (monthStarted) {
							const dayInMonth = this.monthDays[currentMonthDay]
							if (dayInMonth) {
								day.date = dayInMonth
								day.isInMonth = true
								currentMonthDay++
							} else {
								day.date = date.add(last(this.monthDays), { days: nextMonthDay })
								day.isAfter = true
								nextMonthDay++
							}
						} else {
							const dayBefore = this.firstDay - cell
							day.date = date.subDays(this.monthDays[0], dayBefore)
							day.isBefore = true
						}
						rowArray.push(day)
					}
					monthArray.push(rowArray)
				}
				return monthArray
			},
			firstDay() {
				return date.getISODay(this.month)
			},
			daysInMonth() {
				return date.getDaysInMonth(this.month)
			}
		}
	}
</script> 

<style lang="scss">
	.vcs-table__day {
		width: 100px;
		height: 100px;
		&.gray {
			color: #aaa;
		}
	}
</style>