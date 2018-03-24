// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import MyBooks from './MyBooks.jsx';

test('Personal book entries loads as expected.', () => {
    const component = shallow(<MyBooks />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Personal book entries should have no style attributes.', () => {
    const component = shallow(<MyBooks />);
    expect(component.find('[style]')).toHaveLength(0);
});