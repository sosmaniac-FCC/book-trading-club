import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadSpread } from '../../reducers/bookReducer/bookActions.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import RenderSpread from './RenderSpread.jsx';

/* global $ */

class BookSpread extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    
    componentDidMount() {
        $(document).ready(() => {
            $("#option-0").trigger("click");
        });
    }
    
    componentWillMount() {
        this.props.loadSpread(null);
        this.skip = true;
    }
    
    handleMouseOver(e) {
        const element = e.currentTarget.querySelector("section");
        
        Object.assign(element.style, { opacity: "0.95", left: (e.pageX + 10) + "px", top: (e.pageY - 100) + "px" });
    }
    
    handleMouseMove(e) {
        const element = e.currentTarget.querySelector("section");
        
        Object.assign(element.style, { left: (e.pageX + 10) + "px", top: (e.pageY - 100) + "px" });
    }
    
    handleMouseOut(e) {
        const element = e.currentTarget.querySelector("section");
        
        Object.assign(element.style, { opacity: "0.0" });
    }
    
    render() {
        if (this.props.loading || this.skip) {
            this.skip = false;
            return <Preloader/>;
        }
        
        return (
            <div className="container" id="book-spread">
                <div className="row center">
                    <h6 className="flow-text">System-wide collection hosting {this.props.booksActive.length} book{this.props.booksActive.length === 1 ? "" : "s"}.</h6>
                </div>
                <div className="row">
                    <RenderSpread items={this.props.booksActive} username={this.props.username}
                        handleMouseOver={this.handleMouseOver} 
                        handleMouseMove={this.handleMouseMove}
                        handleMouseOut={this.handleMouseOut}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { books } = state;
    
    return { 
        username: state.users.username,
        loading: books.loading,
        booksActive: books.booksActive
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadSpread
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookSpread);