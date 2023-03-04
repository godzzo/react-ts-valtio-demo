import { createContext, useContext } from 'react';
import { proxy, useSnapshot } from 'valtio';

export type YodaStateType = ReturnType<typeof createState>;

export const YodaContext = createContext<{
	state: YodaStateType;
	actions: ReturnType<typeof createActions>;
}>(null as any);

export function useYodaSnapshot() {
	return useSnapshot(useYodaContext().state);
}

export function useYodaContext() {
	return useContext(YodaContext);
}

export function useYodaActions() {
	return useYodaContext().actions;
}

export function createYodaState(parms: { moba: boolean }) {
	console.log('>>>>> CALLED createYodaState', parms);
	const state = createState(parms);
	const actions = createActions(state);

	return { state, actions };
}

function createState({ moba }: { moba: boolean }) {
	return proxy({ moba });
}

function createActions(state: YodaStateType) {
	return {
		setMoba(val: boolean) {
			state.moba = val;
		},
	};
}
