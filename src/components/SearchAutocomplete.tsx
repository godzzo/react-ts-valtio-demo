import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { ReactSearchAutocompleteProps } from 'react-search-autocomplete/dist/components/ReactSearchAutocomplete';

type Item = {
	id: number;
	name: string;
};

type OnSearch = ReactSearchAutocompleteProps<Item>['onSearch'];
type OnHover = ReactSearchAutocompleteProps<Item>['onHover'];
type OnSelect = ReactSearchAutocompleteProps<Item>['onSelect'];

const items = [
	{
		id: 0,
		name: 'Cobol',
	},
	{
		id: 1,
		name: 'JavaScript',
	},
	{
		id: 2,
		name: 'Basic',
	},
	{
		id: 3,
		name: 'PHP',
	},
	{
		id: 4,
		name: 'Java',
	},
];

export function SearchAutocomplete() {
	const handleOnSearch: OnSearch = (string, results) => {
		// onSearch will have as the first callback parameter
		// the string searched and for the second the results.
		console.log(string, results);
	};

	const handleOnHover: OnHover = (result) => {
		// the item hovered
		console.log(result);
	};

	const handleOnSelect: OnSelect = (item) => {
		// the item selected
		console.log(item);
	};

	const handleOnFocus = () => {
		console.log('Focused');
	};

	const formatResult = (item: Item) => {
		return (
			<>
				<span style={{ display: 'block', textAlign: 'left' }}>
					id: {item.id}
				</span>
				<span style={{ display: 'block', textAlign: 'left' }}>
					name: {item.name}
				</span>
			</>
		);
	};

	return (
		<div className="App">
			<header className="App-header">
				<div style={{ width: 400 }}>
					<ReactSearchAutocomplete
						items={items}
						onSearch={handleOnSearch}
						onHover={handleOnHover}
						onSelect={handleOnSelect}
						onFocus={handleOnFocus}
						autoFocus
						formatResult={formatResult}
					/>
				</div>
			</header>
		</div>
	);
}
