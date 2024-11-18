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
import Order from "./pages/order/Order.vue";
import Balance from "./pages/profile/components/balance/Balance.vue";

const routes = [
    { path: '/', component: MainPage },
    { path: '/registration', component: Registration },
    { path: '/profile/settings', component: ProfileSettings },
    { path: '/profile/balance', component: Balance },
    { path: '/becomeEpal', component: BecomeEpal },
    { path: '/categories', component: Categories },
    { path: '/catalog/:id', component: ServicePage, props: true },
    { path: '/profile/:username', name: 'profile', component: EpalProfile, props: true },
    { path: '/orders', component: Orders },
    { path: '/orders/:id', component: Order, props: true },
    { path: '/space', component: MySpace },
    { path: '/profile', redirect: '/' }, // Перенаправляет на профиль с именем пользователя 'default'
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;