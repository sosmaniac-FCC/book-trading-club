import React from 'react';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { tallyTrades, queryTrades, clearActive } from '../../reducers/tradeReducer/tradeActions.jsx';
import Alert from './Alert.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import TableRender from './TableRender.jsx';

/* global $ */

class Trades extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleQuery(e, option) {
        this.props.queryTrades(option, this.props.username);
    }
    
    componentDidMount() {
        $(document).ready(() => {
            $("#option-2").trigger("click"); 
        });
    }
    
    componentWillMount() {
        console.log("P * P");
        
        if (this.props.tradesActive) {
            this.props.clearActive();
            this.props.tallyTrades(this.props.username);
            this.skip = true;
        }
        else {
            this.props.tallyTrades(this.props.username);
            this.skip = true;
        }
    }
    
    render() {
        if (this.props.loading || this.skip) {
            this.skip = false;
            return <Preloader/>;
        }
        
        return (
            <div className="container" id="trades">
                <div className="row">
                    <h6 className=" col s12 center flow-text">Trade books with other users.</h6>
                    { this.props.location.state ? <Alert message={this.props.location.state}/> : null }
                </div>
                <div className="row center">
                    <button className="waves-effect waves-light btn purple accent-2 add-button-padding" onClick={(e) => this.handleQuery(e, 'sender')}>SENT ({this.props.cache.userS})</button>
            	    {"     "}
            	    <button className="waves-effect waves-light btn purple accent-1 add-button-padding" onClick={(e) => this.handleQuery(e, 'receiver')}>RECEIVED ({this.props.cache.userR})</button>
                </div>
                <div className="row center">
                    <button className="waves-effect waves-light btn purple lighten-4 remove-button-padding"><Link className="white-text add-button-padding" to={`${this.props.match.url}/New`}>NEW TRADE</Link></button>
                </div>
                <div className="row">
                    { this.props.tradesActive ? <TableRender trades={this.props.tradesActive}/> : <p className="col s12 center flow-text">Select 'SENT' or 'RECEIVED' above...</p> }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { trades } = state;
    
    return {
        username: state.users.username,
        reason: trades.reason,
        loading: trades.loading,
        cache: trades.cache,
        tradesActive: trades.tradesActive,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        tallyTrades,
        queryTrades,
        clearActive
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trades);