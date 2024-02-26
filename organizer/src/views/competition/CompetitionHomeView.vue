<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition'
import { prepareBackendUrl } from '@/lib/utilities'
import { environment } from '@/lib/environment'
import { ExternalLink } from 'lucide-vue-next'
import type { Media } from '@/payload'

const store = useCompetitionStore()
</script>

<template>
  <div class="flex justify-center p-10 h-screen items-center">
    <div class="max-w-2xl w-full flex flex-col items-center gap-8 -mt-20">
      <img
        class="min-w-[24rem] md:min-w-0 w-[24rem] h-[24rem] rounded-2xl shadow-2xl object-cover"
        :src="environment.backendUrl + (store.competition.image_hero as Media).url"
        :alt="(store.competition.image_hero as Media).alt || 'Titelbild'"
      />
      <h1
        class="text-twine-400 text-center font-bold font-serif small-caps text-7xl leading-[6rem]"
      >
        {{ store.competition.title }}
      </h1>
      <a
        :href="
          prepareBackendUrl(
            environment.backendUrl,
            `/admin/collections/competitions/${store.competition.id}`
          )
        "
      >
        <div
          class="bg-pearl-bush-50 p-5 flex gap-1 items-center justify-center rounded-lg font-bold text-lg w-full hover:bg-bandicoot-400 hover:text-pearl-bush-50 cursor-pointer transition-all duration-300 ease-in-out"
        >
          Wettbewerb bearbeiten
          <ExternalLink class="w-4 h-4" />
        </div>
      </a>
    </div>
  </div>
</template>
