<script setup lang="ts">
import { pinia, useEntryFormStore } from "../../../lib/entryFormStore";

const props = defineProps<{
    title: string;
    description: string;
    currentStep: number;
}>();

const store = useEntryFormStore(pinia);
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="text-sm py-2 text-bandicoot-400 leading-tight font-medium">
            {{ title }}
        </div>
        <div class="flex flex-col max-w-sm items-center">
            <h1 v-if="store.competition.title"
                class="small-caps font-serif text-3xl font-bold text-pearl-bush-950 text-center mb-4">{{
                    store.competition.title }}</h1>
            <p class="font-bold text-bandicoot-400 text-center leading-tight">{{ description }}</p>
        </div>
        <div class="max-w-sm flex flex-col rounded-xl overflow-hidden border-2 border-bandicoot-400 bg-white mt-4">
            <div class="px-4 py-1 text-xs font-bold uppercase text-bandicoot-400 w-full border-b-2 border-bandicoot-400">
                Tipp
            </div>
            <div class="text-sm px-4 py-3 text-bandicoot-400 leading-tight font-medium">Du kannst diesen Tab jederzeit
                schließen und zu einer anderen Zeit fortfahren. Solange Du im gleichen
                Browser bist, wird Dein Fortschritt gespeichert!</div>
        </div>
    </div>
</template>