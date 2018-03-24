import React from 'react';

const RenderFloat = (props) => (
    <section className="box-suspend">
        <div className="center row">
            <h6 className="col s12">{props.bookTitle}</h6>
            <hr/>
            <h6 className="col s12">{props.username === props.bookOwnerId ? "OWNED" : "OWNER: " + props.bookOwnerId}</h6>
        </div>
    </section>
);

export default RenderFloat;