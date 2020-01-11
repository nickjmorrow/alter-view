import { combineReducers } from 'redux';
import { uiReducer } from 'reduxUtilities/uiReducer';

export const rootReducer = combineReducers({
	ui: uiReducer,
});
