import { createStore as reduxCreateStore } from 'redux';
import { rootReducer } from 'reduxUtilities/rootReducer';

const getWindow = () => {
	if (typeof window !== 'undefined') {
		return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
	}
	return undefined;
};

export const createStore = () => reduxCreateStore(rootReducer, getWindow());
