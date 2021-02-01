<template>
	<div class="vcs" :class="`vcs-${type}`">
		<select-bar
			:currentDate="currentDate"
			:nextMonth="nextMonth"
			:years="years"
			:type="type"
			:selectionType="selectionType"
			:monthFormat="monthFormat"
			:locale="locale"
			@change="changeCurrentDate"
			@change-type="selectionType = $event"
		>
			<template v-slot:arrow-left><slot name="arrow-left"></slot></template>
			<template v-slot:arrow-right><slot name="arrow-right"></slot></template>
		</select-bar>
		<template v-if="type === 'range' || (type === 'single' && selectionType === 'date')">
			<calendar
				v-for="(month, monthIndex) in monthPanels"
				:key="monthIndex"
				:month="month"
				:weekStartsOn="weekStartsOn"
				:dayFormat="dayFormat"
				:weekdayFormat="weekdayFormat"
				:locale="locale"
				:value="value"
				:type="type"
				:selecting="clickCount === 1"
				:dayUnderCursor="dayUnderCursor"
				@day-click="dayClick"
				@hover="dayHover"
			>
				<template v-slot:day="{ day }"><slot name="day" :day="day"></slot></template>
				<template v-slot:day-inside="{ day }"><slot name="day-inside" :day="day"></slot></template>
				<template v-slot:weekday="{ day }"><slot name="weekday" :day="day"></slot></template>
			</calendar>
		</template>
		<year-select :value="value[0]" v-if="selectionType === 'year'" :years="years" @change="selectYear" />
		<month-select
			v-if="selectionType === 'month'"
			:currentDate="currentDate"
			:value="value[0]"
			:months="monthsInYear"
			:calendarMonthFormat="calendarMonthFormat"
			:locale="locale"
			@change="selectMonth"
		/>
	</div>
</template>
<script>
import { add, eachMonthOfInterval, getYear, eachYearOfInterval, endOfYear } from 'date-fns'
import { last, first, isArray, reverse } from 'lodash-es'
import en from 'date-fns/locale/en-US'
import Calendar from '@/components/calendar.vue'
import SelectBar from '@/components/select-bar'
import YearSelect from '@/components/year-select.vue'
import MonthSelect from '@/components/month-select.vue'

export default {
	name: 'vue-simple-calendar',
	components: {
		Calendar,
		SelectBar,
		YearSelect,
		MonthSelect,
	},
	props: {
		value: Date | Array,
		weekStartsOn: {
			type: Number,
			default: 1,
		},
		type: {
			type: String,
			default: 'range',
		},
		dayFormat: {
			type: String,
			default: 'd',
		},
		weekdayFormat: {
			type: String,
			default: 'eeeee',
		},
		monthFormat: {
			type: String,
			default: 'MMMM',
		},
		calendarMonthFormat: {
			type: String,
			default: 'MMM',
		},
		locale: {
			type: Object,
			default: en,
		},
	},
	data() {
		return {
			currentDate: new Date(),
			firstClickedDay: null,
			clickCount: 0,
			dayUnderCursor: null,
			selectionType: 'date',
		}
	},
	computed: {
		nextMonth() {
			return add(this.currentDate, { months: 1 })
		},
		monthPanels() {
			const months = {
				single: [this.currentDate],
				range: [this.currentDate, this.nextMonth],
			}
			return months[this.type]
		},
		monthsInYear() {
			const currentYear = `${getYear(this.currentDate)}`
			return eachMonthOfInterval({
				start: new Date(currentYear),
				end: endOfYear(new Date(currentYear)),
			})
		},
		years() {
			let currentYearFloat = Number.parseInt(getYear(this.currentDate))
			currentYearFloat /= Math.pow(10, 1)
			let startYear = Math.floor(currentYearFloat)
			let endYear = Math.ceil(currentYearFloat)
			endYear = endYear === startYear ? endYear + 1 : endYear
			startYear = startYear.toString() + 0
			endYear = endYear.toString() + 0

			return eachYearOfInterval({
				start: new Date(startYear),
				end: new Date(endYear),
			})
		},
	},
	methods: {
		changeCurrentDate(step) {
			const durationsObject = {
				date: 'months',
				month: 'years',
				year: 'years',
			}
			const duration = durationsObject[this.selectionType]
			this.currentDate = add(this.currentDate, { [duration]: step })
		},
		dayClick(date) {
			if (!date) {
				return
			}
			if (this.type === 'range') {
				if (this.clickCount === 0) {
					this.firstClickedDay = date
					this.$emit('change', [date])
					this.clickCount++
				} else if (this.clickCount === 1) {
					let range = [this.firstClickedDay, date]
					range = this.firstClickedDay > date ? reverse(range) : range
					this.$emit('change', range)
					this.clickCount = 0
					this.dayUnderCursor = null
				}
			}

			if (this.type === 'single') {
				this.$emit('change', [date])
			}
		},
		dayHover(day) {
			this.dayUnderCursor = day
		},
		selectYear(date) {
			this.currentDate = date
			if (this.type === 'year') {
				this.$emit('change', [date])
			} else {
				this.selectionType = 'month'
			}
		},
		selectMonth(date) {
			this.currentDate = date
			if (this.type === 'month') {
				this.$emit('change', [date])
			}
			if (this.type === 'single') {
				this.selectionType = 'date'
			}
		},
	},
	created() {
		if (this.value) {
			this.currentDate = isArray(this.value) ? this.value[0] : this.value
		}
	},
	watch: {
		type: {
			immediate: true,
			handler() {
				if (this.type === 'range' || this.type === 'single') {
					this.selectionType = 'date'
				}
				if (this.type === 'month') {
					this.selectionType = 'month'
				}
				if (this.type === 'year') {
					this.selectionType = 'year'
				}
			},
		},
	},
}
</script>
<style lang="scss">
.vcs {
	display: inline-block;
}
.vcs-table + .vcs-table {
	margin-left: 20px;
}
</style>