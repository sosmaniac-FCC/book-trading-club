// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import Trades from './Trades.jsx';

configure({ adapter: new enzymeAdapter() });

test('Trades both in and out loads as expected.', () => {
    const component = shallow(<Trades />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Trades both in and out should have no style attributes.', () => {
    const component = shallow(<Trades />);
    expect(component.find('[style]')).toHaveLength(0);
});