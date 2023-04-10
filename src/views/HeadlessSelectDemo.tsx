import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const people = [
	{ id: 1, name: 'Wade Cooper' },
	{ id: 2, name: 'Arlene Mccoy' },
	{ id: 3, name: 'Devon Webb' },
	{ id: 4, name: 'Tom Cook' },
	{ id: 5, name: 'Tanya Fox' },
	{ id: 6, name: 'Hellen Schmidt' },
];

type Person = (typeof people)[0];

export function HeadlessSelectDemo() {
	return (
		<div className="p-16 m-8">
			<HeadlessSelect />
		</div>
	);
}

export function HeadlessSelect() {
	const [selected, setSelected] = useState(people[0]);
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? []
			: people.filter((person) =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<Combobox value={selected} onChange={setSelected}>
			<div className="relative mt-1">
				<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
						displayValue={(person: Person) => person.name}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</div>

				{filteredPeople.length > 0 && (
					<Result result={filteredPeople} />
				)}
			</div>
		</Combobox>
	);
}

function Result({ result }: { result: Person[] }) {
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
								{person.name}
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
