import * as React from 'react';
import { Calendar } from 'components/Calendar';
import { ChevronUpIcon, TextInput, Button, Typography } from '@nickjmorrow/react-component-library';
import { Analytics } from 'components/Analytics';
import { Dispatch } from 'redux';
import { uiActions } from 'reduxUtilities/uiActions';
import { connect } from 'react-redux';
import { AppState } from 'reduxUtilities/AppState';
import { numRemainingVacationDatesSelector } from 'reduxUtilities/uiSelectors';

const DateSelectionInternal: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = ({
	getSuggestedDates,
	numVacationDates,
	setNumVacationDates,
	numRemainingVacationDates,
}) => {
	return (
		<div style={{ minHeight: '100vh' }}>
			<div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div
					style={{
						border: '1px solid white',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '43px',
						width: '40px',
						borderRadius: '40px',
						cursor: 'pointer',
					}}
				>
					<ChevronUpIcon colorVariant={'primaryLight'} sizeVariant={4} />
				</div>
			</div>
			<Calendar />
			<Analytics />
			<div style={{ marginTop: '40px' }}>
				<Typography colorVariant={'primaryLight'} sizeVariant={4} weightVariant={7}>
					Calculation Inputs
				</Typography>
				<TextInput
					placeholder={'Total Available Dates'}
					value={numVacationDates}
					label={`Vacation Days (${numRemainingVacationDates} remaining)`}
					type={'number'}
					style={{ marginTop: '16px' }}
					onChange={e => setNumVacationDates(parseInt(e.currentTarget.value, 10))}
				/>

				<Button onClick={() => getSuggestedDates()} colorVariant={'accent'} style={{ margin: '16px 0' }}>
					Calculate
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	numVacationDates: state.ui.numVacationDates,
	numRemainingVacationDates: numRemainingVacationDatesSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getSuggestedDates: () => dispatch(uiActions.getSuggestedDates()),
	setNumVacationDates: (numVacationDates: number) => dispatch(uiActions.setNumVacationDates(numVacationDates)),
});

export const DateSelection = connect(mapStateToProps, mapDispatchToProps)(DateSelectionInternal);
