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

    const fetchScenario = async () => {
        const response = await fetch(`/api/scenario/${scenarioId}`)
        const data = await response.json()
        scenario.value = data[0]
    }

    fetchScenario()
</script>

<template>
    <ScenarioViewer :scenario="scenario" />
    <SmallInput placeholder="Enter your response" v-model="response" :button="true"/>
</template>

<style scoped>

</style>

