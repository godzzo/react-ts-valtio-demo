import { Column } from '../components/Layout';
// import Select from 'react-select';

export default function SelectDemo() {
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];
	return <Column>{/* <Select options={options} /> */}</Column>;
}
