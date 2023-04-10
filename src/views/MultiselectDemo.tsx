import { Row, Box, Column } from '../components/Layout';
import MultiselectPopup from '../components/MultiselectPopup';

export default function MultiselectDemo() {
	return (
		<Row>
			<Column>
				<Box>...</Box>

				<MultiselectPopup />
			</Column>
			<Column>
				<Box>Empty</Box>
				<div>Empty description ...</div>
			</Column>
		</Row>
	);
}
