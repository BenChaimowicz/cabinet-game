import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../components/Register/RegisterForm.vue';
import LoginForm from '../components/Login/LoginForm.vue';
import Scenario from '../components/Scenario/Scenario.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/register', name: 'Register', component: RegisterForm },
    { path: '/login', name: 'Login', component: LoginForm },
    { path: '/scenario/:id', name: 'Scenario', component: Scenario },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;