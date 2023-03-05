import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { Column, Row } from '../components/Layout';

const padding = '3em';

const Section = styled.section<{ background: string }>`
	color: white;

	/* Pass variables as inputs */
	padding: ${padding};

	/* Adjust the background from the properties */
	background: ${(props) => props.background};
`;

const baseTheme = {
	name: 'base',
	backgroundColor: 'blue',
	borderColor: 'red',
};

const extraTheme = {
	name: 'extra',
	backgroundColor: 'yellow',
	borderColor: 'green',
};

const StyledHelloMsg = styled.div<{ angryColor: string; theme: Theme }>`
	color: ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.backgroundColor};
	padding: 10px;
	border-radius: 5px;
	border: 3px solid ${(props) => props.theme.borderColor};

	& img {
		max-width: 100%;
		height: auto;
	}

	& span {
		color: ${(props) => props.angryColor};
		font-weight: bold;
	}
`;

const Button = styled.button<{ bg?: string; color?: string }>`
	padding: 0.5rem;
	color: ${(props) => props.color || 'white'};
	background-color: ${(props) => props.bg || 'blue'};
	border-radius: 10px;
	border: 2px solid blue;
`;

export default function StyledHello() {
	const [theme, setTheme] = useState(baseTheme);

	return (
		<Column>
			<Row>
				<Button
					onClick={() =>
						setTheme(theme.name === 'base' ? extraTheme : baseTheme)
					}
				>
					Theme: {theme.name}
				</Button>
			</Row>
			<ThemeContext.Provider value={theme}>
				<StyledHelloComp />
			</ThemeContext.Provider>
		</Column>
	);
}

export function StyledHelloComp() {
	const theme = useContext(ThemeContext);

	return (
		<Column>
			<StyledHelloMsg angryColor="red" theme={theme}>
				<img src="https://media.giphy.com/media/3o7TKSxR2zQhYq6yWU/giphy.gif" />
				<span>Styled Hello</span>
			</StyledHelloMsg>

			<Section background="cornflowerblue">✨ Magic</Section>
			<Section background="orange">🎉 Party</Section>
		</Column>
	);
}

type Theme = typeof baseTheme;
const ThemeContext = createContext<Theme>(null as any);
