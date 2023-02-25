import { proxy } from 'valtio';
import { pokemons } from './pokemons';

type Pokemon = {
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
			this.items.findIndex((e) => e.name === pokemon.name),
			1
		);

		// this.items = this.items.filter((e) => e.name !== pokemon.name);
	}

	select(pokemon: Pokemon) {
		this.current = pokemon;
	}

	update(pokemon: Pokemon) {
		this.items.forEach((e) => {
			if (e.name === pokemon.name) {
				e = pokemon;
			}
		});
	}
}

export const pokemonStore = proxy(new PokemonStore());
