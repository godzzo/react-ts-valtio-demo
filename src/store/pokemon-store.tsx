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
		this.items = this.items.filter((e) => e.name !== pokemon.name);
	}

	select(pokemon: Pokemon) {
		this.current = pokemon;
	}
}

export const pokemonStore = proxy(new PokemonStore());
