// changes the tabulation
export function handleLogout() {
    return (dispatch) => {
        dispatch({ type: "TOGGLE_NAV_LOGOUT" });
        dispatch({ type: "TOGGLE_USER_LOGOUT" });
    };
}

// alright, keep thinking and figure out how the tabulation and router work together
// also, start connecting your components to the redux store (container vs. presentation)