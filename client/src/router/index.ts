import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../components/Register/RegisterForm.vue';
import LoginForm from '../components/Login/LoginForm.vue';
import Scenario from '../components/Scenario/Scenario.vue';
import UserView from '@/components/UserScreen/UserView.vue';
import UserInfo from '@/components/UserScreen/UserInfo.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/register', name: 'Register', component: RegisterForm },
    { path: '/login', name: 'Login', component: LoginForm },
    { path: '/:userId', component: UserView, props: true, children: [
        { path: '', name: 'User', component: UserInfo },
        { path: 'scenario/:id', name: 'Scenario', component: Scenario },
    ] },
    // { path: '/scenario/:id', name: 'Scenario', component: Scenario },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;