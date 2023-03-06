import { Row, Box, Column } from '../components/Layout';
import SassInput from '../components/SassInput';

export default function SassDemo() {
	return (
		<Row>
			<Column>
				<Box>
					With generated class by SCSS: <pre>_container_z1e0i_1</pre>
				</Box>
				<SassInput />
			</Column>
			<Column>
				<Box>Simple Box</Box>
				<div>
					Other Div with Input ...
					<input type="text" defaultValue={'Hello World 😃'} />
				</div>
			</Column>
		</Row>
	);
}
