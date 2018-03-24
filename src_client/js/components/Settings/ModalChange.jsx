import React from 'react';

import DynamicForm from './DynamicForm.jsx';

const ModalChange = (props) => (
    <div id="modalChange" className="modal">
        <div className="modal-content">
            <DynamicForm qId={props.qId} handleConfirm={props.handleConfirm}/>
        </div>
        <div className="modal-footer">
            <input className="modal-action waves-effect waves-green btn-flat" id="custom-form-submit" form="custom-form" type="submit" value="Confirm"/>
            <button className="modal-action modal-close waves-effect waves-green btn-flat" type="button">Cancel</button>
        </div>
    </div>
);

export default ModalChange;