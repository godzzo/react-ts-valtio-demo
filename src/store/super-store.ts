import { proxy } from 'valtio';
import { superheroes } from './superheroes';

const items = superheroes;
const firstHero = items[0];
export type SuperHero = typeof firstHero;

export const superState = proxy({
	current: null as SuperHero | null,
	items: superheroes,

	add(hero: SuperHero) {
		superState.items.push(hero);
	},

	remove(hero: SuperHero) {
		superState.items.splice(
			superState.items.findIndex((e) => e.id === hero.id),
			1
		);

		// superState.items = superState.items.filter((e) => e.url !== SuperHero.url);

		superState.current = null;
	},

	select(hero: Partial<SuperHero>) {
		superState.current = hero as SuperHero;
	},

	update(hero: SuperHero) {
		let found = false;

		superState.items.forEach((e) => {
			if (e.id === hero.id) {
				e.name = hero.name;

				found = true;
			}
		});

		if (!found) {
			hero.id = superState.items.length + 1;

			superState.items.push(hero);
		}

		superState.current = null;
	},
});
