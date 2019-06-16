import React from 'react';
import { withRouter } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Article } from './Article';

const Test = () => {
	return (
		<Router>
			<Article />
		</Router>
	);
};

export default Test;
