
  

# vue-simple-calendar

A simple vue calendar component with minimal css. A base for further development/styling.
  
[DEMO](https://ecstatic-elion-f195d3.netlify.app/)

![License](https://img.shields.io/github/license/romanran/vue-simple-calendar)![enter image description here](https://img.shields.io/depfu/romanran/vue-simple-calendar)[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/romanran/vue-simple-calendar/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/romanran/vue-simple-calendar/?branch=master)![Minzip size](https://img.shields.io/bundlephobia/min/@romanran/vue-simple-calendar?style=flat)

## Dependencies

[date-fns](https://date-fns.org/v2.16.1)

[lodash-es](https://www.npmjs.com/package/lodash-es)

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


## Props

  

- value: null, Date or Array with 1 or 2 Dates. Calendar opens on the selected date or on the current date

  

- type: single, range, month or year

  

**Component uses [date-fns](https://date-fns.org/v2.16.1/docs/format)**

  

- weekStartsOn - Number - default: Monday

  

- dayFormat - String default: "d"

  

- weekdayFormat - String default: "eeeee"

  

- monthFormat - String default: "MMM"

  

- locale - Object imported from [date-fns](https://date-fns.org/v2.16.1/docs/ECMAScript-Modules)

## Slots

- day - props: day Object - whole day with events and classes

- day-inside - props: day Object - Inside of a `. vcs-table__day` block with date text

- weekday - props: day Object - week days bar at the top element

- arrow-right and arrow-left - slots for arrow icons

  

## Usage

  

Selection bar at the top is clickable in single, month or year mode type.

  

### Range mode type

  

To select range first click on a date, second click selects the range. OR hold and move to the second date and release.

  

### Styling

  

The component has bare minimum styling. Everything is in BE and scoped with `.vcs` prefix, modificators are separate: `.vcs-selected, .vcs-clickable`