import {
	ArgumentType,
	getThemeFromNewInputs,
	updateThemeInputs,
	ThemeContext,
} from '@nickjmorrow/react-component-library';
import React from 'react';
import { Main } from 'components/Main';
import 'components/reset.css';
import 'components/styles.css';

const themeInputs: ArgumentType<typeof updateThemeInputs>[0] = {
	typography: {
		fontFamily: {
			default: 'Overpass, sans-serif',
		},
	},
	colors: {
		core: {
			hue: 260,
			saturation: 100,
		},
		accent: {
			hue: 50,
			middleLightness: 47,
			saturation: 90,
		},
	},
	defaultShowBoxShadow: false,
};

const IndexPage: React.FC = () => {
	return (
		<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
			<Main />
		</ThemeContext.Provider>
	);
};

export default IndexPage;
