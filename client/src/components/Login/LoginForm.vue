
<script setup lang="ts">
    import SmallInput from '../SmallInput.vue';
    import LargeButton from '../LargeButton.vue';
    import { ref } from 'vue';

    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    
    const apiUrl = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;
    const login = async () => {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email: email.value, password: password.value })
            })
            const data = await response.json()
            console.log(data);
            loading.value = false
        } catch (error) {
            console.error(error)
            loading.value = false
        }
    }
</script>

<template>
    <main>
        <h1>Welcome!</h1>
        <div>
            <SmallInput placeholder="Email" v-model="email" />
            <SmallInput placeholder="Password" v-model="password" />
            <LargeButton text="Login" @click="login" :loading="loading" />
        </div>
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
</style>