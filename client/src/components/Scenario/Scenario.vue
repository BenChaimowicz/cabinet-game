<script setup lang="ts">
    import type { Scenario } from '@/types';
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    import SmallInput from '../SmallInput.vue';
    import ScenarioViewer from './ScenarioViewer.vue';
    
    const route = useRoute()
    const scenarioId = route.params.id

    const scenario = ref<Scenario | null>(null);
    const response = ref('');
    const isLoading = ref(true);

    const fetchScenario = async () => {
        const response = await fetch(`/api/scenario/${scenarioId}`)
        const data = await response.json()
        scenario.value = data[0]
        isLoading.value = false;
    }

    fetchScenario()
</script>

<template>
    <div class="scenario-container">
        <ScenarioViewer :scenario="scenario" :isLoading="isLoading" />
        <SmallInput placeholder="Enter your response" v-model="response" :button="true" :isLoading="isLoading" />
    </div>
</template>

<style scoped>
.scenario-container {
    background-color: var(--color-background-purple-mid);
    border-radius: 22px;
    padding: 20px;
    margin: 20px;
}
</style>

