<script setup lang="ts">
import Editor from './editor/Milkdown.vue';
import { MilkdownProvider } from "@milkdown/vue";
import { pinia, useEntryFormStore } from '../../../lib/entryFormStore';
import DetailsElement from './misc/DetailsElement.vue';

const props = defineProps<{
    title: string;
    description: string;
    currentStep: number;
}>();

const store = useEntryFormStore(pinia);
</script>

<template>
    <div class="flex justify-center items-center py-10 lg:px-5 xs:px-0 px-20 gap-20">
        <div class="flex justify-center gap-20 w-full flex-wrap">
            <div class="flex flex-col justify-start w-1/3 2xl:w-full max-w-2xl relative">
                <div class="flex flex-col max-w-sm z-10">
                    <h1 class="small-caps font-serif text-3xl font-bold text-pearl-bush-950 mb-4">{{ title }}
                    </h1>
                    <p class="font-bold text-bandicoot-400 leading-tight">{{ description }}</p>
                </div>
                <div class="flex flex-col gap-5 mt-5">
                    <DetailsElement title="Unsere Vorgaben">
                        <div class="text-bandicoot-400 prose" v-html="store.competition?.terms_conditions_html"></div>
                    </DetailsElement>
                    <DetailsElement title="Schreibtipps">
                        <div class="flex flex-col gap-3">
                            <div v-for="(writingTip, index) in store.writingTips?.tips" :key="index"
                                class="text-bandicoot-400 border-2 p-5 border-bandicoot-400 rounded-lg">
                                {{ writingTip.tip }}
                            </div>
                        </div>
                    </DetailsElement>
                </div>
            </div>
            <div class="max-w-2xl w-full flex flex-col gap-5 ">
                <div class="z-10">
                    <h3 class="text-bandicoot-400 font-medium">Der Titel Deines Textes</h3>
                    <input type="text" id="title" name="title"
                        class="w-full border-2 rounded-lg border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                        v-model="store.formData.title">
                </div>
                <div>
                    <h3 class="text-bandicoot-400 font-medium">Der Inhalt Deines Textes</h3>
                    <MilkdownProvider>
                        <Editor class="h-96" />
                    </MilkdownProvider>
                </div>
            </div>
        </div>
    </div>
</template>