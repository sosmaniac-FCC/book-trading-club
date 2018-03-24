import React from 'react';

const RenderBody = (props) => (
    <div className="col s6 m4 l2">
        <div className="card hover-cursor">
            <div className="card-image">
                <img src={props.item.bookImgUrl}/>
            </div>
            <div className="card-content">
                <div className="row center">
                    <input type="radio" name={`item-${props.flag}`} id={props.item.bookId} className="with-gap" required/>
                    <label htmlFor={props.item.bookId} data-error="Please select at least one option"></label>
                </div>
            </div>
        </div>
    </div>
);

export default RenderBody;