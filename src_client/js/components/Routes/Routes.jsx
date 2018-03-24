import React from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import BookSpread from '../BookSpread/BookSpread.jsx';
import CreateAccount from '../CreateAccount/CreateAccount.jsx';
import Login from '../Login/Login.jsx';
import Main from '../Main/Main.jsx';
import MyBooks from '../MyBooks/MyBooks.jsx';
import NewBook from '../NewBook/NewBook.jsx';
import NewTrade from '../NewTrade/NewTrade.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Settings from '../Settings/Settings.jsx';
import Trades from '../Trades/Trades.jsx';
import Trade from '../Trade/Trade.jsx';

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    
    protectedRoute(props, Component) {
        if (this.props.isAuthenticated) {
            return <Component {...props}/>;
        }
        else {
            return <Redirect to={{
                pathname: "/Login",
                state: "You must login first!"
            }}/>;
        }
    }
    
    render() {
        return (
            <Switch>
                <Route exact path="/"                           component={Main}/>
                <Route exact path="/Login/CreateAccount"        component={CreateAccount}/>
                <Route exact path="/Login"                      component={Login}/>
                <Route exact path="/User/:user/Settings"        render={(props) => this.protectedRoute(props, Settings)}/>
                <Route exact path="/User/:user/Trades"          render={(props) => this.protectedRoute(props, Trades)}/>      
                <Route exact path="/User/:user/Trades/New"      render={(props) => this.protectedRoute(props, NewTrade)}/>  
                <Route exact path="/User/:user/Books"           render={(props) => this.protectedRoute(props, MyBooks)}/>           
                <Route exact path="/User/:user/Books/New"       render={(props) => this.protectedRoute(props, NewBook)}/>           
                <Route exact path="/Trade/:id"                  render={(props) => this.protectedRoute(props, Trade)}/> 
                <Route exact path="/Book/BookSpread"            render={(props) => this.protectedRoute(props, BookSpread)}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        isAuthenticated: users.isAuthenticated
    };
}

export default withRouter(connect(mapStateToProps, null)(Routes));

// TO-DO : ACCESS CONTROL FOR PORTS USER, TRADE, & BOOK

// FOR AUTHENTICATION, USE REACT-ROUTER RENDER
// render={(props) => (<Component { ...props }/>)}