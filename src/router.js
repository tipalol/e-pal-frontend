// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Registration from './pages/registration/Registration.vue';
import MainPage from './pages/main/Main.vue';
import Profile from "./pages/profile/Profile.vue";
import ProfileSettings from "./pages/profile/settings/ProfileSettings.vue";

const routes = [
    { path: '/', component: MainPage },
    { path: '/registration', component: Registration },
    { path: '/profile', component: Profile },
    { path: '/profile/settings', component: ProfileSettings }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
