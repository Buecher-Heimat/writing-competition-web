<script setup lang="ts">
import { environment } from '@/lib/environment';
import type { Media, Competition } from '@/payload';

defineProps<{
    competition: Competition
}>();
</script>

<template>
    <router-link :to="`/wettbewerb/${competition.slug}`"
        class="bg-pearl-bush-50 p-5 border-2 border-bandicoot-400 rounded-lg shadow-md flex gap-5">
        <div v-if="(competition.image_hero as Media).url">
            <img :src="environment.backendUrl + (competition.image_hero as Media).url!" alt="Bild des Wettbewerbs"
                class="h-20 w-32 object-cover rounded-lg">
        </div>
        <div>
            <h1 class="font-serif small-caps font-bold text-xl mb-4">{{ competition.title }}</h1>
            <div class="bg-bandicoot-400 flex gap-2 rounded-md w-[fit-content] px-2 py-1 font-semibold text-pearl-bush-50">
                {{ new Date(competition.date_start).toLocaleDateString("de-DE") }}
                <span class="font-thin">bis</span>
                {{ new Date(competition.date_end).toLocaleDateString("de-DE") }}
            </div>
        </div>
    </router-link>
</template>