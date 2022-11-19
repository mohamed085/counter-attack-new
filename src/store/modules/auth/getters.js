export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    name(state) {
        return state.name;
    },
    role(state) {
        return state.role;
    },
    adminRole(state) {
        return state.adminRole;
    },
    teamRole(state) {
        return state.teamRole;
    },
    organizationRole(state) {
        return state.organizationRole;
    },
    isAuthenticated(state) {
        return !!state.token;
    }
};
