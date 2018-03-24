import React from 'react';

import { v4 } from 'uuid';

const RenderSpread = (props) => (
    <div>
    {
        props.items.map((item, i) => (
            <div className="col s6 m3 l2" onClick={props.handleSelect} key={v4()}>
                <div className="card hover-cursor" id={item.id}>
                    <div className="card-image">
                        <img src={item.volumeInfo.imageLinks.thumbnail} height="200"/>
                    </div>
                    <div className="card-content">
                        <div className="center row">
                            <p className="truncate">{item.volumeInfo.title}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
    </div>
);

export default RenderSpread;