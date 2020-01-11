import * as React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { useThemeContext, Typography, ChevronUpIcon } from '@nickjmorrow/react-component-library';
import { Theme } from '@nickjmorrow/react-component-library/dist/typeUtilities';
import { AppState } from 'reduxUtilities/AppState';
import { uiActions } from 'reduxUtilities/uiActions';
import { CalendarEntry } from 'components/CalendarEntry';
import { numRemainingVacationDatesSelector } from 'reduxUtilities/uiSelectors';

import { connect } from 'react-redux';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CalendarInternal: React.FC<ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>> = ({
	currentMonth,
	calendarDates,
	setMonth,
}) => {
	const theme = useThemeContext();
	return (
		<StyledCalendar theme={theme}>
			<div
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}
			>
				<ChevronUpIcon
					onClick={() => setMonth(Math.max(0, currentMonth - 1))}
					style={{ transform: 'rotate(-90deg)', cursor: 'pointer' }}
				/>
				<Typography sizeVariant={5}>{monthNames[currentMonth]}</Typography>
				<ChevronUpIcon
					style={{ transform: 'rotate(90deg)', cursor: 'pointer' }}
					onClick={() => setMonth(Math.min(11, currentMonth + 1))}
				/>
			</div>
			<InnerCalendar theme={theme}>
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Typography sizeVariant={1}>{d}</Typography>
					</div>
				))}

				{calendarDates
					.filter(cd => cd.date.getMonth() === currentMonth)
					.map(d => (
						<CalendarEntry calendarDate={d} />
					))}
			</InnerCalendar>
		</StyledCalendar>
	);
};

// redux
const mapStateToProps = (state: AppState) => ({
	currentMonth: state.ui.currentMonth,
	calendarDates: state.ui.calendarDates,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setMonth: (month: number) => dispatch(uiActions.setMonth(month)),
});

export const Calendar = connect(mapStateToProps, mapDispatchToProps)(CalendarInternal);

// css
const StyledCalendar = styled('div')<{ theme: Theme }>`
	background-color: white;
	border-radius: ${p => p.theme.border.borderRadius.br1};
	padding: ${p => p.theme.spacing.ss4};
`;

const InnerCalendar = styled('div')<{ theme: Theme }>`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: min-content;
`;
