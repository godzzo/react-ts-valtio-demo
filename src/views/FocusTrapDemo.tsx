import FocusTrap from 'focus-trap-react';
import { forwardRef, ReactNode, useState } from 'react';
import { Box, Column, Row } from '../components/Layout';

const data = [
	{
		firstName: 'Jhon',
		lastName: 'Doe',
		age: 42,
		email: 'john.doe@gmail.com',
	},
	{
		firstName: 'Eva',
		lastName: 'SPice',
		age: 33,
		email: 'eva.spice@gmail.com',
	},
	{
		firstName: 'Cole',
		lastName: 'Brute',
		age: 31,
		email: 'cole.brute@gmail.com',
	},
];

const style = {
	button: (color = 'blueviolet') => ({
		backgroundColor: color,
		borderRadius: '10px',
		color: 'white',
		padding: '0.6rem',
	}),
};

export function FocusTrapDemo() {
	const [focusIdx, setFocusIdx] = useState(-1);
	const [show, setShow] = useState(false);

	return (
		<Column>
			<Row>
				<button style={style.button()} onClick={() => setFocusIdx(0)}>
					First
				</button>
				<button style={style.button()} onClick={() => setFocusIdx(1)}>
					Second
				</button>
				<button style={style.button()} onClick={() => setFocusIdx(2)}>
					Third
				</button>
				<button
					style={style.button('orange')}
					onClick={() => {
						setShow(!show);
					}}
				>
					Show
				</button>
			</Row>
			<Row>
				{data.map((item, idx) => {
					const enable = idx === focusIdx;

					console.log(`${idx}. enable`, enable);

					return (
						<ToggleTrap key={idx} enable={enable} idx={idx}>
							<Form data={item} idx={idx} />
						</ToggleTrap>
					);
				})}
				{show && (
					<FocusTrap
						focusTrapOptions={{
							initialFocus: '#age_3',
						}}
					>
						<Form data={data[1]} idx={3} />
					</FocusTrap>
				)}
			</Row>
		</Column>
	);
}

function ToggleTrap({
	enable,
	idx,
	children,
}: {
	enable: boolean;
	idx: number;
	children: ReactNode;
}) {
	if (enable) {
		return (
			<FocusTrap
				focusTrapOptions={{
					initialFocus: `#age_${idx}`,
				}}
			>
				{children}
			</FocusTrap>
		);
	} else {
		return <>{children}</>;
	}
}

const Form = forwardRef<
	HTMLDivElement,
	{ data: { [key: string]: string | number }; idx: number }
>(({ data, idx }, ref) => {
	return (
		<div ref={ref}>
			<Column>
				<Box>Form ... </Box>
				<InputText name="firstName" data={data} idx={idx} />
				<InputText name="lastName" data={data} idx={idx} />
				<InputText name="age" data={data} idx={idx} />
				<InputText name="email" data={data} idx={idx} />
			</Column>
		</div>
	);
});

function InputText({
	name,
	data,
	idx,
}: {
	name: string;
	data: { [key: string]: string | number };
	idx: number;
}) {
	return (
		<Row>
			<label>{name}</label>
			<input
				type="text"
				id={`${name}_${idx}`}
				defaultValue={data[name]}
			/>
		</Row>
	);
}
