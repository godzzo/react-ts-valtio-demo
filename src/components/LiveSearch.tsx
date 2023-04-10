import {
	KeyboardEventHandler,
	RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

/**
 * Search Bar With Drop-down Using React JS - UP | DOWN | ENTER Key
 *
 * https://www.youtube.com/watch?v=Ny5rkEKhaxc
 * https://github.com/ndpniraj/live-search-react
 */

interface Props<T> {
	results?: T[];
	className: string;
	renderItem(item: T): JSX.Element;
	onChange?: React.ChangeEventHandler;
	onSelect?: (item: T) => void;
	value?: string;
	placeholder?: string;
}

export const LiveSearch = <T extends object>({
	results = [],
	className,
	renderItem,
	value,
	onChange,
	onSelect,
	placeholder,
}: Props<T>): JSX.Element => {
	const {
		focusedIndex,
		setFocusedIndex,
		showResults,
		defaultValue,
		setDefaultValue,
		resultContainer,
		resetSearchComplete,
		handleSelection,
	} = useLiveSearch<T>(results, value, onSelect);

	placeholder = placeholder ?? 'Search your query...';

	return (
		<div
			tabIndex={1}
			onBlur={resetSearchComplete}
			onKeyDown={handleKeyDown(
				focusedIndex,
				results,
				resetSearchComplete,
				handleSelection,
				setFocusedIndex
			)}
			className="relative"
		>
			<input
				value={defaultValue}
				onChange={(e) => {
					setDefaultValue(e.target.value);
					onChange && onChange(e);
				}}
				type="text"
				className={className}
				placeholder={placeholder}
			/>

			{showResults && (
				<PopupList
					results={results}
					handleSelection={handleSelection}
					resultContainer={resultContainer}
					renderItem={renderItem}
					focusedIndex={focusedIndex}
				/>
			)}
		</div>
	);
};

function PopupList<T>({
	results,
	handleSelection,
	resultContainer,
	renderItem,
	focusedIndex,
}: {
	results: T[];
	handleSelection: (selectedIndex: number) => void;
	resultContainer: RefObject<HTMLDivElement>;
	renderItem(item: T): JSX.Element;
	focusedIndex: number;
}) {
	return (
		<div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
			{results.map((item, index) => {
				return (
					<div
						key={index}
						onMouseDown={() => handleSelection(index)}
						ref={index === focusedIndex ? resultContainer : null}
						style={{
							backgroundColor:
								index === focusedIndex ? 'rgba(0,0,0,0.1)' : '',
						}}
						className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
					>
						{renderItem(item)}
					</div>
				);
			})}
		</div>
	);
}

function useLiveSearch<T>(
	results: T[],
	value?: string,
	onSelect?: (item: T) => void
) {
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [showResults, setShowResults] = useState(false);
	const [defaultValue, setDefaultValue] = useState('');

	const resultContainer = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!resultContainer.current) return;

		resultContainer.current.scrollIntoView({
			block: 'center',
		});
	}, [focusedIndex]);

	useEffect(() => {
		if (results.length > 0 && !showResults) setShowResults(true);

		if (results.length <= 0) setShowResults(false);
	}, [results]);

	useEffect(() => {
		if (value) setDefaultValue(value);
	}, [value]);

	const resetSearchComplete = useCallback(() => {
		setFocusedIndex(-1);
		setShowResults(false);
	}, []);

	const handleSelection = (selectedIndex: number) => {
		const selectedItem = results[selectedIndex];
		if (!selectedItem) return resetSearchComplete();
		onSelect && onSelect(selectedItem);
		resetSearchComplete();
	};

	return {
		focusedIndex,
		setFocusedIndex,
		showResults,
		setShowResults,
		defaultValue,
		setDefaultValue,
		resultContainer,
		resetSearchComplete,
		handleSelection,
	};
}

function handleKeyDown<T>(
	focusedIndex: number,
	results: T[],
	resetSearchComplete: () => void,
	handleSelection: (value: number) => void,
	setFocusedIndex: (value: number) => void
) {
	return ((e) => {
		const { key } = e;
		let nextIndexCount = 0;

		// move down
		if (key === 'ArrowDown')
			nextIndexCount = (focusedIndex + 1) % results.length;

		// move up
		if (key === 'ArrowUp')
			nextIndexCount =
				(focusedIndex + results.length - 1) % results.length;

		// hide search results
		if (key === 'Escape') {
			resetSearchComplete();
		}

		// select the current item
		if (key === 'Enter') {
			e.preventDefault();
			handleSelection(focusedIndex);
		}

		setFocusedIndex(nextIndexCount);
	}) as KeyboardEventHandler<HTMLDivElement>;
}
