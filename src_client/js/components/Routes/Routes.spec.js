// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import Routes from './Routes.jsx';

configure({ adapter: new enzymeAdapter() });

test('Switch component container holding all applicable routes loads as expected.', () => {
    const component = shallow(<Routes />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Switch component container holding all applicable routes should have no style attributes.', () => {
    const component = shallow(<Routes />);
    expect(component.find('[style]')).toHaveLength(0);
});