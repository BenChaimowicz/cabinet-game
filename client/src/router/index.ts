import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../components/Register/RegisterForm.vue';
import LoginForm from '../components/Login/LoginForm.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/register', name: 'Register', component: RegisterForm },
    { path: '/login', name: 'Login', component: LoginForm },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;