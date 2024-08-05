// myredux/hooks.ts

import { TypedUseSelectorHook, useDispatch as useDispatchBase, useSelector as useSelectorBase } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useDispatch: () => AppDispatch = useDispatchBase;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
