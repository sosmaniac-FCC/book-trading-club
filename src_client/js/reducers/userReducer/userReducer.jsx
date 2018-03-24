const reducer = (state={
    error: null,
    reason: null,
    loading: false,
    token: null,
    username: null,
    cache: null,
    isAuthenticated: false
}, 
action) => {
    switch (action.type) {
        case "UPDATE_USER_DATA_ERROR": {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case "UPDATE_USER_DATA_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true  
            };
        }
        case "UPDATE_USER_DATA_SUCCESS": {
            return {
                ...state,
                error: null,
                loading: false,
                cache: action.result
            };
        }
        case "UPDATE_USER_DATA_FAIL": {
            return {
                ...state,
                reason: action.reason,
                loading: false
            };
        }
        case "FETCH_USER_DATA_ERROR": {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case "FETCH_USER_DATA_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                cache: null
            };
        }
        case "FETCH_USER_DATA_SUCCESS": {
            return {
                ...state,
                error: null,
                loading: false,
                cache: action.user
            };
        }
        case "FETCH_USER_DATA_FAIL": {
            return {
                ...state,
                reason: action.reason,
                loading: false
            };
        }
        case "CLEAR_USER_REASON": {
            return {
                ...state,
                reason: null
            };
        }
        case "CREATE_ACCOUNT_ERROR": {
            // this should inform the user of the discrepancy
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "CREATE_ACCOUNT_START": {
            // this should render a loader
            return {
                ...state,
                error: null,
                reason: null,
                loading: true
            };
        }
        case "CREATE_ACCOUNT_SUCCESS": {
            // this should redirect to login
            return {
                ...state,
                error: null,
                loading: false,
            };
        }
        case "CREATE_ACCOUNT_FAIL": {
            return {
                ...state,
                reason: action.reason,
                loading: false
            };
        }
        case "TOGGLE_USER_LOGIN_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "TOGGLE_USER_LOGIN_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true
            };
        }
        case "TOGGLE_USER_LOGIN_SUCCESS": {
            return {
                ...state,
                error: null,
                loading: false,
                token: action.token,
                username: action.user.username
            };
        }
        case "TOGGLE_USER_LOGIN_FAIL": {
            return {
                ...state,
                reason: action.reason,
                loading: false
            };
        }
        case "TOGGLE_USER_LOGOUT": {
            return {
                ...state,
                token: null,
                username: null,
                isAuthenticated: false
            };
        }
        case "AUTHENTICATE_USER_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "AUTHENTICATE_USER_START": {
            return {
                ...state,
                error: null,
                loading: true
            };
        }
        case "AUTHENTICATE_USER_SUCCESS": {
            return {
                ...state,
                loading: false,
                isAuthenticated: true
            };
        }
        case "AUTHENTICATE_USER_FAIL": {
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;