import React from 'react';

const Alert = (props) => (
    <div className="col s4 offset-s4">
        <div className="card purple lighten-4">
            <div className="card-content black-text">
                <p className="center">{props.message}</p>
            </div>
        </div>
    </div>
);

export default Alert;