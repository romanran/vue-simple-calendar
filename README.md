# vue-simple-calendar

A simple vue calendar component with minimal css. A base for further development/styling.
  
[DEMO](https://ecstatic-elion-f195d3.netlify.app/)

![License](https://img.shields.io/github/license/romanran/vue-simple-calendar)![enter image description here](https://img.shields.io/depfu/romanran/vue-simple-calendar)[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/romanran/vue-simple-calendar/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/romanran/vue-simple-calendar/?branch=master)![Minzip size](https://img.shields.io/bundlephobia/minzip/@romanran/vue-simple-calendar)

## Dependencies

[date-fns](https://date-fns.org/v2.16.1), [lodash-es](https://www.npmjs.com/package/lodash-es)

## Installation

npm i -S @romanran/vue-simple-calendar

## Usage

    <script>
    import  VSimpleCalendar  from  '@romanran/vue-simple-calendar'
    import '@romanran/vue-simple-calendar/dist/vue-simple-calendar.css'
    export  default {
        components: { VSimpleCalendar }
    },
    </script>


## Changelog
 - 1.1.5 - Changed weekday class from `.vcs-table__day` to `.vcs-table__weekday`
 - 1.1.4 - added BEM to the rest of the components
 - 1.1.3 - added modifier classes to `.vcs-table__cell`
 - 1.1.0 - changed to BEM, added `.vcs-table__day--end` class
 - 1.0.16 - fixed calendar reactivity on type change
## Props

- value: null, Date or Array with 1 or 2 Dates. Calendar opens on the selected date or on the current date
- type: single, range, month or year


**Component uses [date-fns](https://date-fns.org/v2.16.1/docs/format)**
|name|type|default|
|--|--|--|
|weekStartsOn|Number|1-Monday|
|dayFormat|String |"d"|
|weekdayFormat |String | "eeeee"|
|monthFormat |String | "MMM"|
|locale |Object | import from [date-fns](https://date-fns.org/v2.16.1/docs/ECMAScript-Modules)|

## Slots

|name|props|description|
|--|--|--|
|day|day: Object|whole day with events and classes|
|day-inside|day: Object, formatDay: Function|Inside of a `. vcs-table__day` block with date text|
|weekday |day: Object|week days bar at the top element|
|arrow-right and arrow-left|-|slots for arrow icons|

## Usage

Selection bar at the top is clickable in single, month or year mode type.

### Range mode type

To select range first click on a date, second click selects the range. OR hold and move to the second date and release.

### Styling

The component has bare minimum styling. Everything is in BEM and scoped with `.vcs` prefix.

Day classes inside the calendar:
|class|description|
|--|--|
|`.vcs-table__day--disabled`| day not in the current month|
|`.vcs-table__day--clickable`| you can click it to select date ;)|
|`.vcs-table__day--selected`| selected|
|`.vcs-table__day--start`| start of the selection|
|`.vcs-table__day--end`| end of the selection|
|`.vcs-table__day--between`| day between the selection|
same for `.vcs-table__cell`
### License
Released under the MIT License. Do whatever you want with it ;)