export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.role = payload.role;
        state.tokenExpiration = payload.tokenExpiration;
    },
};
