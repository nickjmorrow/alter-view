import { ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import { uiActions, UiActionKeys } from 'reduxUtilities/uiActions';
import { isCalendarDateEqual } from 'utilities/isCalendarDateEqual';
import { getCalendarDatesForYear } from 'utilities/getCalendarDatesForYear';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { getSelectedDate } from 'dateTypeProviders/getSelectedDate';
import { getEmptyDate } from 'dateTypeProviders/getEmptyDate';
import { getUpdatedConnectedDates } from 'utilities/getUpdatedConnectedDates';
import { getCurrentYear } from 'utilities/dateUtilities/getCurrentYear';
import { getUpdatedSuggestedDates } from 'utilities/getUpdatedSuggestedDates';
import { isEmptyDate } from 'typeGuards/isEmptyDate';
import { isSuggestedDate } from 'typeGuards/isSuggestedDate';
import { numRemainingVacationDatesSelector } from 'reduxUtilities/uiSelectors';

export type UiState = Readonly<typeof initialState>;

const currentYear = getCurrentYear();
const initialState = {
	calendarDates: getCalendarDatesForYear(currentYear),
	currentMonth: 0,
	currentYear,
	numVacationDates: 10,
};

export const uiReducer = (state: UiState = initialState, action: ActionType<typeof uiActions>) => {
	switch (action.type) {
		case UiActionKeys.ADD_DATE:
			return produce(state, draftState => {
				draftState.calendarDates = getUpdatedConnectedDates(
					draftState.calendarDates.map(cd =>
						isCalendarDateEqual(cd, action.payload) ? getSelectedDate(cd) : cd,
					),
				);
			});
		case UiActionKeys.REMOVE_DATE:
			return produce(state, draftState => {
				draftState.calendarDates = getUpdatedConnectedDates(
					draftState.calendarDates.map(sd =>
						isCalendarDateEqual(sd, action.payload) ? getEmptyDate(sd) : sd,
					),
				);
			});
		case UiActionKeys.TOGGLE_DATE:
			return produce(state, draftState => {
				const foundDateIndex = draftState.calendarDates.findIndex(sd =>
					isCalendarDateEqual(sd, action.payload),
				);
				const foundDate = draftState.calendarDates[foundDateIndex];

				if (!isEmptyDate(foundDate) && !isSelectedDate(foundDate) && !isSuggestedDate(foundDate)) {
					throw new Error('Unexpected date type was toggled.');
				}

				const getNewDate = (date: typeof action.payload) => {
					switch (date.type) {
						case 'empty':
							return getSelectedDate(date);
						case 'selected':
							return getEmptyDate(date);
						case 'suggested':
							return getSelectedDate(date);
						default:
							throw new Error('Should never get here.');
					}
				};

				draftState.calendarDates[foundDateIndex] = getNewDate(foundDate);

				draftState.calendarDates = getUpdatedConnectedDates(draftState.calendarDates);
			});
		case UiActionKeys.SET_MONTH:
			return produce(state, draftState => {
				draftState.currentMonth = action.payload;
			});
		case UiActionKeys.SET_YEAR:
			return produce(state, draftState => {
				draftState.currentYear = action.payload;
				draftState.calendarDates = getUpdatedConnectedDates(getCalendarDatesForYear(action.payload));
			});
		case UiActionKeys.GET_SUGGESTED_DATES:
			return produce(state, draftState => {
				draftState.calendarDates = getUpdatedConnectedDates(
					getUpdatedSuggestedDates(
						draftState.calendarDates,
						numRemainingVacationDatesSelector({ ui: draftState }),
					),
				);
			});
		case UiActionKeys.SET_NUM_VACATION_DATES:
			return produce(state, draftState => {
				draftState.numVacationDates = action.payload;
			});
		default:
			return state;
	}
};
