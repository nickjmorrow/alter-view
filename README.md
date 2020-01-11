# Breakbuilder

A webapp to automatically schedule your vacation to maximize the "spread" of your vacation throughout the year. There is no live demo yet.

## Current State

Still in development.

## Technical Stack

Gatsby, TypeScript.

## Expectations

This will just stay a hobby project that I work on now and again.

## Lessons Learned

-   Originally had separate fields in the state for connectedDates, selectedDates, etc, but that didn't quite accurately describe the "type" of the year. Ended up swapping to a list of calendarDates, each of which could be connectedDate | selectedDate | ... . Should think more about type system in the future before building stuff out.
-   Pretty happy with the tagged union for now, where each essentially extends WrappedDate and adds it's own tag.
