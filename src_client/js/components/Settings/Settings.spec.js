// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import Profile from './Profile.jsx';

test('Personal profile page loads as expected.', () => {
    const component = shallow(<Profile />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Personal profile page should have no style attributes.', () => {
    const component = shallow(<Profile />);
    expect(component.find('[style]')).toHaveLength(0);
});