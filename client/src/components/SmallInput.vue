<script setup lang="ts">
    defineProps<{
        placeholder: string
        modelValue: string
    }>()

    defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()
</script>

<template>
    <input :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value) ?? ''" />
</template>

<style scoped>
    input {
        padding: 8px 16px;
        background-color: #ffffff;
        border: 2px solid #333;
        border-radius: 20px;
        font-size: 0.9em;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        outline: none;
        width: 100%;
        box-sizing: border-box;
    }

    input:focus {
        border-color: #444;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    input::placeholder {
        color: #999;
        font-weight: 400;
    }
</style>

