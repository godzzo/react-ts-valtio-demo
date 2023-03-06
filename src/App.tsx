import * as React from 'react';
import { useState } from 'react';

import './App.css';

import { Box, Column, Row } from './components/Layout';

import LayoutDemo from './views/LayoutDemo';
import HelloWorld from './views/HelloWorld';
import PokemonList from './views/PokemonList';
import SelectDemo from './views/SelectDemo';
import DownshiftDemo from './views/DownshiftDemo';
import HeadlessDemo from './views/HeadlessDemo';
import SuperHeroDemo from './views/SuperHeroDemo';
import DynamicComponentDemo from './views/DynamicComponentDemo';
import ValtioContext from './views/ValtioContext';
import { FocusTrapDemo } from './views/FocusTrapDemo';
import StyledHello from './views/StyledHello';
import SassDemo from './views/SassDemo';

const views: { [key: string]: () => JSX.Element } = {
	SassDemo,
	StyledHello,
	FocusTrapDemo,
	ValtioContext,
	DynamicComponentDemo,
	SuperHeroDemo,
	HeadlessDemo,
	PokemonList,
	DownshiftDemo,
	LayoutDemo,
	HelloWorld,
	SelectDemo,
};

const defaultView = Object.keys(views)[0];

export default function App() {
	const [selectedView, selectView] = useState(defaultView);

	return (
		<Column>
			<ViewChooser selectView={selectView} selectedView={selectedView} />
			<Box>{React.createElement(views[selectedView])}</Box>
		</Column>
	);
}

export function ViewChooser({
	selectedView,
	selectView,
}: {
	selectedView: string;
	selectView: (viewName: string) => void;
}) {
	return (
		<Row
			style={{
				padding: '0.5rem',
				borderRadius: '7px',
				backgroundColor: 'orange',
				border: '2px solid blue',
				flexWrap: 'wrap',
			}}
		>
			{Object.keys(views).map((viewName) => {
				const isSelected = viewName === selectedView;

				return (
					<button
						key={viewName}
						onClick={() => selectView(viewName)}
						style={{
							padding: '0.5rem',
							borderRadius: '7px',
							backgroundColor: isSelected ? 'red' : 'white',
							border: `2px solid ${isSelected ? 'blue' : 'gray'}`,
							color: isSelected ? 'white' : 'blue',
						}}
					>
						{viewName}
					</button>
				);
			})}
		</Row>
	);
}
