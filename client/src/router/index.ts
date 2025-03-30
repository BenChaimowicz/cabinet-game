import RegisterForm from '../components/Register/RegisterForm.vue';
import LoginForm from '../components/Login/LoginForm.vue';

const routes = [
    // { path: '/', name: 'Home', component: Home },
    { path: '/register', name: 'Register', component: RegisterForm },
    { path: '/login', name: 'Login', component: LoginForm },
]

export default routes;