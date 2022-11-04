import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/login";
import home from "@/views/home";
import main from "@/views/main";
import requestedTeams from "@/views/admin/teams/requested-teams";
import acceptedTeams from "@/views/admin/teams/accepted-teams";
import acceptedTeam from "@/views/admin/teams/accepted-team";
import requestedTeam from "@/views/admin/teams/requested-team";
import requestedOrganizationAgencies from "@/views/admin/organization-agencies/requested-organization-agencies";
import acceptedOrganizationAgencies from "@/views/admin/organization-agencies/accepted-organization-agencies";
import editAcceptedTeam from "@/views/shared/teams/edit-accepted-team";
import products from "@/views/admin/products/products";
import requestedOrganizationAgency from "@/views/admin/organization-agencies/requested-organization-agency";
import acceptedOrganizationAgency from "@/views/admin/organization-agencies/accepted-organization-agency";
import product from "@/views/admin/products/product";
import editProduct from "@/views/admin/products/edit-product";
import addProduct from "@/views/admin/products/add-product";
import administrators from "@/views/team/administrators/administrators";
import addAdministrator from "@/views/team/administrators/add-administrator";
import about from "@/views/about";
import coaches from "@/views/team/coaches/coaches";
import addCoach from "@/views/team/coaches/add-coach";
import coachAssistants from "@/views/team/coach-assistants/coach-assistants";
import addCoachAssistant from "@/views/team/coach-assistants/add-coach-assistant";
import editAcceptedTeamMain from "@/views/shared/teams/edit-accepted-team-main";
import editAcceptedTeamShirt from "@/views/shared/teams/edit-accepted-team-shirt";
import editAcceptedTeamPlayer from "@/views/shared/teams/edit-accepted-team-player";
import myTeam from "@/views/team/my-team";
import addAcceptedTeamPlayer from "@/views/shared/teams/add-accepted-team-player";

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: login },
    { path: '/', component: home, children: [
        /** Shared */
        { path: '/', component: main },
        { path: '/about', component: about },
        { path: '/teams-accepted/edit/:id', component: editAcceptedTeam, children: [
            { path: '/', component: editAcceptedTeamMain },
            { path: '/teams-accepted/edit/:id/shirt/:shirtId', component: editAcceptedTeamShirt },
            { path: '/teams-accepted/edit/:id/player/:playerId', component: editAcceptedTeamPlayer },
            { path: '/teams-accepted/edit/:id/add-player', component: addAcceptedTeamPlayer },
        ]},

        /** Admin */
        // teams routes
        { path: '/teams-accepted', component: acceptedTeams },
        { path: '/teams-requested', component: requestedTeams },
        { path: '/teams-requested/view/:id', component: requestedTeam },
        { path: '/teams-accepted/view/:id', component: acceptedTeam },

        // organization-agencies routes
        { path: '/organization-agencies-requested', component: requestedOrganizationAgencies },
        { path: '/organization-agencies-accepted', component: acceptedOrganizationAgencies },
        { path: '/organization-agency-requested/view/:id', component: requestedOrganizationAgency },
        { path: '/organization-agency-accepted/view/:id', component: acceptedOrganizationAgency },

        // products routes
        { path: '/products', component: products },
        { path: '/product/view/:id', component: product },
        { path: '/product/edit/:id', component: editProduct },
        { path: '/product/add', component: addProduct },

        /** Team */
        // team routes
        { path: '/my-team', component: myTeam },

        // administrators routes
        { path: '/administrators', component: administrators },
        { path: '/administrators/add', component: addAdministrator },

        // coaches routes
        { path: '/coaches', component: coaches },
        { path: '/coaches/add', component: addCoach },

        // coach-assistants routes
        { path: '/coach-assistants', component: coachAssistants },
        { path: '/coach-assistants/add', component: addCoachAssistant },


    ]},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
