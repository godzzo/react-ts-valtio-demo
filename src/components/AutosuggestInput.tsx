import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
	{
		name: 'C',
		year: 1972,
	},
	{
		name: 'Elm',
		year: 2012,
	},
	{
		name: 'Java',
		year: 1995,
	},
	{
		name: 'Kotlin',
		year: 2011,
	},
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value: string) => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	console.log('getSuggestions', value);

	return inputLength === 0
		? []
		: languages.filter(
				(lang) =>
					lang.name.toLowerCase().slice(0, inputLength) === inputValue
		  );
};

type Suggestion = (typeof languages)[0];

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: Suggestion) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: Suggestion) => {
	console.log('renderSuggestion', suggestion);

	return <div>{suggestion.name}</div>;
};

export function AutosuggestInput() {
	const [value, setValue] = useState('');
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

	const onChange = (event: any, { newValue }: any) => {
		setValue(newValue);
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	const onSuggestionsFetchRequested = ({ value }: any) => {
		setSuggestions(getSuggestions(value));
	};

	// Finally, render it!
	return (
		<Autosuggest
			suggestions={suggestions}
			onSuggestionsFetchRequested={onSuggestionsFetchRequested}
			onSuggestionsClearRequested={() => setSuggestions([])}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			inputProps={{
				placeholder: 'Type a programming language',
				value,
				onChange: onChange,
			}}
		/>
	);
}
