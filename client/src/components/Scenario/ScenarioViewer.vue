<script setup lang="ts">
    import { ref } from 'vue'
    import type { Scenario } from '@/types';
    

    const props = defineProps<{
        scenario?: Scenario | null
    }>()
    
</script>


<template>
      <div class="text-content">
    <p class="paragraph">
      {{ props.scenario?.content }}
    </p>
</div>
</template>

<style scoped>
.text-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
}

.paragraph {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #c9c9c9;
    margin-bottom: 1.5em;
}
</style>
