<script setup lang="ts">
    import { computed } from 'vue';
    import LargeButton from './LargeButton.vue';
    const props = defineProps<{
        placeholder: string
        modelValue: string
        disabled?: boolean
        button?: boolean
    }>()
    defineEmits<{
        (e: 'update:modelValue', value: string): void
        (e: 'send', value: string): void
    }>()

    
    const isDisabled = computed(() => props.disabled)
</script>

<template>
    <div class="input-wrapper">
        <input :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value) ?? ''" :disabled="isDisabled" />
        <LargeButton v-if="button" text="Send" @click="$emit('send', modelValue)" :disabled="isDisabled" />
    </div>
</template>

<style scoped>
    .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

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

    .send-button {
        background-color: #444;
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9em;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        margin-left: 10px;

    }
</style>

