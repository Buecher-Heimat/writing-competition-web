<script setup lang="ts">
import CompetitionForm from '@/components/CompetitionForm.vue';
import { useCompetitionStore } from '@/stores/competition';

const store = useCompetitionStore()

</script>

<template>
    <div class="px-10">
        <h1 class="my-10 font-bold text-2xl font-serif small-caps text-twine-400">Wettbewerb bearbeiten</h1>
        <div>
            <CompetitionForm v-model="store.competition" />
        </div>
    </div> 
</template>