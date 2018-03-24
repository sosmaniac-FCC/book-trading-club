// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import NewTrade from './NewTrade.jsx';

configure({ adapter: new enzymeAdapter() });

test('Trade creation menu loads as expected.', () => {
    const component = shallow(<NewTrade />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Trade creation menu should have no style attributes.', () => {
    const component = shallow(<NewTrade />);
    expect(component.find('[style]')).toHaveLength(0);
});