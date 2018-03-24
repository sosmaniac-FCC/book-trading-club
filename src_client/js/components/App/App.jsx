import React from "react";

import Copyright from '../Copyright/Copyright.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import Routes from '../Routes/Routes.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="container">
                <header className="container">
                    <Navigation/>
                </header>
                <main className="container">
                    <Routes/>
                </main>
                <footer className="container page-footer purple accent-1">
                    <Copyright/>
                </footer>
            </div>
        );
    }
};

export default App;