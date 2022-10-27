export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    role(state) {
        return state.role;
    },
    adminRole(state) {
        return state.adminRole;
    },
    isAuthenticated(state) {
        return !!state.token;
    }
};
