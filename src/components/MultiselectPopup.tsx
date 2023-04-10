import Multiselect from 'multiselect-react-dropdown';
import styles from './MultiselectPopup.module.scss';
import { useState } from 'react';

export default function MultiselectPopup() {
	const [options_, setOptions] = useState<String[]>([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = (value: string) => {
		setLoading(true);

		const results = value
			? data.filter((w) => w.toLowerCase().includes(value))
			: [];

		setTimeout(
			(r: string[]) => {
				setOptions(r);
				setLoading(false);
			},
			400,
			results
		);
	};

	return (
		<Multiselect
			options={options_}
			onSearch={handleSearch}
			loading={loading}
			isObject={false}
			className={styles.container}
		/>
	);
}

const range = (size: number): Array<number> =>
	Array.from(new Array(size + 1).keys()).slice(1);

const words = ['Car', 'Bike', 'E-Bike', 'Bus', 'Tram', 'Truck'];
const randInt = (max: number) => () => Math.floor(Math.random() * max);
const nextIndex = randInt(words.length);
const nextWord = () => words[nextIndex()];
const data = range(100).map((i) => `${nextWord()} ${i}`);
