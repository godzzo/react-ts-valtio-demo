import {
	YodaContext,
	createYodaState,
	useYodaSnapshot,
	useYodaActions,
} from '../store/yoda-context';

export default function ValtioContext() {
	const ctx = createYodaState({ moba: false });

	return (
		<YodaContext.Provider value={ctx}>
			<Yoda />
		</YodaContext.Provider>
	);
}

function Yoda() {
	return (
		<>
			<Details />
			<ShowButton />
			<HideButton />
		</>
	);
}

function Details() {
	const { moba } = useYodaSnapshot();

	if (moba) {
		return <div>Moba is a Jedi Master by Yoda</div>;
	} else {
		return <div>I don't known Moba...</div>;
	}
}

function ShowButton() {
	const { setMoba } = useYodaActions();

	return <button onClick={() => setMoba(true)}> SHOW </button>;
}

function HideButton() {
	const { setMoba } = useYodaActions();

	return <button onClick={() => setMoba(false)}> HIDE </button>;
}
