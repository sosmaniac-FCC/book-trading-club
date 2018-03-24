// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import CreateAccount from './CreateAccount.jsx';

test('Account creation page loads as expected.', () => {
    const component = shallow(<CreateAccount />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Account creation page should have no style attributes.', () => {
    const component = shallow(<CreateAccount />);
    expect(component.find('[style]')).toHaveLength(0);
});