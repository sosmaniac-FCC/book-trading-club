import axios from 'axios';

export function clearReason() {
    return (dispatch) => {
        dispatch({ type: "CLEAR_USER_REASON" });
    };
}

export function updateUserInformation(username, option, newInfo) {
    return (dispatch) => {
        dispatch({ type: "UPDATE_USER_DATA_START" });
        
        axios.put("/updateUser", { username: username, option: option, newInfo: newInfo })
        .then((response) => {
            const { data } = response;
            
            if (data.result) {
                dispatch({ type: "UPDATE_USER_DATA_SUCCESS", result: data.result });
            }
            else {
                dispatch({ type: "UPDATE_USER_DATA_FAIL", reason: data.reason });
            }
        })
        .catch((err) => {
            dispatch({ type: "UPDATE_USER_DATA_ERROR", error: err }); 
        });
    };
}

export function loadUserData(id) {
    return (dispatch) => {
        dispatch({ type: "FETCH_USER_DATA_START" });
        
        axios.get("/userData?id=" + id)
        .then((response) => {
            const { data } = response;
            
            if (data.user) {
                dispatch({ type: "FETCH_USER_DATA_SUCCESS", user: data.user });
            }
            else {
                dispatch({ type: "FETCH_USER_DATA_FAIL", reason: data.reason });
            }
        })
        .catch((err) => {
            dispatch({ type: "FETCH_USER_DATA_ERROR", error: err});
        });
    };
}

export function registerUserState(resolve, reject, option, user) {
    return (dispatch) => {
        switch (option) {
            case 'login': {
                dispatch({ type: "TOGGLE_USER_LOGIN_START" });
                
                axios.post("/login", { username: user.username, password: user.password })
                .then((response) => {
                    const { data } = response;
                    
                    if (data.token) {
                        // // token pending full implementation until all routes are established
                        dispatch({ type: "TOGGLE_USER_LOGIN_SUCCESS", user: user, token: data.token });
                        dispatch({ type: "TOGGLE_NAV_LOGIN" });
                        resolve(true);
                    }
                    else {
                        dispatch({ type: "TOGGLE_USER_LOGIN_FAIL", reason: data.reason }); 
                        resolve(false);
                    }
                })
                .catch((err) => {
                    // this should never occur unless the db is offline
                    dispatch({ type: "TOGGLE_USER_LOGIN_ERROR", error: err });
                    reject(err);
                });
                
                break;
            }
            case 'logout': {
                dispatch({ type: "TOGGLE_USER_LOGOUT" });
                // update the navigation options bar
                dispatch({ type: "TOGGLE_NAV_LOGOUT" });
                
                break;
            }
            default: {
                dispatch({ type: "USER_STATE_ERROR", error: "registerUserState action received invalid instructions." });
            }
        }  
    };
}

export function registerNewUser(resolve, reject, input) {
    return (dispatch) => {
        // allows for a loader while the server processes the new account
        dispatch({type: "CREATE_ACCOUNT_START"});
        
        axios.post("/newUser", { information: input })
        .then((response) => {
            const { data } = response;
            
            if (data.user) {
                dispatch({ type: "CREATE_ACCOUNT_SUCCESS" });
                return resolve(true);
            }
            else {
                dispatch({ type: "CREATE_ACCOUNT_FAIL", reason: data.reason });
                return resolve(false);
            }
        })
        .catch((err) => {
            dispatch({ type: "CREATE_ACCOUNT_ERROR", error: err });
            return reject(err);
        });
    };
}

// this function is separate from the redux hierarchy
export function authenticate(token) {
    return (dispatch) => {
        dispatch({ type: "AUTHENTICATE_USER_START" });
        
        axios.get("/authenticate", {
            headers: {
                'Authorization': token
            }
        })
        .then((response) => {
            console.log(response.data);
            
            if (response.data) {
                dispatch({ type: "AUTHENTICATE_USER_SUCCESS" });
                //return resolve(true);
                return true;
            }
            else {
                dispatch({ type: "AUTHENTICATE_USER_FAIL" });
                //return resolve(false);
                return false;
            }
        })
        .catch((err) => {
            dispatch({ type: "AUTHENTICATE_USER_ERROR", error: err });
            //return reject(err);
        });
    };
}