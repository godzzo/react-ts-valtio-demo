import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Box, Column, Row } from '../components/Layout';
import { SuperHero, superState } from '../store/super-store';

const modes = ['xs', 'sm', 'md', 'lg'];

export default function SuperHeroDemo() {
	// Working snapshot deconstruct - as state 😃
	const snap = useSnapshot(superState);
	const { items, current, select } = snap;

	const [mode, setMode] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');

	return (
		<>
			<Row>
				<Column
					style={{
						maxHeight: '85vh',
						overflowY: 'auto',
					}}
				>
					{items.map((p) => {
						// TODO: readonly props because of valtio snapshot
						return (
							<ItemRow
								key={p.id}
								item={p as SuperHero}
								mode={mode}
							/>
						);
					})}
				</Column>
				<Column>
					<Box>
						<Row>
							<select
								onChange={(e) => {
									setMode(e.target.value as any);
								}}
								className="p-2"
							>
								{modes.map((m) => (
									<option key={m} value={m}>
										{m}
									</option>
								))}
							</select>
							<button
								onClick={() =>
									select({
										name: 'New',
									})
								}
							>
								Create New
							</button>
						</Row>
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

function ItemRow({
	item,
	mode,
}: {
	item: SuperHero;
	mode: 'xs' | 'sm' | 'md' | 'lg';
}) {
	return (
		<Row style={{ paddingRight: '1rem' }}>
			<Column>
				<Row>
					<Box>Name</Box>
					<Box>{item.name}</Box>
				</Row>
				<Row>
					<Box>Picture</Box>
					<Box>
						<img src={item.images ? item.images[mode] : ''} />
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
