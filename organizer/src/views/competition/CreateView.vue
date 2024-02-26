<!-- <script setup lang="ts">
import CompetitionForm from '@/components/CompetitionForm.vue'
import { useCompetitionStore } from '@/stores/competition'

const store = useCompetitionStore()

function createCompetition() {
  store.createCompetition()
}

const defaultCompetition = {
  title: '',
  // image_hero: '',
  date_start: '',
  date_end: '',
  date_winner_announcement: '',
  sponsor_string: '',
  sponsors: [],
  agegroups: [],
  instruction_steps: [],
  text_min_length: 280,
  text_max_length: 11000
}

let competition = ref(defaultCompetition)
</script>

<template>
  <div class="px-10">
    <h1 class="my-10 font-bold text-2xl font-serif small-caps text-twine-400">
      Wettbewerb erstellen
    </h1>
    <div class="w-full flex justify-center mb-44">
      <CompetitionForm v-model="competition" @save="createCompetition" action="create" />
    </div>
  </div>
</template> -->
