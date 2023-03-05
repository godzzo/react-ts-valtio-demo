import styled from 'styled-components';
import { Column } from '../components/Layout';

const padding = '3em';

const Section = styled.section<{ background: string }>`
	color: white;

	/* Pass variables as inputs */
	padding: ${padding};

	/* Adjust the background from the properties */
	background: ${(props) => props.background};
`;

const StyledHelloMsg = styled.div<{ angryColor: string }>`
	color: ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.backgroundColor};
	padding: 10px;
	border-radius: 5px;
	border: 1px solid ${(props) => props.theme.borderColor};

	& img {
		max-width: 100%;
		height: auto;
	}

	& span {
		color: ${(props) => props.angryColor};
		font-weight: bold;
	}
`;

export default function StyledHello() {
	return (
		<Column>
			<Section background="cornflowerblue">✨ Magic</Section>
			<Section background="orange">🎉 Party</Section>

			<StyledHelloMsg angryColor="red">
				<img src="https://media.giphy.com/media/3o7TKSxR2zQhYq6yWU/giphy.gif" />
				<span>Styled Hello</span>
			</StyledHelloMsg>
		</Column>
	);
}
