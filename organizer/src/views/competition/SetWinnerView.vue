<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';
import WinnerForm from '@/components/WinnerForm.vue';

const store = useCompetitionStore();
</script>
<template>
    <div class="px-10">
        <h1 class="my-10 font-bold text-2xl font-serif small-caps text-twine-400">Gewinner auswählen</h1>
        <div class="flex flex-col gap-10 pb-20">
            <WinnerForm v-for="(agegroup, index) in store.competition.agegroups" :key="index" :agegroup="agegroup"
                :competition-id="($route.params.competitionId as string)">
            </WinnerForm>
        </div>
    </div>
</template>