import React from 'react';

import { connect } from 'react-redux';

import Tabulation from '../Tabulation/Tabulation.jsx';

const Navigation = (props) => (
    <nav className="nav-extended purple accent-3">
        <h4>
            <i className="fa fa-book hide-on-small-only"></i>{"   "}{props.username ? props.username : "Collect Books!"}{"   "}<i className="fa fa-book hide-on-small-only"></i>
        </h4>
        <div className="nav-content purple accent-1">
            <Tabulation />
        </div>
    </nav>
);

function mapStateToProps({ users }) {
    return {
        username: users.username
    };
}

export default connect(mapStateToProps, null)(Navigation);