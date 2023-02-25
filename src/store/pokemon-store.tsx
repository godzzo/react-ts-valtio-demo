import { proxy } from 'valtio';
import { pokemons } from './pokemons';

export type Pokemon = {
	name: string;
	url: string;
};

class PokemonStore {
	items: Pokemon[] = pokemons;
	current: Pokemon | null = null;

	add(pokemon: Pokemon) {
		this.items.push(pokemon);
	}

	remove(pokemon: Pokemon) {
		this.items.splice(
			this.items.findIndex((e) => e.url === pokemon.url),
			1
		);

		// this.items = this.items.filter((e) => e.url !== pokemon.url);

		this.current = null;
	}

	select(pokemon: Pokemon) {
		this.current = pokemon;
	}

	update(pokemon: Pokemon) {
		this.items.forEach((e) => {
			if (e.url === pokemon.url) {
				e.name = pokemon.name;
			}
		});

		this.current = null;
	}
}

export const pokemonStore = proxy(new PokemonStore());
