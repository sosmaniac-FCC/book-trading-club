import React from 'react';
import { Link } from 'react-router-dom';

const CreateAccountForm = (props) => (
    <form className="col s10 offset-s1" id="create-account" onSubmit={props.handleDefaultSubmit}>
        <div id="border-sides-create">
            <div className="row">
                <div className="input-field col s10 offset-s1 m5 offset-m1">
                    <input type="text" name="username" id="username" className="validate"/>
                    <label htmlFor="username" data-success="Usernames are permanent upon creation">Username</label>
                </div>
                <div className="input-field col s10 offset-s1 m5">
        			<input type="email" name="email" id="email" className="validate"/>
        			<label htmlFor="email">Email</label>
        		</div>
    		</div>
    		
    		<div className="row">
                <div className="input-field col s10 offset-s1 m5 offset-m1">
                    <input type="text" name="city" id="city" className="validate"/>
                    <label htmlFor="city">City</label>
                </div>
                <div className="input-field col s10 offset-s1 m5">
        			<input type="text" name="state" id="state" className="validate"/>
        			<label htmlFor="state">State/Province</label>
        		</div>
    		</div>
    		
    		<div className="row">
                <div className="input-field col s10 offset-s1 m5 offset-m1">
                    <input type="password" name="password" id="password" className="validate"/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s10 offset-s1 m5">
        			<input type="password" name="confirm" id="confirm" className="validate"/>
        			<label htmlFor="confirm">Confirm Password</label>
        		</div>
    		</div>
    	</div>
    	
    	<div className="row center">
    	    <button className="waves-effect waves-light btn purple accent-2 remove-button-padding" type="button"><Link className="white-text add-button-padding" to={props.matchUrl.substring(0, props.matchUrl.lastIndexOf('/'))}>Cancel</Link></button>
    	    {"     "}
    	    <button className="waves-effect waves-light btn purple accent-1 add-button-padding" type="submit">Create Account</button>
    	</div>
    </form>
);

export default CreateAccountForm;