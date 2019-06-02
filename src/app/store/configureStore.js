import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

export const rootReducer = combineReducers(
    {
        routing: routerReducer,
    }
);

const components = process.env.NODE_ENV === 'production' ?
    applyMiddleware(
        thunk
    ) :
    composeWithDevTools(
        applyMiddleware(
            thunk
        )
    );

const store =  createStore(rootReducer, components);

export default store;