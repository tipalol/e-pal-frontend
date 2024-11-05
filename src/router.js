import { createRouter, createWebHistory } from 'vue-router';
import Registration from './pages/registration/Registration.vue';
import MainPage from './pages/main/Main.vue';
import ProfileSettings from './pages/profile/settings/ProfileSettings.vue';
import BecomeEpal from './pages/content/BecomeEpal.vue';
import ServicePage from './pages/catalog/EpalsCatalog.vue';
import EpalProfile from "./pages/profile/Profile.vue";
import Categories from "./pages/categories/Categories.vue";
import Orders from "./pages/orders/Orders.vue";
import MySpace from "./pages/my-space/MySpace.vue";

const routes = [
    { path: '/', component: MainPage },
    { path: '/registration', component: Registration },
    { path: '/profile/settings', component: ProfileSettings },
    { path: '/becomeEpal', component: BecomeEpal },
    { path: '/categories', component: Categories },
    { path: '/catalog/:id', component: ServicePage, props: true },
    { path: '/profile/:username', component: EpalProfile, props: true },
    { path: '/orders', component: Orders },
    { path: '/space', component: MySpace },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;