import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteTrade, acceptTrade, loadTrade } from '../../reducers/tradeReducer/tradeActions.jsx';
import Alert from './Alert.jsx';
import CompareBody from './CompareBody.jsx';
import Preloader from '../Preloader/Preloader.jsx';

/* global $ */

class Trade extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleAccept = this.handleAccept.bind(this);
    }
    
    // 0 = accept, 1 = decline, 2 = cancel trade
    
    async handleAccept(e) {
        this.redirectId = 0;
        
        await new Promise((resolve, reject) => {
            this.props.acceptTrade(resolve, reject, this.props.cache._id);
        });
        
        // No need to setState, our cache is set to null by this point so the condition 
        // !this.props.cache takes care of the redirect without needing to setState.
    }
    
    async handleDelete(e, id) {
        if (id == 'decline')
            this.redirectId = 1;
        else if (id == 'cancel')
            this.redirectId = 2;
        
        await new Promise((resolve, reject) => {
            this.props.deleteTrade(resolve, reject, this.props.cache._id); 
        });
        
        // No need to setState, our cache is set to null by this point so the condition 
        // !this.props.cache takes care of the redirect without needing to setState.
    }
    
    componentWillMount() {
        this.props.loadTrade(this.props.match.params.id);
        this.skip = true;
    }
    
    componentDidMount() {
        $(document).ready(() => {
            $("#option-2").trigger("click"); 
        });
    }
    
    render() {
        if (this.props.loading || this.skip) {
            this.skip = false;
            return <Preloader/>;
        }
        
        if (!this.props.cache) {
            return <Redirect to={{
                pathname: `/User/${this.props.username}/Trades`,
                state: ((id) => {
                    switch(id) {
                        case 0: {
                            return 'Trade accepted and processed successfully. Enjoy your new book!';
                        }
                        case 1: {
                            return 'Trade successfully declined.';
                        }
                        case 2: {
                            return 'Trade successfully canceled.';
                        }
                    }
                })(this.redirectId)
            }}/>;
        }
        
        return (
            <div className="container" id="trade">
                <div className="row center">
                    <h6 className="flow-text">{this.props.username == this.props.cache.senderId ? "SENT TRADE" : "RECEIVED TRADE"}</h6>
                </div>
                { this.props.reason ? <Alert message={this.props.reason}/> : null }
                <hr/>
                <CompareBody cache={this.props.cache}/>
                <hr/>
                { 
                    this.props.username == this.props.cache.senderId ?
                    <div className="row center">
                        <button className="waves-effect waves-light btn purple accent-2 remove-button-padding"><Link className="white-text add-button-padding" to={`/User/${this.props.username}/Trades`}>BACK</Link></button>
                        {"     "}
                        <button className="waves-effect waves-light btn purple accent-1 add-button-padding" onClick={(e) => this.handleDelete(e, 'cancel')}>CANCEL TRADE</button>
                    </div> :
                    <div className="row center">
                        <button className="waves-effect waves-light btn purple accent-2 add-button-padding" onClick={(e) => this.handleDelete(e, 'decline')}>DECLINE</button>
                	    {"     "}
                	    <button className="waves-effect waves-light btn purple accent-1 add-button-padding" onClick={this.handleAccept}>ACCEPT</button>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { trades } = state;
    
    return {
        username: state.users.username,
        loading: trades.loading,
        reason: trades.reason,
        cache: trades.cache
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTrade,
        deleteTrade,
        acceptTrade
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade);