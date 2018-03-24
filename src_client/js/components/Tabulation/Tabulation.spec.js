// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import { createStore } from 'redux';

import Tabulation from './Tabulation.jsx';

configure({ adapter: new enzymeAdapter() });

test('Dynamic tab content loads as expected.', () => {
    const store = createStore(() => ({
        books: {},
        tabs: {},
        trades: {},
        users: {}
    }));
    
    const component = shallow(<Tabulation store={store} />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Dynamic tab content should have no style attributes.', () => {
    const store = createStore(() => ({
        books: {},
        tabs: {},
        trades: {},
        users: {}
    }));
    
    const component = shallow(<Tabulation store={store} />);
    expect(component.find('[style]')).toHaveLength(0);
});