import React from 'react';

import EmailBody from './EmailBody.jsx';
import LocationBody from './LocationBody.jsx';
import PasswordBody from './PasswordBody.jsx';

const DynamicForm = (props) => (
    <form id="custom-form" onSubmit={props.handleConfirm}>
    {
        ((id) => {
            switch (id) {
                case 0: {
                    // email
                    return (
                        <EmailBody handleConfirm={props.handleConfirm}/>
                    );
                }
                case 1: {
                    // location
                    return (
                        <LocationBody handleConfirm={props.handleConfirm}/>
                    );
                }
                case 2: {
                    // password
                    return (
                        <PasswordBody handleConfirm={props.handleConfirm}/>
                    );
                }
                default: {
                    // initialize
                    return null;
                }
            }
        })(props.qId)
    }
    </form>
);

export default DynamicForm;