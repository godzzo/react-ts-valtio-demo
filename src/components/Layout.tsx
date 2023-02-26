import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';

export function Row({
	style,
	children,
}: {
	style?: CSSProperties;
	children?: ReactNode;
}) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '0.3rem',
				...(style && style),
			}}
		>
			{children}
		</div>
	);
}

export function Column({
	style,
	children,
}: {
	style?: CSSProperties;
	children?: ReactNode;
}) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.3rem',
				...(style && style),
			}}
		>
			{children}
		</div>
	);
}

export function Box({
	style,
	children,
	border = true,
}: {
	style?: CSSProperties;
	children?: ReactNode;
	border?: boolean;
}) {
	if (border) {
		style = {
			border: '2px solid black',
			...(style && style),
		};
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.3rem',
				padding: '0.3rem',
				...(style && style),
			}}
		>
			{children}
		</div>
	);
}

export function PropTable({
	items,
}: {
	items: { name: string; value: any }[];
}) {
	return (
		<Column>
			{items.map((e) => (
				<Row key={e.name}>
					<Box>{e.name}</Box>
					<Box>{e.value}</Box>
				</Row>
			))}
		</Column>
	);
}
