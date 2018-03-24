import React from 'react';

import { v4 } from 'uuid';

const RenderSpread = (props) => (
    <div>
    {
        props.items.map((item, i) => (
            <div className="col s12 m4 l3" key={v4()}>
                <div className="card hover-cursor">
                    <div className="card-image">
                        <img src={item.bookImgUrl}/>
                        <span className="card-title" id={item.bookId} onClick={props.handleDelete}><i className="material-icons">delete</i></span>
                    </div>
                    <div className="card-content">
                        <div className="center row">
                            <p className="truncate">{item.bookTitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
    </div>
);

export default RenderSpread;