<script setup lang="ts">
    import { computed, ref } from 'vue';
    import LargeButton from '../LargeButton.vue';
    import SmallInput from '../SmallInput.vue';
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const isLoading = ref(false)

    const isDisabled = computed(() => {
        return email.value.length === 0 || password.value.length === 0 || confirmPassword.value.length === 0 || password.value !== confirmPassword.value
    })

    const apiUrl = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;
    const register = async () => {
        try {
            isLoading.value = true
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ email: email.value, password: password.value, name: name.value })
            })
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }
</script>

<template>
    <main>
        <h1>Create Your Account</h1>
        <div>
            <SmallInput placeholder="Name" v-model="name" />
            <SmallInput placeholder="Email" v-model="email" />
            <SmallInput placeholder="Password" v-model="password" />
            <SmallInput placeholder="Confirm Password" v-model="confirmPassword" />
            <LargeButton text="Register" :disabled="isDisabled" @click="register" :isLoading="isLoading" />
        </div>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
    }
    div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
</style>