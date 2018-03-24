import React from 'react';

import RenderSpread from './RenderSpread.jsx';

const Results = (props) => (
    <div className="container">
        <h6 className="flow-text">Which book are you referring to?</h6>
        <div className="row">
            <RenderSpread items={props.booksActive} handleSelect={props.handleSelect}/>
        </div>
        <div className="row center">
    	    <button className="waves-effect waves-light btn purple accent-1 add-button-padding" onClick={props.handleCancel}>CANCEL SEARCH</button>
    	</div>
    </div>
);

export default Results;