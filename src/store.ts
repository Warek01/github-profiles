import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import themeSlice from './features/theme';

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
	theme: themeSlice
});

const store = createStore(
	rootReducer,
	/* preloadedState, */ devToolsEnhancer({})
);

export default store;
