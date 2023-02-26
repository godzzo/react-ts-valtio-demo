import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Box, Column, Row } from '../components/Layout';
import { SuperHero, superState } from '../store/super-store';

export default function SuperHeroDemo() {
	// Working snapshot deconstruct - as state 😃
	const snap = useSnapshot(superState);
	const { items, current, select } = snap;

	return (
		<>
			<Row>
				<Column>
					{items.map((p) => {
						// TODO: readonly props because of valtio snapshot
						return <ItemRow key={p.id} item={p as SuperHero} />;
					})}
				</Column>
				<Column>
					<Box>
						<button
							onClick={() =>
								select({
									name: 'New',
								})
							}
						>
							Create New
						</button>
					</Box>
					{current && (
						<>
							<Box>Current: {current.name}</Box>
							<EntryForm hero={current as SuperHero}></EntryForm>
						</>
					)}
				</Column>
			</Row>
		</>
	);
}

function ItemRow({ item }: { item: SuperHero }) {
	return (
		<Row>
			<Column>
				<Row>
					<Box>Name</Box>
					<Box>{item.name}</Box>
				</Row>
				<Row>
					<Box>Picture</Box>
					<Box>
						<img src={item.images ? item.images.sm : ''} />
					</Box>
				</Row>
			</Column>
			<Column>
				<button onClick={() => superState.remove(item)}>Remove</button>
				<button onClick={() => superState.select(item)}>Edit</button>
			</Column>
		</Row>
	);
}

function EntryForm({ hero: hero }: { hero: SuperHero }) {
	const [name, setName] = useState(hero.name);

	console.log('Current item - changed', hero);

	useEffect(() => {
		setName(hero.name);
	}, [hero]);

	return (
		<Column>
			<Row>
				<Box>Name</Box>
				<Box>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Box>
			</Row>
			<Row>
				<Box>
					<button
						onClick={() => superState.update({ ...hero, name })}
					>
						Save
					</button>
				</Box>
			</Row>
		</Column>
	);
}
