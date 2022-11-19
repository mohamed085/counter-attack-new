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
            name: null,
            adminRole: "super",
            organizationRole: "organization_agency",
            teamRole: "team",
        }
    },
    mutations,
    getters,
    actions
}