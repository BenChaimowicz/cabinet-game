<script setup lang="ts">
    defineProps<{
        text: string
        disabled?: boolean
    }>()
</script>

<template>
    <button :disabled="disabled">
        {{ text }}
    </button>
</template>

<style scoped>
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

    button:hover:not(:disabled) {
        background-color: #444;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    button:disabled {
        background-color: #666;
        color: #999;
        cursor: not-allowed;
        opacity: 0.7;
    }
</style>
