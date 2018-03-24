import React from 'react';

const RenderBody = (props) => (
    <div className="col s6 m3 l1">
        <div className="card hover-cursor">
            <div className="card-image">
                <img src={props.bookImgUrl}/>
            </div>
            <div className="card-content hide-on-large-only">
                <div className="center row">
                    <h6 className="col s12 truncate">{props.bookTitle}</h6>
                    <hr/>
                    <h6 className="col s12 truncate">{props.username === props.bookOwnerId ? "OWNED" : "OWNER: " + props.bookOwnerId}</h6>
                </div>
            </div>
        </div>
    </div>
);

export default RenderBody;

// stripped property from img
// height="100"