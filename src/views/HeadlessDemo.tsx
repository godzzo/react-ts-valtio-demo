import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import {
	CheckIcon,
	ChevronUpDownIcon,
	XCircleIcon,
} from '@heroicons/react/20/solid';
import { Box, Column } from '../components/Layout';

const people = [
	{ id: 1, name: 'Wade Cooper' },
	{ id: 2, name: 'Arlene Mccoy' },
	{ id: 3, name: 'Devon Webb' },
	{ id: 4, name: 'Tom Cook' },
	{ id: 5, name: 'Tanya Fox' },
	{ id: 6, name: 'Hellen Schmidt' },
];

type Person = (typeof people)[0];

export default function HeadlessDemo() {
	return (
		<Column>
			<Box border={true}>
				<SimpleWithDesign />
			</Box>
			<Box border={true}>
				<MultiPlain />
			</Box>
		</Column>
	);
}

function MultiPlain() {
	const [selectedPeople, setSelectedPeople] = useState([
		people[0],
		people[1],
	]);

	return (
		<Combobox
			value={selectedPeople}
			onChange={setSelectedPeople as any}
			multiple
		>
			{selectedPeople.length > 0 && (
				<ul>
					{selectedPeople.map((person) => (
						<li key={person.id}>{person.name}</li>
					))}
				</ul>
			)}
			<Combobox.Input />
			<Combobox.Options>
				{people.map((person) => (
					<Combobox.Option key={person.id} value={person}>
						{person.name}
					</Combobox.Option>
				))}
			</Combobox.Options>
		</Combobox>
	);
}

export function SimpleWithDesign() {
	const [selected, setSelected] = useState<any[]>([people[0], people[1]]);
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? people
			: people.filter((person) =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className="w-1/2">
			<Combobox value={selected} onChange={setSelected} multiple>
				<div className="relative mt-1">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<div className="flex flex-wrap">
							{selected.map((person) => (
								<div key={person.id} className="p-1">
									{person.name}
									<XCircleIcon
										className="inline h-5 w-5 text-red-400"
										aria-hidden="true"
									/>
								</div>
							))}
							<Combobox.Input
								className="border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:bg-blue-50"
								displayValue={(person: Person) => person.name}
								onChange={(event) =>
									setQuery(event.target.value)
								}
							/>
						</div>

						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredPeople.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredPeople.map((person) => (
									<Combobox.Option
										key={person.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active
													? 'bg-teal-600 text-white'
													: 'text-gray-900'
											}`
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected
															? 'font-medium'
															: 'font-normal'
													}`}
												>
													{person.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active
																? 'text-white'
																: 'text-teal-600'
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
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}
