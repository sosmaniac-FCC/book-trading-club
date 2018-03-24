import React from 'react';

import { Link } from 'react-router-dom';

const LoginForm = (props) => (
    <form className="col s10 m4 offset-s1 offset-m4" onSubmit={props.handleLogin}>
        <div className="row">
            <div className="input-field col s10 m10 offset-s1 offset-m1">
                <input type="text" name="username" id="username" className="validate" required/>
                <label htmlFor="username" data-error="Username is a required field">Username</label>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s10 m10 offset-s1 offset-m1">
    			<input type="password" name="password" id="password" className="validate" required/>
    			<label htmlFor="password" data-error="Password is a required field">Password</label>
    		</div>
    	</div>
    	<div className="row center">
    	    <input className="waves-effect waves-light btn purple accent-2 add-button-padding" type="submit" value="Login" />
    	    {"     "}
    	    <button className="waves-effect waves-light btn purple accent-1 remove-button-padding" type="button"><Link className="white-text add-button-padding" id="register-link" to={`${props.matchUrl}/CreateAccount`}>Register</Link></button>
    	</div>
    </form>
);

export default LoginForm;