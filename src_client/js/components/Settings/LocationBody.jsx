import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUserInformation } from '../../reducers/userReducer/userActions.jsx';

/* global $ */

class LocationBody extends React.Component {
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
                if (inputs.newCity && inputs.newState && inputs.newCity != "" && inputs.newState != "") {
                    $("#modalChange").modal("close");
                    
                    this.props.updateUserInformation(this.props.username, 'location', inputs);
                }
            }
        });
        
        this.validator = $("#custom-form").validate({
            rules: {
                newCity: {
                    required: true
                },
                newState: {
                    required: true
                }
            },
            messages: {
                newCity: "Field is required",
                newState: "Field is required"
            }
        });
    }
    
    render() {
        return (
            <div className="row">
                <div className="input-field col s12 m6">
                    <input type="text" name="newCity" id="newCity" className="validate"/>
                    <label htmlFor="newCity">New City</label>
                </div>
                <div className="input-field col s12 m6">
                    <input type="text" name="newState" id="newState" className="validate"/>
                    <label htmlFor="newState">New State/Province</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationBody);