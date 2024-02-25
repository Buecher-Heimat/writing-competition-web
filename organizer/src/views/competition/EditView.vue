<script setup lang="ts">
import CompetitionForm from '@/components/CompetitionForm.vue'
import { useCompetitionStore } from '@/stores/competition'

const store = useCompetitionStore()

function updateCompetition() {
  store.updateCompetition()
}
</script>

<template>
  <div class="px-10">
    <h1 class="my-10 font-bold text-2xl font-serif small-caps text-twine-400">
      Wettbewerb bearbeiten
    </h1>
    <div class="w-full flex justify-center mb-44">
      <CompetitionForm v-model="store.competition" @save="updateCompetition" />
    </div>
  </div>
</template>
