import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resetActive, retrieveNewBooks, uploadNewBook } from '../../reducers/bookReducer/bookActions.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import Results from './Results.jsx';
import Search from './Search.jsx';

/* global $ */

class NewBook extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    
    handleSearch(e) {
        e.preventDefault();
        const query = document.getElementById("search").value;
        
        this.props.retrieveNewBooks(query);
    }
    
    handleCancel() {
        this.props.resetActive();
    }
    
    handleSelect(e) {
        const element = e.currentTarget;
        
        console.log('****');
        console.log(e.currentTarget);
        
        const data = {
            bookId: element.querySelector(".card").id,
            bookTitle: element.querySelector(".card-content p").innerHTML,
            bookImgUrl: element.querySelector(".card-image img").src
        };
        
        this.props.uploadNewBook(data, this.props.username);
    }
    
    componentWillMount() {
        this.props.resetActive();
        this.skip = true;
    }
    
    componentDidMount() {
        $(document).ready(() => {
            $("#option-1").trigger("click"); 
        });
    }
    
    render() {
        if (this.props.loading || this.skip) {
            this.skip = false;
            return <Preloader/>;
        }
        
        return (
            <div className="container" id="new-book">
                <div className="row center">
                    { 
                        !this.props.booksActive ? 
                        <Search handleSearch={this.handleSearch} matchUrl={this.props.match.url} errorMsg={this.props.reason}/> : 
                        <Results booksActive={this.props.booksActive} handleCancel={this.handleCancel} handleSelect={this.handleSelect}/> 
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { books } = state;
    
    return {
        username: state.users.username,
        reason: books.reason,
        loading: books.loading,
        booksActive: books.booksActive
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetActive,
        retrieveNewBooks,
        uploadNewBook
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBook);