import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import main from '@/views/main'
import requestedTeams from '@/views/admin/teams/requested-teams'
import acceptedTeams from '@/views/admin/teams/accepted-teams'
import acceptedTeam from '@/views/shared/teams/accepted-team'
import requestedTeam from '@/views/admin/teams/requested-team'
import requestedOrganizationAgencies from '@/views/admin/organization-agencies/requested-organization-agencies'
import acceptedOrganizationAgencies from '@/views/admin/organization-agencies/accepted-organization-agencies'
import editAcceptedTeam from '@/views/shared/teams/edit-accepted-team'
import products from '@/views/admin/products/products'
import Messages from '@/views/admin/messages/AllMessages.vue'
import MessageReply from '@/views/admin/messages/MessageReply.vue'
import Playgrounds from '@/views/admin/playground/All.vue'
import Playground from '@/views/admin/playground/Show.vue'
import EditPlayground from '@/views/admin/playground/Edit.vue'
import AddPlayground from '@/views/admin/playground/Add.vue'
import Users from '@/views/admin/users/AllUsers.vue'
import EditUser from '@/views/admin/users/EditUser.vue'
import AddUser from '@/views/admin/users/AddUser.vue'
import requestedOrganizationAgency from '@/views/admin/organization-agencies/requested-organization-agency'
import acceptedOrganizationAgency from '@/views/admin/organization-agencies/accepted-organization-agency'
import product from '@/views/admin/products/product'
import editProduct from '@/views/admin/products/edit-product'
import addProduct from '@/views/admin/products/add-product'
import administrators from '@/views/team/administrators/administrators'
import addAdministrator from '@/views/team/administrators/add-administrator'
import about from '@/views/about'
import coaches from '@/views/team/coaches/coaches'
import addCoach from '@/views/team/coaches/add-coach'
import coachAssistants from '@/views/team/coach-assistants/coach-assistants'
import addCoachAssistant from '@/views/team/coach-assistants/add-coach-assistant'
import editAcceptedTeamMain from '@/views/shared/teams/edit-accepted-team-main'
import editAcceptedTeamShirt from '@/views/shared/teams/edit-accepted-team-shirt'
import editAcceptedTeamPlayer from '@/views/shared/teams/edit-accepted-team-player'
import myTeam from '@/views/team/my-team'
import addAcceptedTeamPlayer from '@/views/shared/teams/add-accepted-team-player'
import championships from '@/views/organization-agency/championships/championships'
import addChampionship from '@/views/organization-agency/championships/add-championship'
import championship from '@/views/organization-agency/championships/championship'
import championTeamRequest from '@/views/organization-agency/champion-team-request'
import championshipStart from '@/views/organization-agency/championships/championship-start'
import playersRequests from '@/views/team/players/players-requests'
import playerRequest from '@/views/team/players/player-request'
import academiesRequests from '@/views/admin/academies/academies-requests'
import championDetails from "@/views/organization-agency/championships/champion-details";
import journalists from "@/views/organization-agency/journalist/journalists";
import addJournalist from "@/views/organization-agency/journalist/add-journalist";
import photographers from "@/views/organization-agency/photographers/photographers";
import addPhotographer from "@/views/organization-agency/photographers/add-photographer";

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  {
    path: '/',
    component: home,
    children: [
      /** Shared */
      { path: '/', component: main },
      { path: '/about', component: about },
      { path: '/teams-accepted/view/:id', component: acceptedTeam },
      {
        path: '/teams-accepted/edit/:id',
        component: editAcceptedTeam,
        children: [
          { path: '/', component: editAcceptedTeamMain },
          {
            path: '/teams-accepted/edit/:id/shirt/:shirtId',
            component: editAcceptedTeamShirt,
          },
          {
            path: '/teams-accepted/edit/:id/player/:playerId',
            component: editAcceptedTeamPlayer,
          },
          {
            path: '/teams-accepted/edit/:id/add-player',
            component: addAcceptedTeamPlayer,
          },
        ],
      },

      /** Admin */
      // teams routes
      { path: '/teams-accepted', component: acceptedTeams },
      { path: '/teams-requested', component: requestedTeams },
      { path: '/teams-requested/view/:id', component: requestedTeam },
      { path: '/teams-accepted/view/:id', component: acceptedTeam },

      // organization-agencies routes
      {
        path: '/organization-agencies-requested',
        component: requestedOrganizationAgencies,
      },
      {
        path: '/organization-agencies-accepted',
        component: acceptedOrganizationAgencies,
      },
      {
        path: '/organization-agency-requested/view/:id',
        component: requestedOrganizationAgency,
      },
      {
        path: '/organization-agency-accepted/view/:id',
        component: acceptedOrganizationAgency,
      },

      // users routes
      { path: '/users/all', component: Users },
      //   { path: '/users/view/:id', component: User },
      { path: '/users/edit/:id', component: EditUser, props: true },
      { path: '/users/add', component: AddUser },
      // messages routes
      { path: '/messages/all', component: Messages },
      { path: '/messages/view/:id', component: MessageReply, props: true },
      // playground routes
      { path: '/playgrounds/all', component: Playgrounds },
      { path: '/playgrounds/view/:id', component: Playground, props: true },
      { path: '/playgrounds/add', component: AddPlayground },
      { path: '/playgrounds/edit/:id', component: EditPlayground, props: true },

      // products routes
      { path: '/products', component: products },
      { path: '/product/view/:id', component: product },
      { path: '/product/edit/:id', component: editProduct },
      { path: '/product/add', component: addProduct },

      // academies routes
      { path: '/academies-requests', component: academiesRequests },

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

      // players-requests routes
      { path: '/players-requests', component: playersRequests },
      { path: '/players-requests/view/:id', component: playerRequest },

      /** organization-agency */
      // championships routes
      { path: '/championships', component: championships },
      { path: '/championships/add', component: addChampionship },
      { path: '/championships/view/:id', component: championship },
      { path: '/championships/start/:id', component: championshipStart },
      { path: '/championships/details/:id', component: championDetails },
      { path: '/championships/requested-teams/:id', component: championship },
      { path: '/championships/accepted-teams/:id', component: championship },
      { path: '/champion/:championId/team-request/:teamId', component: championTeamRequest },

      // journalists routes
      { path: '/journalists', component: journalists },
      { path: '/journalists/add', component: addJournalist },

      // photographers routes
      { path: '/photographers', component: photographers },
      { path: '/photographers/add', component: addPhotographer },

    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
