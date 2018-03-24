import React from 'react';
import { Link } from 'react-router-dom';

import Alert from './Alert.jsx';

const Search = (props) => (
    <div>
        <h6 className="flow-text">Which book are you looking for?</h6>
        { props.errorMsg ? <Alert message={props.errorMsg}/> : null }
        <div className="col s10 m8 offset-s1 offset-m2">
            <nav>
                <div className="nav-wrapper purple lighten-4">
                    <form onSubmit={props.handleSearch}>
                        <div className="input-field"> 
                            <input type="search" id="search" required/>
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                        <div className="row center">
                            <button className="waves-effect waves-light btn purple accent-2 remove-button-padding" type="button"><Link className="white-text add-button-padding" id="register-link" to={props.matchUrl.substring(0, props.matchUrl.lastIndexOf('/'))}>MY BOOKS</Link></button>
                            {"     "}
                            <input className="waves-effect waves-light btn purple accent-1 add-button-padding" type="submit" value="SEARCH BOOKS"/>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    </div>
);

export default Search;