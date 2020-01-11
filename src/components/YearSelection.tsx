import React from 'react';
import { Select, Button } from '@nickjmorrow/react-component-library';
import { AppState } from 'reduxUtilities/AppState';
import { Dispatch } from 'redux';
import { uiActions } from 'reduxUtilities/uiActions';
import { connect } from 'react-redux';
import { getCurrentYear } from 'utilities/dateUtilities/getCurrentYear';

const YearSelectionInternal: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = ({
	currentYear,
	setYear,
}) => {
	const middleYear = getCurrentYear();
	const options = [middleYear - 1, middleYear, middleYear + 1].map(n => ({
		value: n,
		label: n.toString(),
	}));
	const [currentOption, setCurrentOption] = React.useState(options.find(o => o.value === currentYear)!);
	return (
		<div style={{ height: '100vh' }}>
			<div style={{ height: '300px' }} />
			<Select
				options={options}
				currentOption={currentOption}
				onChange={setCurrentOption}
				styleApi={{
					currentOptionTypography: {
						color: 'white',
						fontSize: '24px',
					},
					optionsList: {
						borderRadius: '8px',
					},
					currentOption: {
						borderBottomColor: 'white',
					},
				}}
			/>
			<Button
				style={{ marginTop: '300px' }}
				onClick={() => {
					setYear(currentOption.value);
				}}
			>
				Confirm
			</Button>
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	currentYear: state.ui.currentYear,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setYear: (year: number) => dispatch(uiActions.setYear(year)),
});

export const YearSelection = connect(mapStateToProps, mapDispatchToProps)(YearSelectionInternal);
