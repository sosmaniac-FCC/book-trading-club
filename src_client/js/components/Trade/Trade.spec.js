// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import Trade from './Trade.jsx';

configure({ adapter: new enzymeAdapter() });

test('Trade menu loads as expected.', () => {
    const component = shallow(<Trade />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Trade menu should have no style attributes.', () => {
    const component = shallow(<Trade />);
    expect(component.find('[style]')).toHaveLength(0);
});