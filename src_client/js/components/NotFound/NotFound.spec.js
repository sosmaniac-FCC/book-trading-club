// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import NotFound from './NotFound.jsx';

configure({ adapter: new enzymeAdapter() });

test('An invalid route loads a page indicating a status of 404 as expected.', () => {
    const component = shallow(<NotFound />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Status of 404 screen should have no style attributes.', () => {
    const component = shallow(<NotFound />);
    expect(component.find('[style]')).toHaveLength(0);
});