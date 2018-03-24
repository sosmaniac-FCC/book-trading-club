import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { v4 } from 'uuid';

import { authenticate } from '../../reducers/userReducer/userActions.jsx';
import { handleLogout } from '../../reducers/tabReducer/tabActions.jsx';
import Index from './Index.jsx';

/* global $ */

class Tabulation extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick({ target }) {
        // utilize regex to convert href back to its relative pathname
        const relativeURL = target.href.replace(/.*(\.io|\.com|\.gov|\.net|\.edu)/i, '');
        
        this.props.history.push(relativeURL);
        
        if (target.id == "option-5") {
            this.props.handleLogout();
            this.props.authenticate(null);
        }
    }
    
    // tabs are initialized automatically, but require reinitialization upon dynamic update
    componentDidUpdate() {
        $(document).ready(() => {
            $("ul.tabs").tabs();
        });
    }
    
    render() {
        // renders annoying-to-modify, deterministic tabulation
        const content = Object.keys(this.props).map(key => this.props[key]).reduce((accum, curr) => {
            // booleans indicate potential navigation bar options
            if (typeof curr == "boolean")
                accum.push(curr);
            return accum;
        }, []).map((item, i) => (
                item ? <Index i={i} handleClick={this.handleClick} username={this.props.username} key={v4()}/> : null
            )
        );
        
        return (
            <ul className="tabs tabs-fixed-width tabs-transparent">
                {content}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    const { tabs } = state;
    const { users } = state;
    
    return {
        spread: tabs.spread,
        books: tabs.books,
        trades: tabs.trades,
        settings: tabs.settings,
        login: tabs.login,
        logout: tabs.logout,
        username: users.username,
        token: users.token
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleLogout,
        authenticate
    }, dispatch);
}

// withRouter used as a work-around due to materialize tabs muting native functionality
// of the <Link /> component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabulation));

// componentWillMount() {
//     // ATTEMPT TO FIX THE INDICATOR REPOSITIONING ON PAGE RESIZE
//
//     window.addEventListener('resize', () => {
//         console.log("trigger resize");
//     });
// }