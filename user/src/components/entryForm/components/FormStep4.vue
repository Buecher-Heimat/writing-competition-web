<script setup lang="ts">
import { pinia, useEntryFormStore } from "../../../lib/entryFormStore";
import CheckboxElement from "./misc/CheckboxElement.vue";
import DetailsElement from './misc/DetailsElement.vue';

const props = defineProps<{
    title: string;
    description: string;
    currentStep: number;
}>();

const store = useEntryFormStore(pinia);
</script>

<template>
    <div class="flex justify-center items-center py-10 px-20 lg:px-5 xs:px-0 gap-20">
        <div class="flex justify-center gap-20 w-full flex-wrap">
            <div class="flex flex-col justify-start w-1/3 2xl:w-full max-w-2xl relative">
                <div class="flex flex-col max-w-sm z-10">
                    <h1 class="small-caps font-serif text-3xl font-bold text-pearl-bush-950 mb-4">{{ title }}
                    </h1>
                    <p class="font-bold text-bandicoot-400 leading-tight">{{ description }}</p>
                </div>
                <div class="flex flex-col gap-5 mt-5">
                    <DetailsElement title="Teilnahmebedingungen">
                        <div class="text-bandicoot-400 prose" v-html="store.competition?.terms_conditions_html"></div>
                    </DetailsElement>
                    <DetailsElement class="w-full" title="Datenschutzerklärung">
                        <div class="text-bandicoot-400 prose" v-html="store.privacy.privacy_html"></div>
                    </DetailsElement>
                </div>
            </div>
            <div class="max-w-2xl w-full flex flex-col gap-5 z-10">
                <div v-if="store.formData.age_author < 18"
                    class="border-2 border-warning-600 text-warning-600 bg-white rounded-lg p-5">
                    <h3 class="text-lg font-bold">Zustimmung Deiner Erziehungsberechtigten notwendig!</h3>
                    <p class="font-medium">Du bist noch nicht volljährig. Das heißt, dass wir zusätzlich zu Deiner
                        Zustimmung auch die
                        Zustimmung Deiner Erziehungsberechtigten zu den unten genannten Punkten brauchen. Die geben sie
                        bitte persönlich in der <span class="small-caps">Bücher-Heimat</span> ab.</p>
                </div>

                <CheckboxElement v-model="store.formData.accept_privacy"
                    title="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu.*" />
                <CheckboxElement v-model="store.formData.accept_terms"
                    title="Ich habe die Teilnahmebedingungen gelesen und akzeptiere sie.*" />
                <hr class="my-2">
                <CheckboxElement v-model="store.formData.delete_after_competition"
                    title="Meinen Text nach Ende des Wettbewerbs löschen." />
                <CheckboxElement v-model="store.formData.keep_if_winner"
                    :class="{ 'opacity-50 pointer-events-none': !store.formData.delete_after_competition }"
                    title="Sollte mein Text zu den Gewinnern gehören/für eine Buchveröffentlichung ausgewählt werden, ziehe ich meinen „Löschwunsch“ zurück." />

            </div>
        </div>
    </div>
</template>