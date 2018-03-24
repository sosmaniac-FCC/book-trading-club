import React from 'react';

import { Link } from 'react-router-dom';

const Index = (props) => (
    <li className="tab white-text">
        <Link onClick={props.handleClick} 
        className={
            ((index) => {
                if (index == 5) {
                    return "hide-on-small-only";
                }
                else {
                    return "";
                }
            })(props.i)}
        id={"option-" + props.i}
        to={((index) => {
                switch (index) {
                    case 0: return "/Book/BookSpread";
                    case 1: return "/User/" + props.username + "/Books";
                    case 2: return "/User/" + props.username + "/Trades";
                    case 3: return "/User/" + props.username + "/Settings";
                    case 4: return "/Login";
                    case 5: return "/";
                    default: throw "ERROR! -> render() of Tabulation computes indexOutOfBounds A";
                }
            })(props.i)}>
            {/* innerHTML */}
            {((index) => {
                switch (index) {
                    case 0: return "ALL BOOKS";
                    case 1: return "MY BOOKS";
                    case 2: return "TRADES";
                    case 3: return "SETTINGS";
                    case 4: return "LOGIN HERE";
                    case 5: return "LOGOUT";
                    default: throw "ERROR! -> render() of Tabulation computes indexOutOfBounds B";
                }
            })(props.i)}
        </Link>
    </li>
);

export default Index;