<script setup lang="ts">
import { useAllCompetitionsStore } from '@/stores/allCompetitions';
import CompetitionCard from '@/components/CompetitionCard.vue';
import BaseLayout from '../layouts/BaseLayout.vue'
import { PlusIcon, ExternalLink } from 'lucide-vue-next';
import { prepareBackendUrl } from '@/lib/utilities';
import { environment } from '@/lib/environment';

const store = useAllCompetitionsStore();

store.getAllCompetitions();

const externalLinks = [
  {
    title: "Datenschutz für Wettbewerbe",
    url: prepareBackendUrl(environment.backendUrl, "/admin/globals/privacy_competition")
  },
  {
    title: "Datenschutz für die Website",
    url: prepareBackendUrl(environment.backendUrl, "/admin/globals/privacy_website")
  },
  {
    title: "Schreibtipps",
    url: prepareBackendUrl(environment.backendUrl, "/admin/globals/writing_tips")
  },
  {
    title: "Allgemeine Anleitung",
    url: prepareBackendUrl(environment.backendUrl, "/admin/globals/instruction_steps")
  }
]
</script>

<template>
  <BaseLayout>
    <div class="w-full h-44 flex items-center justify-center">
      <h1 class="text-4xl text-twine-400 font-serif font-semibold">Willkommen</h1>
    </div>
    <div class="flex gap-20">
      <div v-if="store.allCompetitions.length > 0" class="flex flex-col gap-5">
        <div v-if="store.runningCompetitions.length > 0">
          <h2 class="text-lg font-semibold mb-4">Laufender Wettbewerb</h2>
          <div class="flex flex-col gap-3">
            <CompetitionCard v-for="competition in store.runningCompetitions" :competition="competition" />
          </div>
        </div>
        <div v-if="store.upcomingCompetitions.length > 0">
          <h2 class="text-lg font-semibold mb-4">{{ store.upcomingCompetitions.length > 1 ? "Geplante Wettbewerbe" :
            "Geplanter Wettbewerb" }}</h2>
          <div class="flex flex-col gap-3">
            <CompetitionCard v-for="competition in store.upcomingCompetitions" :competition="competition" />
          </div>
        </div>
        <div v-if="store.pastCompetitions.length > 0">
          <h2 class="text-lg font-semibold mb-4">{{ store.pastCompetitions.length > 1 ? "Abgeschlossene Wettbewerbe" :
            "Abgeschlossener Wettbewerb" }}</h2>
          <div class="flex flex-col gap-3">
            <CompetitionCard v-for="competition in store.pastCompetitions" :competition="competition" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-pearl-bush-50 p-5 flex gap-4 items-center justify-center rounded-lg font-bold text-lg w-full">
          <PlusIcon class="w-6 h-6" />
          Wettbewerb erstellen
        </div>
        <div class="bg-pearl-bush-50 p-5 flex flex-col gap-3 rounded-lg">
          <h2 class="font-bold font-lg">Links zur Anpassung von...</h2>
          <div class="flex flex-col gap-2">
            <a v-for="link in externalLinks" :href="link.url" target="_blank"
              class="text-twine-400 hover:underline flex items-center gap-1">
              {{ link.title }}
              <ExternalLink class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>