<script setup lang="ts">
import { pinia, useEntryFormStore } from '../../../lib/entryFormStore';
import AgeGroup from './AgeGroup.vue';

const props = defineProps<{
    title: string;
    description: string;
    currentStep: number;
}>();

const store = useEntryFormStore(pinia);
</script>

<template>
    <div class="flex flex-col items-center justify-center z-10 pt-10">
        <div class="flex flex-col items-center justify-center">
            <div class="flex flex-col max-w-sm items-center">
                <h1 class="small-caps font-serif text-3xl font-bold text-pearl-bush-950 text-center mb-4">{{ title }}</h1>
                <p class="font-bold text-bandicoot-400 text-center leading-tight">{{ description }}</p>
            </div>
        </div>
        <div class="w-full flex gap-x-16 gap-y-5 items-center justify-center mt-16 flex-wrap">
            <div class="max-w-md h-80 w-full p-2 border-[3px] border-bandicoot-400 rounded-xl bg-white">
                <h3 class="text-bandicoot-400 text-lg font-bold">Deine Altersgruppe *</h3>
                <div class="w-full my-8 flex flex-col justify-center items-center font-sans text-bandicoot-400 font-medium">
                    Dein Alter
                    <div id="age_author" class="border-[3px] border-bandicoot-400 py-3 px-7 rounded-lg">
                        <input
                            class="w-20 bg-transparent text-center text-lg p-1 outline-none focus:outline-none focus:ring-0 accent-bandicoot-400 focus:border-bandicoot-400 border-x-0 border-t-0 border-b-2 border-bandicoot-400"
                            type="number" name="age" v-model="store.formData.age_author">
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <ul class="flex flex-wrap items-center justify-center gap-2 max-w-xs">
                        <AgeGroup v-for="(agegroup, index) in store.competition.agegroups"
                            :ageGroup="{ age_start: agegroup.age_start, age_end: agegroup.age_end }" :key="index" />
                    </ul>
                </div>
            </div>
            <div class="max-w-md h-80 w-full p-2 border-[3px] border-bandicoot-400 rounded-xl bg-white">
                <h3 class="text-bandicoot-400 text-lg font-bold">Deine Kontaktdaten</h3>
                <div
                    class="w-full gap-2 mt-2 flex flex-col justify-center items-center font-sans text-bandicoot-400 font-medium">
                    <div class="w-full flex flex-col gap-1">
                        <label for="author" class="text-bandicoot-400">Dein Name *</label>
                        <input
                            class="w-full border-2 rounded-lg border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                            type="text" name="name" id="author" v-model="store.formData.author">
                    </div>
                    <div class="w-full flex flex-col gap-2">
                        <label for="email" class="text-bandicoot-400">Deine E-Mail-Adresse *</label>
                        <input
                            class="w-full border-2 rounded-lg border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                            type="email" id="email" name="email" v-model="store.formData.email">
                    </div>
                    <div class="w-full flex flex-col gap-2">
                        <label for="phone" class="text-bandicoot-400">Deine Telefonnummer</label>
                        <input
                            class="w-full border-2 rounded-lg border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                            type="tel" name="phone" id="phone" v-model="store.formData.phone">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>