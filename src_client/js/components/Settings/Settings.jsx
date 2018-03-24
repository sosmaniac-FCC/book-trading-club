import React from 'react';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { handleLogout } from '../../reducers/tabReducer/tabActions.jsx';
import { updateUserInformation, loadUserData } from '../../reducers/userReducer/userActions.jsx';
import Alert from './Alert.jsx';
import ModalChange from './ModalChange.jsx';
import Preloader from '../Preloader/Preloader.jsx';

/* global $ */

class Settings extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        
        this.state = {
            redirectToLogin: false
        };
    }
    
    componentWillMount() {
        this.props.loadUserData(this.props.username);
        this.skip = true;
    }
    
    componentDidUpdate() {
        $(document).ready(() => {
            $("#option-3").trigger("click");
        });
    }
    
    handleClick(e) {
        this.qId = ((q) => {
            switch (q) {
                case "email-clickee": {
                    return 0;
                }
                case "location-clickee": {
                    return 1;
                }
                case "password-clickee": {
                    return 2;
                }
                default: {
                    return null;
                }
            }
        })(e.target.id);
        
        // escape-hatch code
        this.forceUpdate();
        
        $(".modal").modal();
        $("#modalChange").modal("open"); 
    }
    
    handleLogoutClick() {
        this.props.handleLogout();
        
        this.setState({
            redirectToLogin: true
        });
    }
    
    handleConfirm(e) {
        e.preventDefault();
        
        // each form contains its own separate submitHandler
    }
    
    render() {
        if (this.props.loading || this.skip) {
            this.skip = false;
            return <Preloader/>;
        }
        
        if (this.state.redirectToLogin) {
            return <Redirect to="/" />;
        }
        
        const { cache } = this.props;
        
        return (
            <div className="container" id="settings">
                <div className="center row">
                    <h6 className="col s12 flow-text">Update user information.</h6>
                    <h6 className="col s12 flow-text">Username changes are currently unavailable.</h6>
                </div>
                <hr/>
                <div className="row" id="settings-manifest">
                    <h3 className="col s12 center">{cache.username}{'  '}
                        <a id="logout-clickee" onClick={this.handleLogoutClick}>Logout</a>
                    </h3>
                    { this.props.reason ? <Alert message={this.props.reason}/> : null }
                    <div className="col s12 center">
                        <p>{cache.email}{'  '}
                            <a id="email-clickee" onClick={this.handleClick}>change</a>
                        </p>
                        <p>{cache.city}, {cache.state}{'  '} 
                            <a id="location-clickee" onClick={this.handleClick}>change</a>
                        </p>
                        <button className="waves-effect waves-light btn purple lighten-3 remove-button-padding">
                            <a className="white-text add-button-padding" id="password-clickee" onClick={this.handleClick}>Change Password</a>
                        </button>
                        <ModalChange qId={this.qId} handleConfirm={this.handleConfirm}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        reason: users.reason,
        loading: users.loading,
        username: users.username,
        cache: users.cache
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUserInformation,
        loadUserData,
        handleLogout
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

// Password has its own submitHandler
// if (this.qId !== 2) {
//     const elements = e.target.getElementsByTagName("input");
//     const option = (this.qId === 0) ? 'email' : 'location';
//     let inputs = {};
//     for (let i = 0; i < elements.length; i++) {
//         inputs[elements[i].id] = elements[i].value;
//     }
    
//     // form validation
//     if ((inputs.newCity && inputs.newState && inputs.newCity != "" && inputs.newState != "") || (inputs.newEmail && inputs.newEmail != "")) {
//         $("#modalChange").modal("close");
        
//         this.props.updateUserInformation(this.props.username, option, inputs);
//     }
// }