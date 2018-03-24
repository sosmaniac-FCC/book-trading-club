// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import App from './App.jsx';

test('Top-level application layout loads as expected.', () => {
    const component = shallow(<App />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Top-level application layout should have no style attributes.', () => {
    const component = shallow(<App />);
    expect(component.find('[style]')).toHaveLength(0);
});