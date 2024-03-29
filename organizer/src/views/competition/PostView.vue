<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Trash, Check, ChevronLeft, ArrowLeft } from 'lucide-vue-next';
import { createAgeGroupString } from '@/lib/ageGroups';
import Modal from '@/components/Modal.vue';
import router from '@/router';
import DOMPurify from "isomorphic-dompurify";

const store = useCompetitionStore();
const route = useRoute();

const postId = route.params.postId as string;

const post = computed(() => store.getPostBySlug(postId));

const action = route.params.action
const isApproving = action === "annehmen";

const previousPostSlug = computed(() => getPreviousPostSlug());
const nextPostSlug = computed(() => getNextPostSlug());

const showApproveModal = ref(false);
const showDeleteModal = ref(false);

const backLink = getBackLink();

function getBackLink() {
    if (action === "annehmen") {
        return `/wettbewerb/${route.params.competitionId}/texte/inbox`;
    } else if (action === "gewinner-auswaehlen") {
        return `/wettbewerb/${route.params.competitionId}/gewinner`;
    } else if (action === "angenommen") {
        return `/wettbewerb/${route.params.competitionId}/texte/angenommen`;
    } else {
        return `/wettbewerb/${route.params.competitionId}/`;
    }
}

function acceptPost() {
    store.approvePost(post.value?.id as string);
    showApproveModal.value = false;
    navigateToBackLink();
}

function deletePost() {
    store.deletePost(post.value?.id as string);
    showDeleteModal.value = false;
    navigateToBackLink();
}

function nextPost() {
    const slug = getNextPostSlug();
    if (slug) {
        return navigateToPost(slug);
    }
    return "";
}

function previousPost() {
    const slug = getPreviousPostSlug();
    if (slug) {
        return navigateToPost(slug);
    }
    return "";
}

function navigateToPost(slug: string) {
    const action = isApproving ? "annehmen" : "angenommen";
    router.push(`/wettbewerb/${route.params.competitionId}/texte/${slug}/${action}`);
}

function navigateToBackLink() {
    router.push(backLink);
}

function getNextPostSlug() {
    const posts = isApproving ? store.pendingPosts : store.approvedPosts;

    const index = posts.findIndex((p) => p.slug === postId);
    if (index === -1) {
        return null;
    }
    if (index === posts.length - 1) {
        return null;
    }
    return posts[index + 1].slug;

}

function getPreviousPostSlug() {
    const posts = isApproving ? store.pendingPosts : store.approvedPosts;

    const index = posts.findIndex((p) => p.slug === postId);
    if (index === -1) {
        return null;
    }
    if (index === 0) {
        return null;
    }
    return posts[index - 1].slug;

}
</script>

<template>
    <div class="relative h-screen max-h-screen overflow-hidden">
        <div @click="navigateToBackLink" class="flex relative gap-2 items-center font-bold text-lg p-10 cursor-pointer">
            <ArrowLeft class="w-6 h-6 text-bandicoot-400" />
            Zurück zur Übersicht
        </div>
        <div class="h-full overflow-y-scroll flex-1 relative pb-96">
            <div class="pt-10 md:pt-20 w-full flex flex-col items-center justify-center relative z-10">
                <div class="bg-pearl-bush-50 rounded-lg max-w-3xl w-full p-8 mb-5">
                    <ul>
                        <li><span class="font-bold">Autor:</span> {{ post?.author }}</li>
                        <li><span class="font-bold">Email:</span> {{ post?.email }}</li>
                        <li><span class="font-bold">Telefon:</span> {{ post?.phone ? post?.phone : "Nicht angegeben" }}</li>
                        <li><span class="font-bold">Altersgruppe:</span> {{ createAgeGroupString([post?.agegroup?.age_start,
                        post?.agegroup?.age_end]) }}
                            Jahre </li>
                        <li><span class="font-bold">Erstellt am:</span> {{
                            new Date(post?.createdAt as string).toLocaleDateString(
                                "de-DE",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                },
                            )
                        }}</li>
                        <hr class="my-2">
                        <li>{{ post?.winner ? '✅' : '❌ Kein' }} Gewinner</li>
                        <li>{{ post?.approved_by_organizer ? '✅' : '❌ Nicht' }} Freigeschaltet</li>
                        <li>{{ post?.delete_after_competition ? '❌' : '✅' }} Muss{{ post?.delete_after_competition ? '' :
                            ' nicht' }} nach Ende des Wettbewerbs gelöscht werden
                        </li>
                        <li>{{ post?.keep_if_winner ||
                            !post?.delete_after_competition ? '✅' : '❌' }}
                            {{ post?.keep_if_winner ||
                                !post?.delete_after_competition ?
                                'Darf veröffentlicht werden, falls der Text gewinnt' :
                                'Muss selbst im Falle eines Gewinns gelöscht werden' }}
                        </li>
                    </ul>
                </div>
                <div class="bg-pearl-bush-50 md:bg-transparent p-8 xs:p-4 rounded-2xl max-w-3xl w-full">
                    <h1 class="text-twine-400 font-bold text-5xl small-caps font-serif xs:text-4xl pb-5">
                        {{ post?.title }}
                    </h1>
                    <div v-html="DOMPurify.sanitize(post?.content || '')" class="prose font-serif" />
                </div>
            </div>
        </div>
        <div class="absolute bottom-10 left-0 right-0 z-10 flex justify-center" v-if="action !== 'gewinner-auswaehlen'">
            <Modal :visible="showApproveModal">
                <h3 class="font-sans small-caps font-bold text-2xl mb-4">Post freischalten</h3>
                <p v-if="post?.age_author && post?.age_author < 18"
                    class="rounded text-warning-600 border-2 border-warning-600 p-3 mb-4 font-semibold">Die Autor*in
                    ist minderjährig! Wurde die Teilnahmeerlaubnis der Erziehungsberechtigten bereits abgegeben?</p>
                <p class="font-semibold">Möchtest Du den Post freischalten? Der Post wird
                    sofort veröffentlicht und die Autor*in wird benachrichtigt.</p>
                <div class="flex justify-end gap-5 mt-5">
                    <button @click="showApproveModal = false"
                        class="border-2 border-twine-400 text-twine-400 font-bold small-caps px-4 py-1 rounded-lg">
                        Abbrechen
                    </button>
                    <button @click="acceptPost"
                        class="bg-twine-400 text-pearl-bush-50 font-bold small-caps px-4 py-1 rounded-lg">
                        Freischalten
                    </button>
                </div>
            </Modal>
            <Modal :visible="showDeleteModal" :warning="true">
                <h3 class="font-sans small-caps font-bold text-2xl mb-4">Post löschen</h3>
                <p class="rounded text-warning-600 border-2 border-warning-600 p-3 mb-4 font-semibold">Achtung:
                    Diese Aktion ist
                    nicht
                    rücknehmbar! </p>
                <p class="font-semibold">Möchtest Du den Post wirklich löschen? Du kannst ihn danach nicht
                    wiederherstellen!</p>
                <div class="flex justify-end gap-5 mt-5">
                    <button @click="showDeleteModal = false"
                        class="border-2 border-warning-600 text-warning-600 font-bold small-caps px-4 py-1 rounded-lg">
                        Abbrechen
                    </button>
                    <button @click="deletePost"
                        class="bg-warning-600 text-pearl-bush-50 font-bold small-caps px-4 py-1 rounded-lg">
                        Löschen
                    </button>
                </div>
            </Modal>
            <div class="flex gap-5">
                <div @click="previousPost()"
                    class="rounded-full p-2 bg-pearl-bush-50 hover:bg-bandicoot-400 hover:text-pearl-bush-50 transition-all duration-300 shadow border-2 cursor-pointer border-bandicoot-400"
                    :class="{ 'invisible': !previousPostSlug }">
                    <ChevronLeft class="w-6 h-6" />
                </div>
                <div class="flex gap-3">
                    <button @click="showDeleteModal = true"
                        class="flex gap-2 items-center text-warning-600 bg-pearl-bush-50 rounded-lg border-2 border-warning-600 px-3 py-2 shadow">
                        <Trash class="w-5 h-5 text-warning-600" />
                        Löschen
                    </button>
                    <button @click="showApproveModal = true" v-if="isApproving && !post?.approved_by_organizer"
                        class="flex gap-2 items-center text-pearl-bush-50 bg-bandicoot-400 rounded-lg px-3 py-2 shadow">
                        <Check class="w-5 h-5 " />
                        Freischalten
                    </button>
                </div>
                <div @click="nextPost()"
                    class="rounded-full p-2 bg-pearl-bush-50 hover:bg-bandicoot-400 hover:text-pearl-bush-50 transition-all duration-300 shadow border-2 cursor-pointer border-bandicoot-400"
                    :class="{ 'invisible': !nextPostSlug }">
                    <ChevronLeft class="w-6 h-6 transform rotate-180" />
                </div>
            </div>
        </div>
    </div>
</template>