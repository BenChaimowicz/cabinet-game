<script setup lang="ts">
    import { provide, ref, watchEffect } from 'vue';
    import { useRoute } from 'vue-router';
    import type { User } from '../../types';

    const route = useRoute();

    const user = ref<User | null>(null);
    const isLoading = ref(false);

    const fetchUser = async (userId: string) => {
        try {
            const response = await fetch(`/api/lord/${userId}`);
            user.value = await response.json();
        } catch (error) {
            console.error('Error fetching user:', error);
        }
        isLoading.value = false;
    }

    watchEffect(() => {
        const userId = route.params.userId as string;
        if (userId) {
            fetchUser(userId);
        } else {
            isLoading.value = false;
        }
    });

    provide('user', user);
</script>

<template>
    <div>
        <h1>{{ user?.name || 'Loading...' }}</h1>
        <router-view />
    </div>
</template>

<style scoped>

</style>


