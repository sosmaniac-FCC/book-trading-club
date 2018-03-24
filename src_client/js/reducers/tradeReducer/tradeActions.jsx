import axios from 'axios';

export function clearActive() {
    return (dispatch) => {
        dispatch({ type: "CLEAR_ACTIVE_TRADES" });  
    };
}

export function tallyTrades(id) {
    return (dispatch) => {
        dispatch({ type: "TALLY_TRADES_START" });
        
        axios.get("/tallyTrades?userId=" + id)
        .then((response) => {
            dispatch({ type: "TALLY_TRADES_SUCCESS", tally: response.data });
        })
        .catch((err) => {
            dispatch({ type: "TALLY_TRADES_ERROR", error: err }); 
        });
    };
}

export function queryTrades(option, id) {
    return (dispatch) => {
        dispatch({ type: "QUERY_TRADES_START" });
        
        axios.get("/queryTrades?option=" + option + "&id=" + id)
        .then((response) => {
            const { data } = response;
            
            dispatch({ type: "QUERY_TRADES_SUCCESS", tradesActive: data.success });
        })
        .catch((err) => {
            dispatch({ type: "QUERY_TRADES_ERROR", error: err });
        });
    };
}

export function createTrade(resolve, reject, offerId, quarryId) {
    return (dispatch) => {
        dispatch({ type: "CREATE_TRADE_START" });
        
        axios.post("/newTrade", { offer: offerId, quarry: quarryId})
        .then((response) => {
            const { data } = response;
           
            if (data.success) {
                dispatch({ type: "CREATE_TRADE_SUCCESS", result: data.success });
                return resolve(true);
            }
            else {
                dispatch({ type: "CREATE_TRADE_FAIL", reason: data.reason });
                return resolve(false);
            }
        })
        .catch((err) => {
            dispatch({ type: "CREATE_TRADE_ERROR", error: err });
            return reject(err);
        });
    };
}

export function loadTrade(id) {
    return (dispatch) => {
        dispatch({ type: "LOAD_TRADE_START" });
        
        axios.get("/loadTrade?tradeId=" + id)
        .then((response) => {
            const { data } = response;
            
            if (data.trade) {
                dispatch({ type: "LOAD_TRADE_SUCCESS", trade: data.trade });
            }
            else {
                dispatch({ type: "LOAD_TRADE_FAIL", reason: data.reason });
            }
        })
        .catch((err) => {
            dispatch({ type: "LOAD_TRADE_ERROR", error: err }); 
        });
    };
}

export function acceptTrade(resolve, reject, id) {
    return (dispatch) => {
        dispatch({ type: "ACCEPT_TRADE_START" });
        
        axios.put("/acceptTrade", { tradeId: id })
        .then((response) => {
            if (response.data.success) {
                dispatch({ type: "ACCEPT_TRADE_SUCCESS" });
                return resolve(true);
            }
            
            return resolve(false);
        })
        .catch((err) => {
            dispatch({ type: "ACCEPT_TRADE_ERROR", error: err });
            return reject(err);
        });
    };
}

export function deleteTrade(resolve, reject, id) {
    return (dispatch) => {
        dispatch({ type: "DELETE_TRADE_START" });
        
        axios.delete("/deleteTrade?tradeId=" + id)
        .then((response) => {
            if (response.data.result.n === 1) {
                dispatch({ type: "DELETE_TRADE_SUCCESS", success: response.data.result });
                return resolve(true);
            }
            else {
                dispatch({ type: "DELETE_TRADE_FAIL", reason: "Unable to find and delete the indicated trade value." });
                return resolve(false);
            }
        })
        .catch((err) => {
            dispatch({ type: "DELETE_TRADE_ERROR", error: err }); 
            return reject(err);
        });
    };
}