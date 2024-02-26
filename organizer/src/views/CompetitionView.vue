<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { environment } from '@/lib/environment';
import { useCompetitionStore } from '@/stores/competition';
import { useRoute } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import type { Media } from '@/payload';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const route = useRoute();

const store = useCompetitionStore();
store.loadCompetition(route.params.competitionId as string);

const menuItems = [
    {
        title: "Allgemein",
        items: [
            {
                name: "Bearbeiten",
                path: "/wettbewerb/" + route.params.competitionId + "/"
            },
            {
                name: "Gewinner auswählen",
                path: "/wettbewerb/" + route.params.competitionId + "/gewinner",
                alternativePathEndings: ["gewinner-auswaehlen"]
            }
        ]
    },
    {
        title: "Texte",
        items: [
            {
                name: "Texte annehmen",
                path: "/wettbewerb/" + route.params.competitionId + "/texte/inbox",
                alternativePathEndings: ["annehmen"]
            },
            {
                name: "Angenommene Texte",
                path: "/wettbewerb/" + route.params.competitionId + "/texte/angenommen",
                alternativePathEndings: ["angenommen"]
            }
        ]
    },
    {
        title: "Neu erstellen",
        items: [
            {
                name: "Text einreichen",
                path: "/wettbewerb/" + route.params.competitionId + "/texte/hinzufuegen"
            }
        ]
    }
]

function removeTrailingSlash(path: string) {
    return path.replace(/\/$/, '');
}

function isPathActive(menuPath: string, routePath: string, alternativePathEndings: string[] = []) {
    return alternativePathEndings.some((ending) => removeTrailingSlash(routePath).endsWith(removeTrailingSlash(ending))) || removeTrailingSlash(menuPath) === removeTrailingSlash(routePath);
}
</script>

<template>
    <BaseLayout>
        <LoadingSpinner v-if="store.isLoading" />
        <div v-if="store.competition" class="w-screen h-screen flex">
            <div class="h-full w-96 bg-pearl-bush-50 shadow-lg flex-shrink-0">
                <router-link to="/" class="p-5 flex gap-3 items-center">
                    <ArrowLeft class="w-6 h-6" />
                    <h1 class="font-serif font-bold text-lg">Zurück zur Startseite</h1>
                </router-link>
                <div class="p-5 flex gap-3">
                    <img v-if="store.competition.image_hero && (store.competition.image_hero as Media).url"
                        :src="environment.backendUrl + (store.competition.image_hero as Media).url!"
                        alt="Bild des Wettbewerbs" class="h-16 w-16 object-cover rounded-lg">
                    <div>
                        <h2 class="font-bold font-serif text-twine-400 text-xl">{{ store.competition.title }}</h2>
                        <div
                            class="bg-bandicoot-400 flex text-xs mt-2 gap-2 rounded-md w-[fit-content] px-2 py-1 font-semibold text-pearl-bush-50">
                            {{ new Date(store.competition.date_start).toLocaleDateString("de-DE") }}
                            <span class="font-thin">bis</span>
                            {{ new Date(store.competition.date_end).toLocaleDateString("de-DE") }}
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div class="flex flex-col gap-10">
                        <div v-for="(item, index) in menuItems" :key="index">
                            <h4 class="font-bold text-xs small-caps px-5 mb-2">{{ item.title }}</h4>
                            <router-link v-for="(subItem, index) in item.items" :to="subItem.path" :key="index"
                                class=" bg-pearl-bush-50 flex flex-col gap-2 px-5 font-bold small-caps py-2" :class="{
                                    'bg-twine-400 text-pearl-bush-50 ': isPathActive(subItem.path, $route.path, subItem.alternativePathEndings),
                                    'hover:bg-pearl-bush-100 ': !isPathActive(subItem.path, $route.path, subItem.alternativePathEndings)
                                }">
                                {{ subItem.name }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-screen overflow-x-hidden overflow-y-scroll w-full">
                <router-view :key="$route.fullPath"></router-view>
            </div>
        </div>
    </BaseLayout>
</template>