import { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

type ReviewItem = {
	id: number;
	score: number;
	url: string;
	image: string;
	type: string;
	title: string;
};

export function HeadlessSelectDemo() {
	return (
		<div className="p-16 m-8">
			<HeadlessSelect />
		</div>
	);
}

export function HeadlessSelect() {
	const [selected, setSelected] = useState<ReviewItem | null>(null);
	const [result, setResult] = useState<ReviewItem[]>([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		console.log('query', query);

		if (query.trim().length > 0) {
			fetch(`/api/reviewFilter?title=${query}`)
				.then((res) => res.json())
				.then((data) => setResult(data.data));
		} else {
			setResult([]);
		}
	}, [query]);

	return (
		<Combobox
			value={selected}
			onChange={(value) => {
				console.log('SELECT', value);

				setSelected(value);
			}}
		>
			<div className="relative mt-1">
				<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
						displayValue={(person: ReviewItem) =>
							person?.title ?? ''
						}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</div>

				{result.length > 0 && <Result result={result} />}
			</div>
		</Combobox>
	);
}

function Result({ result }: { result: ReviewItem[] }) {
	return (
		<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
			{result.map((person) => (
				<Combobox.Option
					key={person.id}
					className={({ active }) =>
						`relative cursor-default select-none py-2 pl-10 pr-4 ${
							active ? 'bg-teal-600 text-white' : 'text-gray-900'
						}`
					}
					value={person}
				>
					{({ selected, active }) => (
						<>
							<span
								className={`block truncate ${
									selected ? 'font-medium' : 'font-normal'
								}`}
							>
								{person.title}
							</span>
							{selected ? (
								<span
									className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
										active ? 'text-white' : 'text-teal-600'
									}`}
								>
									<CheckIcon
										className="h-5 w-5"
										aria-hidden="true"
									/>
								</span>
							) : null}
						</>
					)}
				</Combobox.Option>
			))}
		</Combobox.Options>
	);
}
