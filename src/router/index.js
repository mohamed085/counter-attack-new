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
import editAcceptedTeam from "@/views/admin/teams/edit-accepted-team";
import products from "@/views/admin/products/products";
import requestedOrganizationAgency from "@/views/admin/organization-agencies/requested-organization-agency";
import acceptedOrganizationAgency from "@/views/admin/organization-agencies/accepted-organization-agency";
import product from "@/views/admin/products/product";
import editProduct from "@/views/admin/products/edit-product";
import addProduct from "@/views/admin/products/add-product";

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: login },
    { path: '/', component: home, children: [
        { path: '/', component: main },
        // teams routes
        { path: '/teams-accepted', component: acceptedTeams },
        { path: '/teams-requested', component: requestedTeams },
        { path: '/teams-requested/view/:id', component: requestedTeam },
        { path: '/teams-accepted/view/:id', component: acceptedTeam },
        { path: '/teams-accepted/edit/:id', component: editAcceptedTeam },

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

    ]},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
