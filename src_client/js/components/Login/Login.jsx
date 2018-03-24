import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { clearReason, registerUserState, authenticate } from '../../reducers/userReducer/userActions.jsx';
import Alert from './Alert.jsx';
import LoginForm from './LoginForm.jsx';
import Preloader from '../Preloader/Preloader.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleLogin = this.handleLogin.bind(this);
        
        this.state = {
            redirectToLogin: false  
        };
    }
    
    componentWillMount() {
        this.props.clearReason();
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const elements = e.target.getElementsByTagName("input");
        let inputs = {};
                
        for (let i = 0; i < elements.length; i++) {
            inputs[elements[i].id] = elements[i].value;
            if (i < elements.length - 1) elements[i].value = "";
        }
        
        // form validation
        if (inputs.username != "" && inputs.password != "") {
            const authenticated = await new Promise((resolve, reject) => {
                this.props.registerUserState(resolve, reject, 'login', inputs);
            });
            
            if (!authenticated) {
                this.setState({
                    redirectToLogin: true
                });
            }
        }
    }
    
    render() {
        if (this.props.loading) {
            this.skip = false;
            return <Preloader/>;
        }
        
        if (this.state.redirectToLogin) {
            this.props.location.state = "Invalid username or password.";
        }
        
        if (this.props.token) { 
            this.props.authenticate(this.props.token); // anti-pattern error... idk, resume this tomorrow!
            
            return <Redirect to={{
                pathname: "/Book/BookSpread",
                state: "Login successful; feel free to check out these books!"
            }}/>;
        }
        
        return (
            <div className="container" id="login">
                <div className="row">
                    <h3 className="col s12 center">Sign in</h3>
                    { this.props.location.state ? <Alert message={this.props.location.state}/> : null }
                    <LoginForm handleLogin={this.handleLogin} matchUrl={this.props.match.url}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        loading: users.loading,
        token: users.token
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearReason,
        registerUserState,
        authenticate
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);