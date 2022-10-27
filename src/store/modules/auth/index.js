import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"

export default {
    state() {
        return {
            userId: null,
            role: null,
            token: null,
            tokenExpiration: null,
            adminRole: "super",
            organizationAgencyRole: "organization_agency",
            teamMemberRole: "team",
        }
    },
    mutations,
    getters,
    actions
}