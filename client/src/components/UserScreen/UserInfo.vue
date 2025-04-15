<script setup lang="ts">
    import type { User } from '../../types';
    import { inject } from 'vue';

    const user = inject<User>('user');

</script>

<template>
    <div>
        <h1>{{ user?.name }}</h1>
        <p>{{ user?.email }}</p>
        <p>{{ user?.createdAt }}</p>
        <p>{{ user?.id }}</p>
    </div>
</template>

<style scoped>

</style>


