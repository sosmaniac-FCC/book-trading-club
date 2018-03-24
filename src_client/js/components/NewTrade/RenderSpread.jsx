import React from 'react';

import { v4 } from 'uuid';

import RenderBody from './RenderBody.jsx';

const RenderSpread = (props) => (
    <div>
    {
        props.items.map((item) => (
            <div key={v4()}>
                <RenderBody flag={props.flag} item={item}/>
            </div>
        ))
    }
    </div>
);

export default RenderSpread;