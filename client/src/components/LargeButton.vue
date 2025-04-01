<script setup lang="ts">
    defineProps<{
        text: string
        disabled?: boolean
        loading?: boolean
    }>()
</script>

<template>
    <button :disabled="disabled || loading" :class="{ 'loading': loading }">
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
        position: relative;
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

    button.loading::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 20px;
        background-color: #333;
        animation: pulse 1.5s ease-in-out infinite;
    }

    button.loading {
        background-color: transparent;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(0.95);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
