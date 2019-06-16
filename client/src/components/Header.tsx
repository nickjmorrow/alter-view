import * as React from 'react';
import styled from 'styled-components';
import { Theme, useThemeContext } from '@nickjmorrow/react-component-library';

export const Header: React.FC = ({ children }) => {
	const theme = useThemeContext();
	return <StyledHeader theme={theme}>{children}</StyledHeader>;
};

export const StyledHeader = styled('header')<{ theme: Theme }>`
	height: ${p => p.theme.spacing.ss32};
	display: flex;
	align-items: center;
`;
