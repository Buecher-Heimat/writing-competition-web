<script setup lang="ts">
import { checkIfAgeIsInRange, createAgeGroupString } from '../lib/ageGroups';
import { useCompetitionStore } from '../stores/competition';
import type { Post } from '../payload';
import PostTableItem from './PostTableItem.vue';
import Modal from './Modal.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    agegroup: { age_start?: number | null | undefined, age_end?: number | null | undefined }
    competitionId: string
}>();

const store = useCompetitionStore();

function getPostsByAgegroup(agegroup: { age_start?: number | null | undefined, age_end?: number | null | undefined }, posts: Post[]) {
    return posts.filter((post) => {
        return checkIfAgeIsInRange(post.age_author, [agegroup.age_start, agegroup.age_end]);
    });
}

function makeDeepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

const posts = computed(() => makeDeepCopy<Post[]>(getPostsByAgegroup(props.agegroup, store.approvedPosts)))

async function save() {
    showSaveDialog.value = false

    for (const post of posts.value) {
        await store.setWinner(post.id, post.winner || false)
    }

}

const showSaveDialog = ref(false)
</script>

<template>
    <div>
        <Modal :visible="showSaveDialog">
            <h3 class="font-sans small-caps font-bold text-2xl mb-4">Gewinner festlegen</h3>
            <p class="font-semibold">Die Gewinnertexte werden auf der Online-Plattform als solche markiert und die
                Autor*innen werden benachrichtigt.</p>
            <div class="flex justify-end gap-5 mt-5">
                <button @click="showSaveDialog = false"
                    class="border-2 border-twine-400 text-twine-400 font-bold small-caps px-4 py-1 rounded-lg">
                    Abbrechen
                </button>
                <button @click="save" class="bg-twine-400 text-pearl-bush-50 font-bold small-caps px-4 py-1 rounded-lg">
                    Speichern
                </button>
            </div>
        </Modal>
        <h2 class="font-bold text-xl font-serif small-caps text-bandicoot-400">
            {{
                createAgeGroupString([
                    props.agegroup.age_start,
                    props.agegroup.age_end,
                ])
            }} Jahre
        </h2>
        <div class="flex flex-col gap-2 border-[1px] border-bandicoot-400 p-5 w-full mt-2">
            <p v-if="posts.length === 0">Es gibt keine Einreichungen in dieser Altersgruppe</p>
            <div v-else v-for="post in posts" :key="post.id" class="flex gap-4 items-center w-full">
                <input type="checkbox" name="winner" v-model="post.winner"
                    class="border-2 rounded accent-twine-400 text-twine-400 ring-twine-400 border-bandicoot-400 focus:ring-bandicoot-400 h-5 w-5">
                <PostTableItem :post="post" :link="`/wettbewerb/${competitionId}/texte/${post.slug}/gewinner-auswaehlen`"
                    class="w-full" />
            </div>
        </div>
        <div class="flex gap-3 justify-end mt-2" v-if="posts.length > 0">
            <button @click="showSaveDialog = true" class="bg-bandicoot-400 text-white p-2 rounded">Speichern</button>
        </div>
    </div>
</template>