// $ from html cdn
/* global $ */

import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './components/App/App.jsx';

import books from './reducers/bookReducer/bookReducer.jsx';
import tabs from './reducers/tabReducer/tabReducer.jsx';
import trades from './reducers/tradeReducer/tradeReducer.jsx';
import users from './reducers/userReducer/userReducer.jsx';

const reducers = combineReducers({
    books,
    tabs,
    trades,
    users
});

const store = createStore(reducers, applyMiddleware(thunk, logger));

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('app')
);