import * as React from 'react';

import { useSnapshot } from 'valtio';
import { Box, Column, Row } from '../components/Layout';
import { pokemonStore } from '../store/pokemon-store';

export default function PokemonList() {
	// Working snapshot deconstruct - as state 😃
	const { items } = useSnapshot(pokemonStore);

	return (
		<Column>
			{items.map((p) => (
				<Row key={p.name}>
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
						<button onClick={() => pokemonStore.remove(p)}>
							Remove
						</button>
					</Column>
				</Row>
			))}
		</Column>
	);
}
