// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import Main from './Main.jsx';

configure({ adapter: new enzymeAdapter() });

test('Main page (home route) content loads as expected.', () => {
    const component = shallow(<Main />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Main page (home route) content should have no style attributes.', () => {
    const component = shallow(<Main />);
    expect(component.find('[style]')).toHaveLength(0);
});