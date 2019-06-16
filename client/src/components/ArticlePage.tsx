import React from 'react';
import { Article } from './Article';
import styled from 'styled-components';
import { Theme, useThemeContext, Typography } from '@nickjmorrow/react-component-library';

const Test = () => {
	const theme = useThemeContext();
	return (
		<Wrapper>
			<Article />
		</Wrapper>
	);
};

export default Test;

const Wrapper = styled.div``;
