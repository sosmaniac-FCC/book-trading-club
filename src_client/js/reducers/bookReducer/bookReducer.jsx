const reducer = (state={
    error: null,
    reason: null,
    loading: false,
    booksActive: null
}, 
action) => {
    switch (action.type) {
        case "DELETE_BOOK_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "DELETE_BOOK_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
            };
        }
        case "DELETE_BOOK_SUCCESS": {
            return {
                ...state,
                loading: false,
                booksActive: action.result
            };
        }
        case "CLEAR_ACTIVE_BOOKS": {
            return {
                ...state,
                booksActive: null,
                bookActive: null
            };
        }
        case "LOAD_BOOK_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                booksActive: null, 
                bookActive: null
            };
        }
        case "LOAD_BOOK_SUCCESS": {
            return {
                ...state,
                loading: false,
                bookActive: action.book
            };
        }
        case "LOAD_BOOK_FAIL": {
            return {
                ...state,
                reason: action.reason,
                loading: false
            };
        }
        case "LOAD_BOOK_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "LOAD_SPREAD_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                booksActive: null,
                bookActive: null
            };
        }
        case "LOAD_SPREAD_SUCCESS": {
            return {
                ...state,
                loading: false,
                booksActive: action.spread
            };
        }
        case "LOAD_SPREAD_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "RETRIEVE_BOOKS_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                booksActive: null,
                bookActive: null
            };
        }
        case "RETRIEVE_BOOKS_SUCCESS": {
            return {
                ...state,
                loading: false,
                booksActive: action.books
            };
        }
        case "RETRIEVE_BOOKS_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "UPLOAD_BOOK_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                booksActive: null,
                bookActive: null
            };
        }
        case "UPLOAD_BOOK_SUCCESS": {
            return {
                ...state,
                loading: false,
                bookActive: action.book
            };
        }
        case "UPLOAD_BOOK_FAIL": {
            return {
                ...state,
                reason: action.reason,
                loading: false
            };
        }
        case "UPLOAD_BOOK_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;