<template>
	<div class="vcs-select-bar" :class="`vcs-${selectionType}`">
		<div class="vcs-select-bar__arrow vcs-select-bar__arrow--left" @click.prevent.stop="arrowClick(-1)">
			<slot name="arrow-left">←</slot>
		</div>

		<template v-if="selectionType === 'year'">
			<div class="vcs-select-bar__date">
				<span class="vcs-select-bar__year">{{ formatYear(years[0]) }}</span>
				<span> - </span>
				<span class="vcs-select-bar__year">{{ formatYear(nextDecade) }}</span>
			</div>
		</template>

		<template v-if="selectionType === 'month'">
			<div class="vcs-select-bar__date">
				<span class="vcs-select-bar__year" @click="$emit('change-type', 'year')">{{ formatYear(currentDate) }}</span>
			</div>
		</template>

		<template v-if="selectionType === 'date'">
			<div class="vcs-select-bar__date">
				<span class="vcs-select-bar__month" @click="type === 'single' && $emit('change-type', 'month')">{{ formatMonth(currentDate) }}</span
				><span class="vcs-select-bar__year" @click="type === 'single' && $emit('change-type', 'year')">{{ formatYear(currentDate) }}</span>
			</div>
			<div class="vcs-select-bar__date vcs-select-bar__date--second">
				<span class="vcs-select-bar__month">{{ formatMonth(nextMonth) }}</span>
				<span class="vcs-select-bar__year">{{ formatYear(nextMonth) }}</span>
			</div>
		</template>

		<div class="vcs-select-bar__arrow vcs-select-bar__arrow--right" @click.prevent.stop="arrowClick(1)">
			<slot name="arrow-right">→</slot>
		</div>
	</div>
</template>

<script>
import { format, add } from 'date-fns'
import { last } from 'lodash-es'
export default {
	props: {
		currentDate: Date,
		nextMonth: Date,
		monthFormat: String,
		locale: Object,
		selectionType: String,
		years: Array,
		type: String,
	},
	computed: {
		nextDecade() {
			return last(this.years)
		},
	},
	methods: {
		formatMonth(date) {
			return format(date, this.monthFormat, { locale: this.locale })
		},
		formatYear(date) {
			return format(date, 'yyyy', { locale: this.locale })
		},
		arrowClick(step) {
			if (this.selectionType === 'year') {
				step *= 10
			}
			this.$emit('change', step)
		},
	},
}
</script>

<style lang="scss">
.vcs-select-bar {
	display: flex;
	width: 100%;
}
.vcs-select-bar__month {
	width: 50%;
	text-align: center;
	margin-right: 5px;
}
.vcs-single .vcs-select-bar__date--second {
	display: none;
}
.vcs-select-bar__date {
	width: 100%;
	text-align: center;
	.vcs-year & {
		display: block;
	}
	+ .vcs-select-bar__date {
		margin-left: 5px;
	}
}
.vcs-select-bar__month {
}
.vcs-single,
.vcs-month,
.vcs-year {
	.vcs-select-bar__month,
	.vcs-select-bar__year {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
}
.vcs-month .vcs-year,
.vcs-year .vcs-year {
	.vcs-select-bar__date {
		cursor: default;
		&:hover {
			text-decoration: none;
		}
	}
}
.vcs-select-bar__arrow {
	cursor: pointer;
}
</style>