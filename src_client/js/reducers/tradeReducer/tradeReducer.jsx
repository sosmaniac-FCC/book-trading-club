const reducer = (state={
    error: null,
    reason: null,
    loading: false,
    tradesActive: null,
    cache: null
}, 
action) => {
    switch (action.type) {
        case "TALLY_TRADES_ERROR": {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case "TALLY_TRADES_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                cache: null
            };
        }
        case "TALLY_TRADES_SUCCESS": {
            return {
                ...state,
                loading: false,
                cache: action.tally
            };
        }
        case "CREATE TRADE_ERROR": {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case "CREATE_TRADE_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                tradesActive: null
            };
        }
        case "CREATE_TRADE_SUCCESS": {
            return {
                ...state,
                loading: false,
                cache: null
            };
        }
        case "CREATE_TRADE_FAIL": {
            return {
                ...state,
                loading: false,
                reason: action.reason
            };
        }
        case "QUERY_TRADES_ERROR": {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case "QUERY_TRADES_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                tradesActive: null
            };
        }
        case "QUERY_TRADES_SUCCESS": {
            return {
                ...state,
                loading: false,
                tradesActive: action.tradesActive
            };
        }
        case "LOAD_TRADE_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "LOAD_TRADE_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                cache: null
            };
        }
        case "LOAD_TRADE_SUCCESS": {
            return {
                ...state,
                loading: false,
                cache: action.trade
            };
        }
        case "LOAD_TRADE_FAIL": {
            return {
                ...state,
                loading: false,
                reason: action.reason
            };
        }
        case "DELETE_TRADE_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "DELETE_TRADE_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true,
                tradesActive: null
            };
        }
        case "DELETE_TRADE_SUCCESS": {
            return {
                ...state,
                loading: false,
                cache: null
            };
        }
        case "DELETE_TRADE_FAIL": {
            return {
                ...state,
                loading: false,
                reason: action.reason
            };
        }
        case "CLEAR_ACTIVE_TRADES": {
            return {
                ...state,
                tradesActive: null
            };
        }
        case "ACCEPT_TRADE_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }
        case "ACCEPT_TRADE_START": {
            return {
                ...state,
                error: null,
                reason: null,
                loading: true
            };
        }
        case "ACCEPT_TRADE_SUCCESS": {
            return {
                ...state,
                loading: false,
                cache: null
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;