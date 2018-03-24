import React from 'react';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteBook, loadSpread } from '../../reducers/bookReducer/bookActions.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import RenderSpread from './RenderSpread.jsx';

/* global $ */

class MyBooks extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete(e) {
        // testing
        this.props.deleteBook(e.target.id, this.props.booksActive);
    }
    
    componentWillMount() {
        this.props.loadSpread(this.props.username);
    }
    
    componentDidMount() {
        $(document).ready(() => {
            $("#option-1").trigger("click");
        });
    }
    
    render() {
        // this code is still very much a work in progress
        if (this.props.booksActive) {
            return (
                <div className="container" id="my-books">
                    <div className="row">
                        <div className="col s12">
                            <h6 className="center flow-text">Personally owned books shown below...</h6>
                        </div>
                        <div className="row center">
                            <button className="waves-effect waves-light btn purple lighten-4 remove-button-padding"><Link className="white-text add-button-padding" id="new-book-link" to={`${this.props.match.url}/New`}>ADD NEW</Link></button>
                        </div>
                        <div className="col s10 offset-s1">
                            <div className="row">
                                <RenderSpread handleDelete={this.handleDelete} items={this.props.booksActive}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return <Preloader/>;
        }
    }
}

function mapStateToProps(state) {
    return {
        username: state.users.username,
        booksActive: state.books.booksActive
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteBook,
        loadSpread
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);