const reducer = (state={
    spread: false,
    books: false,
    trades: false,
    settings: false,
    login: true,
    logout: false,
}, 
action) => {
    switch (action.type) {
        case "TOGGLE_NAV_LOGIN": {
            return {
                ...state,
                spread: true,
                books: true,
                trades: true,
                settings: true,
                login: false,
                logout: true
            };
        }
        case "TOGGLE_NAV_LOGOUT": {
            return {
                ...state,
                spread: false,
                books: false,
                trades: false,
                settings: false,
                login: true,
                logout: false
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;