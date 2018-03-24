import React from 'react';

const Alert = (props) => (
    <div className="col s10 m6 l4 offset-s1 offset-m3 offset-l4">
        <div className="card purple lighten-4">
            <div className="card-content black-text">
                <p className="center">{props.message}</p>
            </div>
        </div>
    </div>
);

export default Alert;