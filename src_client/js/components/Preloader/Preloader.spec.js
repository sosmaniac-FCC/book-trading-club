// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

configure({ adapter: new enzymeAdapter() });

import Preloader from './Preloader.jsx';

test('Modularized preloader loads as expected.', () => {
    const component = shallow(<Preloader />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
});

test('Modularized preloader should have no style attributes.', () => {
    const component = shallow(<Preloader />);
    expect(component.find('[style]')).toHaveLength(0);
});