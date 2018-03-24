import React from 'react';

/* global $ */

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        $(document).ready(() => {
            $("#option-4").trigger("click");
        });
    }
    
    render() {
        return (
            <div className="row" id="main">
                <div className="col s12">
                    <section className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center"><i className="material-icons">account_box</i></h2>
                            <h3 className="flow-text center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea commodo consequat.</h3>
                        </div>
                    </section>
                    <section className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center"><i className="material-icons">language</i></h2>
                            <h3 className="flow-text center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea commodo consequat.</h3>
                        </div>
                    </section>
                    <section className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center"><i className="material-icons">chat</i></h2>
                            <h3 className="flow-text center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea commodo consequat.</h3>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Main;