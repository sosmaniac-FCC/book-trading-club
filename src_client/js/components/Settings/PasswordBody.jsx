import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUserInformation } from '../../reducers/userReducer/userActions.jsx';

/* global $ */

class PasswordBody extends React.Component {
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
                
                $("#modalChange").modal("close");
                
                this.props.updateUserInformation(this.props.username, 'password', inputs);
            }
        });
        
        this.validator = $("#custom-form").validate({
            rules: {
                oldPassword: {
                    required: true
                },
                newPassword: {
                    required: true
                },
                confirmNew: {
                    required: true,
                    equalTo: "#newPassword"
                }
            },
            messages: {
                oldPassword: "Field is required",
                newPassword: "Field is required",
                confirmNew: "New passwords must match"
            }
        });
    }
    
    render() {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <input type="password" name="oldPassword" id="oldPassword" className="validate"/>
        			<label htmlFor="oldPassword">Old Password</label>
                </div>
                <div className="input-field col s12 m6">
                    <input type="password" name="newPassword" id="newPassword" className="validate"/>
        			<label htmlFor="newPassword">New Password</label>
                </div>
                <div className="input-field col s12 m6">
                    <input type="password" name="confirmNew" id="confirmNew" className="validate"/>
        			<label htmlFor="confirmNew">Confirm New Password</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordBody);