// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import Copyright from './Copyright.jsx';

test('Copyright section below the router content loads as expected.', () => {
    const component = shallow(<Copyright />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Copyright section should have no style attributes.', () => {
    const component = shallow(<Copyright />);
    expect(component.find('[style]')).toHaveLength(0);
});