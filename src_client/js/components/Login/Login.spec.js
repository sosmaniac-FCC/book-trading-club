// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import Login from './Login.jsx';

test('Login screen loads as expected.', () => {
    const component = shallow(<Login />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Login screen should have no style attributes.', () => {
    const component = shallow(<Login />);
    expect(component.find('[style]')).toHaveLength(0);
});