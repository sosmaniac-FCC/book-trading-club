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
                            <h2 className="center"><i className="material-icons black purple-text text-accent-1">account_box</i></h2>
                            <h3 className="flow-text center">Login to access account 
                            settings and modify account credentials including user password. Also access a number 
                            of other app-related features available only to authenticated users. Login/sign-up by
                            clicking above.</h3>
                        </div>
                    </section>
                    <section className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center"><i className="material-icons black purple-text text-accent-2">language</i></h2>
                            <h3 className="flow-text center">Interact with other users all across the app 
                            utilizing integrated book trading. Books are traded on a one-for-one basis. Any book that has
                            not already been added to the app can be added by any authenticated user by searching
                            the name of the title.</h3>
                        </div>
                    </section>
                    <section className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center"><i className="material-icons black purple-text text-accent-3">book</i></h2>
                            <h3 className="flow-text center">Book titles are supplied by Google's digitalized book 
                            library. Books are added to this app exclusively by the users. They can then be viewed and trade requested by all other
                            authenticated users. Book entries are unique to the app once added.</h3>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Main;