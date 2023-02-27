import { createElement, CSSProperties, ReactNode } from 'react';
import { Column, Row } from '../components/Layout';

export default function DynamicComponentDemo() {
	return (
		<Column>
			<DynamicComponent
				el="span"
				id="my-span"
				attributes={{ name: 'Wulfgarr', 'data-type': 'NORMAL' }}
				style={{ color: 'red' }}
			>
				<div>Hello from DynamicComponent 💬</div>
				<div>How are You ❔</div>
			</DynamicComponent>
		</Column>
	);
}
export function DynamicComponent({
	el,
	id,
	style,
	attributes,
	children,
}: {
	el: string;
	id?: string;
	style?: CSSProperties;
	attributes?: { [key: string]: string };
	children?: ReactNode;
}) {
	const props: { [key: string]: any } = { ...(attributes && attributes) };

	if (id) {
		props['id'] = id;
	}

	if (style) {
		props['style'] = style;
	}

	return createElement(el, props, children);
}
