import React from 'react';
import { Link } from 'react-router-dom';

import { v4 } from 'uuid';

const TableRender = (props) => (
    <table className="bordered highlight col s10 offset-s1">
        <thead>
            <tr>
                <th>Trader</th>
                <th>Date</th>
                <th>Offer</th>
                <th className="hide-on-small-only">For</th>
            </tr>
        </thead>
        <tbody>
        {
            props.trades.map((item) => (
                <tr key={v4()}>
                    <td><Link to={`/Trade/${item._id}`}>{item.senderId}</Link></td>
                    <td><Link to={`/Trade/${item._id}`}>{item.timeCreated}</Link></td>
                    <td><Link to={`/Trade/${item._id}`}>{item.bookOffer.offerTitle}</Link></td>
                    <td className="hide-on-small-only"><Link to={`/Trade/${item._id}`}>{item.bookQuarry.quarryTitle}</Link></td>
                </tr>
            ))
        }
        </tbody>
    </table>
);

export default TableRender;