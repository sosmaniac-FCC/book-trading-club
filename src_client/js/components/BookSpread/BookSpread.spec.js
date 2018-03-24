// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import BookSpread from './BookSpread.jsx';

test('Spread of book entries loads as expected.', () => {
    const component = shallow(<BookSpread />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Spread of book entries should have no style attributes.', () => {
    const component = shallow(<BookSpread />);
    expect(component.find('[style]')).toHaveLength(0);
});