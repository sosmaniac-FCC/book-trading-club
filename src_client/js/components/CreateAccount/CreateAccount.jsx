import React from 'react';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clearReason, registerNewUser } from '../../reducers/userReducer/userActions.jsx';
import Alert from './Alert.jsx';
import CreateAccountForm from './CreateAccountForm';
import Preloader from '../Preloader/Preloader.jsx';

/* global $ */

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleDefaultSubmit = this.handleDefaultSubmit.bind(this);
        
        this.state = {
            redirectToLogin: false
        };
    }
    
    handleDefaultSubmit(e) {
        e.preventDefault();
    }
    
    componentWillMount() {
        this.props.clearReason();
    }
    
    initializeValidator() {
        $.validator.setDefaults({
            errorClass: 'invalid', // false
            validClass: "valid", // true
            errorPlacement: (error, element) => {
                $(element).closest("form").find("label[for='" + element.attr("id") + "']").attr("data-error", error.text());
            },
            submitHandler: async (form) => {
                // console.log('B');
                
                const elements = form.getElementsByTagName("input");
                let inputs = {};
                
                for (let i = 0; i < elements.length; i++) {
                    inputs[elements[i].id] = elements[i].value;
                }
                
                const isCreated = await new Promise((resolve, reject) => {
                    this.props.registerNewUser(resolve, reject, inputs);
                });
                
                if (isCreated) {
                    this.setState({
                        redirectToLogin: true
                    });
                }
            }
        });
        
        this.validator = $("#create-account").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 3,
                    maxlength: 12
                },
                email: {
                    email: true,
                    required: true
                },
                city: {
                    required: true
                },
                state: {
                    required: true
                },
                password: {
                    required: true
                },
                confirm: {
                    required: true,
                    equalTo: "#password"
                }
            },
            messages: {
                username: "Username between 3 to 12 characters required",
                email: "Valid email address required",
                city: "City is required",
                state: "State/Province is required",
                password: "Password is required",
                confirm: "Passwords must match"
            }
        });
    }
    
    componentDidUpdate() {
        this.initializeValidator();
    }
    
    componentDidMount() {
        this.initializeValidator();
    }
    
    render() {
        if (this.props.loading) {
            this.skip = false;
            return <Preloader/>;
        }
        
        if (this.state.redirectToLogin) {
            return <Redirect to={{
                pathname: "/Login",
                state: "Account successfully created."
            }}/>;
        }
        
        return (
            <div className="container" id="create">
                <div className="row">
                    <h3 className="col s12 center">New Account</h3>
                    { this.props.reason ? <Alert message={this.props.reason}/> : null }
                    <CreateAccountForm handleDefaultSubmit={this.handleDefaultSubmit} matchUrl={this.props.match.url}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        reason: users.reason,
        loading: users.loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearReason,
        registerNewUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);