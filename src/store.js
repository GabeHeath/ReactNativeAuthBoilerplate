import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import { dataReducer } from './reducers/data';
import { servicesReducer } from './reducers/services';
import * as persistActionCreators from './actions/persist';

const appReducer = combineReducers({
    services: servicesReducer,
    data: dataReducer
});

const enhancer = compose(
    applyMiddleware(
        thunk,
    ),
    devTools()
);

const store = createStore(
    appReducer,
    enhancer,
    autoRehydrate(),
);

const saveAndLoadSessionFilter = createFilter(
    'services',
    ['session'],
    ['session']
);

export const persist = persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['data'],
    transforms: [saveAndLoadSessionFilter],
}, () => store.dispatch(persistActionCreators.update({ isHydrated: true })));

export default store;