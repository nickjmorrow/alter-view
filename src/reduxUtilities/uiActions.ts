import { action } from 'typesafe-actions';
import { EmptyDate } from 'types/EmptyDate';
import { SelectedDate } from 'types/SelectedDate';
import { SuggestedDate } from 'types/SuggestedDate';

export enum UiActionKeys {
	ADD_DATE = 'ADD_DATE',
	REMOVE_DATE = 'REMOVE_DATE',
	TOGGLE_DATE = 'TOGGLE_DATE',
	SET_YEAR = 'SET_YEAR',
	SET_MONTH = 'SET_MONTH',
	GET_SUGGESTED_DATES = 'GET_SUGGESTED_DATES',
	SET_NUM_VACATION_DATES = 'SET_NUM_VACATION_DATES',
}

const addDate = (date: EmptyDate) => action(UiActionKeys.ADD_DATE, date);

const removeDate = (date: SelectedDate) => action(UiActionKeys.REMOVE_DATE, date);

const toggleDate = (date: EmptyDate | SelectedDate | SuggestedDate) => action(UiActionKeys.TOGGLE_DATE, date);

const setYear = (year: number) => action(UiActionKeys.SET_YEAR, year);

const setMonth = (month: number) => action(UiActionKeys.SET_MONTH, month);

const getSuggestedDates = () => action(UiActionKeys.GET_SUGGESTED_DATES);

const setNumVacationDates = (numVacationDates: number) => action(UiActionKeys.SET_NUM_VACATION_DATES, numVacationDates);

export const uiActions = {
	addDate,
	removeDate,
	toggleDate,
	setYear,
	setMonth,
	getSuggestedDates,
	setNumVacationDates,
};
