<script setup lang="ts">
    import { ref } from 'vue';

    const email = ref('')
    const password = ref('')
</script>

<template>
    <main>
        <h1>Register</h1>
        <form>
            <input type="email" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Password" v-model="password" />
            <button type="submit">Register</button>
        </form>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    button {
        padding: 8px 16px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 20px;
        width: fit-content;
        min-width: 100px;
        font-size: 0.9em;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    button:hover {
        background-color: #444;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>