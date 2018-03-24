// expect from jest_expect.js
/* global expect */

import React from 'react';
import { shallow, configure } from 'enzyme';
import enzymeAdapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';

configure({ adapter: new enzymeAdapter() });

const mock = new mockAdapter(axios);

// DEPRECATED TEST CASE
// mock.onGet('/book?title=abundance').reply(200, [
//     {
//         "volumeInfo": {
//             "title": "Abundance"
//         }
//     },
//     {
//         "volumeInfo": {
//             "title": "Abundant Crops"
//         }
//     }
// ]);
// test('should yield the expected book title on api call', () => {
//     return axios.get('/book?title=abundance')
//     .then((result) => {
//         expect(result.data[0].volumeInfo.title).toEqual('Abundance');
//     });
// });