// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import Navigation from './Navigation.jsx';

test('Navigation section above the router content loads as expected.', () => {
    const component = shallow(<Navigation />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Navigation section above the router content should have no style attributes.', () => {
    const component = shallow(<Navigation />);
    expect(component.find('[style]')).toHaveLength(0);
});