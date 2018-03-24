import React from 'react';
import { Link, Redirect } from 'react-router-dom'; 

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createTrade } from '../../reducers/tradeReducer/tradeActions.jsx';
import { loadSpread } from '../../reducers/bookReducer/bookActions.jsx';
import Alert from './Alert.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import RenderSpread from './RenderSpread.jsx';

/* global $ */

class NewTrade extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            redirectToTrades: false
        };
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const success = await new Promise((resolve, reject) => {
            this.props.createTrade(resolve, reject, e.target.querySelector("input[name='item-A']:checked").id, e.target.querySelector("input[name='item-B']:checked").id);
        });
        
        if (success) {
            this.setState({
                redirectToTrades: true 
            });
        }
    }
    
    componentDidMount() {
        $(document).ready(() => {
            $("#option-2").trigger("click"); 
        });
    }
    
    componentWillMount() {
        this.props.loadSpread(null);
        this.skip = true;
    }
    
    render() {
        if (this.props.loadingBooks || this.props.loadingTrades || this.skip) {
            this.skip = false;
            return <Preloader/>;
        }
        
        if (this.state.redirectToTrades) {
            return <Redirect to={{
                pathname: `/User/${this.props.username}/Trades`,
                state: "Trade created successfully! Pending recipient's confirmation..."
            }}/>;
        }
        
        return (
            <div className="container" id="new-trade">
                <form onSubmit={this.handleSubmit}>
                    { this.props.reason ? <Alert message={this.props.reason}/> : null }
                    <div className="row center">
                        <h6>Which of your books do you want to trade?</h6>
                    </div>
                    <div className="row">
                        <RenderSpread flag={'A'} items={this.props.booksActive.filter(item => item.bookOwnerId == this.props.username)}/>
                    </div>
                    <hr/>
                    <div className="row center">
                        <h6>Which book are you trading for?</h6>
                    </div>
                    <div className="row">
                        <RenderSpread flag={'B'} items={this.props.booksActive.filter(item => item.bookOwnerId != this.props.username)}/>
                    </div>
                    <div className="row center">
    	                <button className="waves-effect waves-light btn purple accent-2 remove-button-padding" type="button"><Link className="white-text add-button-padding" to={this.props.match.url.substring(0, this.props.match.url.lastIndexOf('/'))}>CANCEL</Link></button>
    	                {"     "}
                        <button className="waves-effect waves-light btn purple accent-1 add-button-padding" type="submit">CONFIRM</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { books } = state;
    const { trades } = state;
    
    return {
        username: state.users.username,
        reason: trades.reason,
        loadingTrades: trades.loading,
        loadingBooks: books.loading,
        booksActive: books.booksActive
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadSpread,
        createTrade
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTrade);