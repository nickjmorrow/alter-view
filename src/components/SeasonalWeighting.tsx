import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'reduxUtilities/AppState';
import { EmptyDate } from 'types/EmptyDate';
import { Typography } from '@nickjmorrow/react-component-library';
import { isConnectedDate } from 'typeGuards/isConnectedDate';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { CalendarDate } from 'types/CalendarDate';
import { isVacationDate } from 'typeGuards/isVacationDate';

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const monthSeasonMapping: { [k in Season]: Month[] } = {
	Spring: [2, 3, 4],
	Summer: [5, 6, 7],
	Fall: [8, 9, 10],
	Winter: [0, 1, 11],
};

type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

const SeasonalWeightingInternal: React.FC<{ style?: React.CSSProperties } & ReturnType<typeof mapStateToProps>> = ({
	calendarDates,
	style,
}) => {
	const seasons: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];
	return (
		<div style={{ display: 'flex', flexDirection: 'row', ...style }}>
			{seasons.map(s => (
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<div>
						<Typography colorVariant={'primaryLight'}>{s}</Typography>
					</div>
					<div
						style={{
							height: '40px',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography colorVariant={'primaryLight'}>{getNumDatesInSeason(calendarDates, s)}</Typography>
					</div>
				</div>
			))}
		</div>
	);
};

const getNumDatesInSeason = (calendarDates: CalendarDate[], season: Season): number => {
	const months = monthSeasonMapping[season];
	return calendarDates.filter(cd => months.some(m => m === cd.date.getMonth() && isVacationDate(cd))).length;
};

const mapStateToProps = (state: AppState) => ({
	calendarDates: state.ui.calendarDates,
});

export const SeasonalWeighting = connect(mapStateToProps, null)(SeasonalWeightingInternal);
