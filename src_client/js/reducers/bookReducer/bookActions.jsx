import axios from 'axios';

export function resetActive() {
    return (dispatch) => {
        dispatch({ type: "CLEAR_ACTIVE_BOOKS" });
    };
}

export function deleteBook(id, booksActive) {
    return (dispatch) => {
        dispatch({ type: "DELETE_BOOK_START" });
        
        axios.delete("/deleteBook?id=" + id)
        .then((response) => {
            booksActive = booksActive.filter(item => item.bookId != id);
            
            dispatch({ type: "DELETE_BOOK_SUCCESS", result: booksActive });
        })
        .catch((err) => {
            // handle arr
            dispatch({ type: "DELETE_BOOK_ERROR", error: err });
        });
    };
}

export function loadBook(id) {
    return (dispatch) => {
        dispatch({ type: "LOAD_BOOK_START" });
        
        axios.get("/loadBook?id=" + id)
        .then((response) => {
            const { data } = response;
            
            if (data.book) {
                dispatch({ type: "LOAD_BOOK_SUCCESS", book: data.book });
            }
            else {
                dispatch({ type: "LOAD_BOOK_FAIL", reason: data.reason });
            }
        })
        .catch((err) => {
            // handle err
            dispatch({ type: "LOAD_BOOK_ERROR", error: err });
        });
    };
}

export function loadSpread(id) {
    return (dispatch) => {
        dispatch({ type: "LOAD_SPREAD_START" });
        
        axios.get("/spreadOfBooks" + (id ? "?id=" + id : ""))
        .then((response) => {
            dispatch({ type: "LOAD_SPREAD_SUCCESS", spread: response.data });
        })
        .catch((err) => {
            // handle err
            dispatch({ type: "LOAD_SPREAD_ERROR", error: err });
        });
    };
}

export function retrieveNewBooks(title) {
    return (dispatch) => {
        dispatch({ type: "RETRIEVE_BOOKS_START" });
        
        axios.get("/newBooks?title=" + title)
        .then((response) => {
            dispatch({ type: "RETRIEVE_BOOKS_SUCCESS", books: response.data });
        })
        .catch((err) => {
            // handle err
            dispatch({ type: "RETRIEVE_BOOKS_ERROR", error: err });
        });
    };
}

export function uploadNewBook(book, userId) {
    return (dispatch) => {
          dispatch({ type: "UPLOAD_BOOK_START" });
          
          axios.post("/newBook", { book: book, userId: userId })
          .then((response) => {
              const { data } = response;
              
              if (data.success) {
                  dispatch({ type: "UPLOAD_BOOK_SUCCESS", book: data.success });
              }
              else {
                  dispatch({ type: "UPLOAD_BOOK_FAIL", reason: data.reason });
              }
          })
          .catch((err) => {
              // handle err
              dispatch({ type: "UPLOAD_BOOK_ERROR", error: err });
          });
    };
}