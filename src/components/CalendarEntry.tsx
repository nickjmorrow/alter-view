import * as React from 'react';
import styled from 'styled-components';
import { Typography, useThemeContext, Theme, UIState } from '@nickjmorrow/react-component-library';
import { EmptyDate } from 'types/EmptyDate';
import { Dispatch } from 'redux';
import { uiActions } from 'reduxUtilities/uiActions';
import { connect } from 'react-redux';
import { AppState } from 'reduxUtilities/AppState';
import { isWeekend } from 'utilities/dateUtilities/isWeekend';
import { CalendarDate } from 'types/CalendarDate';
import { SelectedDate } from 'types/SelectedDate';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { isSuggestedDate } from 'typeGuards/isSuggestedDate';
import { isEmptyDate } from 'typeGuards/isEmptyDate';
import { isConnectedDate } from 'typeGuards/isConnectedDate';
import { isHolidayDate } from 'typeGuards/isHolidayDate';
import { SuggestedDate } from 'types/SuggestedDate';
import { numRemainingVacationDatesSelector } from 'reduxUtilities/uiSelectors';

interface OwnProps {
	calendarDate: CalendarDate;
}

const CalendarEntryInternal: React.FC<OwnProps &
	ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>> = ({
	calendarDate,
	toggleDate,
	isInCurrentMonth,
	numVacationDatesRemaining,
}) => {
	const theme = useThemeContext();
	return (
		<StyledCalendarEntry
			calendarDate={calendarDate}
			theme={theme}
			onClick={() => {
				if (
					isSelectedDate(calendarDate) ||
					(isEmptyDate(calendarDate) && numVacationDatesRemaining > 0) ||
					isSuggestedDate(calendarDate)
				) {
					toggleDate(calendarDate);
				}
			}}
		>
			<StyledTypography isInCurrentMonth={isInCurrentMonth}>{calendarDate.date.getDate()}</StyledTypography>
		</StyledCalendarEntry>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	toggleDate: (calendarDate: EmptyDate | SelectedDate | SuggestedDate) =>
		dispatch(uiActions.toggleDate(calendarDate)),
});

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
	isInCurrentMonth: state.ui.currentMonth === ownProps.calendarDate.date.getMonth(),
	numVacationDatesRemaining: numRemainingVacationDatesSelector(state),
});

export const CalendarEntry = connect(mapStateToProps, mapDispatchToProps)(CalendarEntryInternal);

// css
const StyledTypography = styled(Typography)<{ isInCurrentMonth: boolean }>`
	color: ${p => (p.isInCurrentMonth ? 'black' : 'gray')};
`;

const StyledCalendarEntry = styled('div')<{
	theme: Theme;
	calendarDate: CalendarDate;
}>`
	width: 40px;
	height: 40px;
	margin: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: ${p => p => (isWeekend(p.calendarDate) ? 'not-allowed' : 'pointer')};
	transition: background-color ${p => p.theme.transitions.fast};
	border-radius: ${p => p.theme.border.borderRadius.br1};
	background-color: ${p => getBackgroundColor('normal', p.calendarDate, p.theme)};
	&:hover {
		background-color: ${p => getBackgroundColor('hover', p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
	&:focus {
		background-color: ${p => getBackgroundColor('active', p.calendarDate, p.theme)};
		transition: background-color ${p => p.theme.transitions.fast};
	}
`;

const getBackgroundColor = (uiState: UIState, calendarDate: CalendarDate, theme: Theme) => {
	if (isConnectedDate(calendarDate)) {
		return theme.colors.accent.cs2;
	}
	if (isHolidayDate(calendarDate)) {
		return theme.colors.core.cs2;
	}
	if (isWeekend(calendarDate)) {
		return theme.colors.neutral.cs3;
	}
	if (isSuggestedDate(calendarDate)) {
		return theme.colors.accent.cs7;
	}

	if (uiState === 'active' || isSelectedDate(calendarDate)) {
		return theme.colors.accent.cs5;
	}

	if (uiState === 'hover') {
		return theme.colors.accent.cs2;
	}

	return theme.colors.background;
};
