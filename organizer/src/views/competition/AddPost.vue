<script setup lang="ts">
import PostForm from '@/components/PostForm.vue';
import router from '@/router';
import { useCompetitionStore } from '@/stores/competition';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';


const store = useCompetitionStore();
const route = useRoute();

const defaultPost = {
    title: '',
    author: '',
    email: '',
    _verified: true,
    phone: '',
    age_author: 0,
    agegroup: {
        age_start: 0,
        age_end: 0,
    },
    delete_after_competition: false,
    approved_by_organizer: false,
    content: '',
    competition: computed(() => store.competition),
};

let post = ref(defaultPost);
const error = ref('');

async function createPost() {
    const toInbox = !post.value.approved_by_organizer;
    error.value = '';
    error.value = await store.createPost(post.value) as string;
    if (!error.value) {
        router.push("/wettbewerb/" + route.params.competitionId + "/texte/" + (toInbox ? "inbox" : "angenommen"));
    }
}
</script>
<template>
    <div class="w-full relative">
        <div class="px-10">
            <h1 class="my-10 font-bold text-2xl font-serif small-caps text-twine-400">Text einreichen</h1>
            <p v-if="error" class="mb-5 text-warning-600">Es ist ein Fehler beim Einreichen aufgetreten! Bitte überprüfe
                deine
                Eingaben.</p>
            <div class="w-full flex justify-center">
                <PostForm :maxLength="1000" :minLength="10" v-model="post" @save="createPost" />
            </div>
        </div>
    </div>
</template>

<style>
.loader {
    animation: spin 2s linear infinite;
}
</style>