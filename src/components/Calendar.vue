<template>
	<div class="vcs-table">
		<tr class="vcs-table__row weekdays">
			<td v-for="(day, dayIndex) in weekdays" :key="dayIndex">
				<slot :day="day">
					<div class="vcs-table__day">{{day | formatWeekday}}</div>
				</slot>
			</td>
		</tr>
		<tr v-for="(row, rowIndex) in monthArray" :key="rowIndex" class="vcs-table__row">
			<td v-for="(day, dayIndex) in row" :key="dayIndex" class="vcs-table__cell">
				<slot :day="day">
					<div
						class="vcs-table__day"
						:class="{'gray': !day.isInMonth, 'clickable': isClickable(day)}"
						@click="dayClick"
					>{{day.date | formatDay}}</div>
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
			month: Date,
			weekStartsOn: Number
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
					return date.lightFormat(value, 'd')
				}
			},
			formatWeekday(value) {
				if (value) {
					return date.format(value, 'eeeee')
				}
			}
		},
		computed: {
			weekdays() {
				return date.eachDayOfInterval({
					start: date.startOfWeek(this.month, { weekStartsOn: this.weekStartsOn }),
					end: date.endOfWeek(this.month, { weekStartsOn: this.weekStartsOn })
				})
			},
			monthDays() {
				return date.eachDayOfInterval({ start: date.startOfMonth(this.month), end: date.endOfMonth(this.month) })
			},
			monthArray() {
				const monthArray = []
				let dayNumber = 0
				for (let row = 0; row < 6; row++) {
					const rowArray = []
					for (let cell = 0; cell < 7; cell++) {
						const day = {
							date: null,
							isInMonth: false,
							isAfter: false,
							isBefore: false
						}
						let daysDifferenceFrom1st = this.firstDay + 1 - dayNumber
						if (daysDifferenceFrom1st <= 0) {
							daysDifferenceFrom1st = Math.abs(daysDifferenceFrom1st)
							day.date = date.add(this.monthDays[0], { days: daysDifferenceFrom1st })
							day.isAfter = daysDifferenceFrom1st > this.daysInMonth
							day.isInMonth = daysDifferenceFrom1st < this.daysInMonth
						} else {
							day.date = date.sub(this.monthDays[0], { days: daysDifferenceFrom1st })
							day.isBefore = true
						}
						rowArray.push(day)
						dayNumber++
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
		},
		methods: {
			isClickable(day) {
				return day.isInMonth
			},
			dayClick(day) {
				if (this.isClickable(day)) {
					this.$emit('dayClick', day)
				}
			}
		}
	}
</script> 

<style lang="scss">
	.vcs-table {
		display: inline-block;
		margin: 20px;
		box-sizing: border-box;
		* {
			box-sizing: inherit;
		}
	}
	.vcs-table__day {
		width: 50px;
		height: 50px;
		padding: 10px;
		&.gray {
			color: #aaa;
		}
		&.clickable {
			&:hover {
				background: lightcyan;
			}
			cursor: pointer;
		}
	}
</style>