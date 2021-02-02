<template>
	<div class="vcs-table">
		<tr class="vcs-table__row vcs-table__row--weekdays">
			<td v-for="(day, dayIndex) in weekdays" :key="dayIndex">
				<slot :day="day" :formatWeekday="formatWeekday" name="weekday">
					<div class="vcs-table__weekday">{{ formatWeekday(day) }}</div>
				</slot>
			</td>
		</tr>
		<tr v-for="(row, rowIndex) in monthArray" :key="rowIndex" class="vcs-table__row">
			<td
				v-for="(day, dayIndex) in row"
				:key="dayIndex"
				class="vcs-table__cell"
				:class="{
					'vcs-table__cell--disabled': !day.isInMonth,
					'vcs-table__cell--clickable': isClickable(day),
					'vcs-table__cell--selected': day.selected,
					'vcs-table__cell--start': day.start,
					'vcs-table__cell--end': day.end,
					'vcs-table__cell--between': day.between,
				}"
			>
				<slot :day="day" name="day">
					<div
						class="vcs-table__day"
						:class="{
							'vcs-table__day--disabled': !day.isInMonth,
							'vcs-table__day--clickable': isClickable(day),
							'vcs-table__day--selected': day.selected,
							'vcs-table__day--start': day.start,
							'vcs-table__day--end': day.end,
							'vcs-table__day--between': day.between,
						}"
						@mousedown="dayMouseDown(day)"
						@mouseover="dayHover(day)"
					>
						<slot :day="day" :formatDay="formatDay" name="day-inside">
							{{ formatDay(day.date) }}
						</slot>
					</div>
				</slot>
			</td>
		</tr>
	</div>
</template>

<script>
import {
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	startOfMonth,
	endOfMonth,
	getISODay,
	getDaysInMonth,
	lightFormat,
	format,
	sub,
	add,
	isSameDay,
} from 'date-fns'
import { isEmpty } from 'lodash-es'

export default {
	props: {
		month: Date,
		weekStartsOn: Number,
		dayFormat: String,
		weekdayFormat: String,
		locale: Object,
		value: Array,
		type: String,
		selecting: Boolean,
		dayUnderCursor: Object,
	},
	computed: {
		weekdays() {
			return eachDayOfInterval({
				start: startOfWeek(this.month, { weekStartsOn: this.weekStartsOn }),
				end: endOfWeek(this.month, { weekStartsOn: this.weekStartsOn }),
			})
		},
		monthDays() {
			return eachDayOfInterval({ start: startOfMonth(this.month), end: endOfMonth(this.month) })
		},
		monthArray() {
			const monthArray = []
			let dayNumber = 0
			for (let row = 0; row < 6; row++) {
				const rowArray = []
				for (let cell = 0; cell < 7; cell++) {
					let day = {
						date: null,
						isInMonth: false,
						isInNextMonth: false,
						isInPreviousMonth: false,
						selected: false,
						start: false,
						end: false,
					}
					day = this.addDayProperties(day, dayNumber)

					rowArray.push(day)
					dayNumber++
				}
				monthArray.push(rowArray)
			}
			return monthArray
		},
		firstDay() {
			return getISODay(startOfMonth(this.month))
		},
		daysInMonth() {
			return getDaysInMonth(this.month)
		},
	},
	methods: {
		addDayProperties(day, dayNumber) {
			let daysDifferenceFrom1st = this.firstDay - this.weekStartsOn - dayNumber
			if (daysDifferenceFrom1st <= 0) {
				daysDifferenceFrom1st = Math.abs(daysDifferenceFrom1st)
				day.date = add(this.monthDays[0], { days: daysDifferenceFrom1st })
				day.isInNextMonth = daysDifferenceFrom1st > this.daysInMonth
				day.isInMonth = daysDifferenceFrom1st < this.daysInMonth
			} else {
				day.date = sub(this.monthDays[0], { days: daysDifferenceFrom1st })
				day.isInPreviousMonth = true
			}

			const dayUnderCursor = this.dayUnderCursor && this.dayUnderCursor.date
			let firstDate, secondDate
			if (isEmpty(this.value)) {
				firstDate = new Date()
				secondDate = this.selecting ? dayUnderCursor : firstDate
			} else {
				firstDate = this.value[0]
				secondDate = this.selecting ? dayUnderCursor : this.value[1]
			}
			if (secondDate && secondDate < firstDate) {
				;[firstDate, secondDate] = [secondDate, firstDate] // if 2nd date is before 1st swap them
			}
			const isBetween = firstDate < day.date && day.date < secondDate
			day.between = this.type === 'range' && isBetween

			day.start = this.type === 'range' ? isSameDay(day.date, firstDate) : false
			day.end = this.type === 'range' ? isSameDay(day.date, secondDate) : false
			if (this.type === 'single') {
				day.selected = day.isInMonth && isSameDay(day.date, this.value[0])
			} else {
				day.selected = day.isInMonth && (day.start || day.end)
			}
			return day
		},
		isClickable(day) {
			return day && day.isInMonth
		},
		formatDay(value) {
			if (value) {
				return lightFormat(value, this.dayFormat, { locale: this.locale })
			}
		},
		formatWeekday(value) {
			if (value) {
				return format(value, this.weekdayFormat, { locale: this.locale })
			}
		},
		dayMouseDown(day) {
			if (!this.isClickable(day)) {
				return
			}
			window.addEventListener('mouseup', this.mouseUp)
			this.isHoldingMouseDown = true
			this.releasedMouseButton = false
			setTimeout(() => {
				if (!this.releasedMouseButton) {
					this.$emit('day-click', day.date)
					console.log('emit day click')
				}
			}, 100)
		},
		mouseUp() {
			this.releasedMouseButton = true
			window.removeEventListener('mouseup', this.mouseUp)
			console.log('mouse up')
			this.$emit('day-click', this.dayUnderCursor.date)
			if (!this.isClickable(this.dayUnderCursor)) {
				// this.$emit('day-click', this.value[0]) // maybe?
			}
		},
		dayHover(day) {
			this.$emit('hover', day)
		},
	},
}
</script> 

<style lang="scss">
.vcs-table {
	display: inline-block;
	box-sizing: border-box;
	* {
		box-sizing: inherit;
	}
}
.vcs-table__day,
.vcs-table__weekday {
	width: 50px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	user-select: none;
}
.vcs-table__day--disabled {
	color: #aaa;
}
.vcs-table__day--clickable {
	&:hover {
		background: lightcyan;
	}
	cursor: pointer;
}
.vcs-table__day--selected {
	background: gold;
}
.vcs-table__day--between {
	background: lightpink;
}
</style>
