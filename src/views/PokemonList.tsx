import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Box, Column, Row } from '../components/Layout';
import { Pokemon, pokemonStore } from '../store/pokemon-store';

export default function PokemonList() {
	// Working snapshot deconstruct - as state 😃
	const snap = useSnapshot(pokemonStore);
	const { items, current } = snap;

	return (
		<>
			<Row>
				<Column>
					{items.map((p) => (
						<PokemonRow key={p.name} p={p} />
					))}
				</Column>
				{current && (
					<Column>
						<Box>Current: {current.name}</Box>
						<PokemonForm pokemon={current}></PokemonForm>
					</Column>
				)}
			</Row>
		</>
	);
}

function PokemonRow({
	p,
}: {
	p: {
		readonly name: string;
		readonly url: string;
	};
}) {
	return (
		<Row>
			<Column>
				<Row>
					<Box>Name</Box>
					<Box>{p.name}</Box>
				</Row>
				<Row>
					<Box>Url</Box>
					<Box>
						<a href={p.url}>Link</a>
					</Box>
				</Row>
			</Column>
			<Column>
				<button onClick={() => pokemonStore.remove(p)}>Remove</button>
				<button onClick={() => pokemonStore.select(p)}>Edit</button>
			</Column>
		</Row>
	);
}

function PokemonForm({ pokemon }: { pokemon: Pokemon }) {
	const [name, setName] = useState(pokemon.name);
	const [url, setUrl] = useState(pokemon.url);

	console.log('Current pokemon - changed', pokemon);

	useEffect(() => {
		setName(pokemon.name);
		setUrl(pokemon.url);
	}, [pokemon]);

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
				<Box>Url</Box>
				<Box>
					<input
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</Box>
			</Row>
			<Row>
				<Box>
					<button onClick={() => pokemonStore.update({ name, url })}>
						Save
					</button>
				</Box>
			</Row>
		</Column>
	);
}
