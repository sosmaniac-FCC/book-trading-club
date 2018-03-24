import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUserInformation } from '../../reducers/userReducer/userActions.jsx';

/* global $ */

class EmailBody extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillUnmount() {
        this.validator.destroy();
    }
    
    componentDidMount() {
        $.validator.setDefaults({
            errorClass: 'invalid', // false
            validClass: "valid", // true
            errorPlacement: (error, element) => {
                $(element).closest("form").find("label[for='" + element.attr("id") + "']").attr("data-error", error.text());
            },
            submitHandler: (form) => {
                const elements = form.getElementsByTagName("input");
                let inputs = {};
        
                for (let i = 0; i < elements.length; i++) {
                    inputs[elements[i].id] = elements[i].value;
                }
                
                // form validation
                if (inputs.newEmail && inputs.newEmail != "") {
                    $("#modalChange").modal("close");
                    
                    this.props.updateUserInformation(this.props.username, 'email', inputs);
                }
            }
        });
        
        this.validator = $("#custom-form").validate({
            rules: {
                newEmail: {
                    required: true,
                    email: true
                }
            },
            messages: {
                newEmail: "Field must contain a valid email address"
            }
        });
    }
    
    render() {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <input type="email" name="newEmail" id="newEmail" className="validate"/>
                    <label htmlFor="newEmail">New Email</label>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        username: users.username
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUserInformation
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailBody);