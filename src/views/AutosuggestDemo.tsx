import { AutosuggestInput } from '../components/AutosuggestInput';
import { Row, Box, Column } from '../components/Layout';

export default function AutosuggestDemo() {
	return (
		<Row>
			<Column>
				<Box>...</Box>

				<AutosuggestInput />
			</Column>
			<Column>
				<Box>Empty</Box>
				<div>Empty description ...</div>
			</Column>
		</Row>
	);
}
