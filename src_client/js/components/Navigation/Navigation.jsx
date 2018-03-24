import React from 'react';

import Tabulation from '../Tabulation/Tabulation.jsx';

const Navigation = () => (
    <nav className="nav-extended purple accent-3">
        <h4>
            <i className="fa fa-book"></i> Collect Books! <i className="fa fa-book"></i>
        </h4>
        <div className="nav-content purple accent-1">
            <Tabulation />
        </div>
    </nav>
);

export default Navigation;