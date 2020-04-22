import * as date from 'date-fns'
import { last, first } from 'lodash'
export default {
    months(dates) {
        return dates
    },
    nextMonth() {
        return date.add(last(this.months), { month: 1 })
    },
    previousMonth() {
        return date.sub(first(this.months), { month: 1 })
    },
    weekStartsOn(value) {
        return value
    },
}
