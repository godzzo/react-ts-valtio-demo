import * as React from 'react';

import { useSnapshot } from 'valtio';
import { Box, Column, Row } from '../components/Layout';
import { pokemonStore } from '../store/pokemon-store';

export default function PokemonList() {
  const { items } = useSnapshot(pokemonStore);

  return (
    <Column>
      {items.map((p) => (
        <Column key={p.name}>
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
      ))}
    </Column>
  );
}
