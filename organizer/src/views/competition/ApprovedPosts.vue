<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition'
import PostTableItem from '@/components/PostTableItem.vue';

const store = useCompetitionStore();
</script>

<template>
    <div class="px-10">
        <h1 class="my-10 font-bold text-2xl font-serif small-caps text-twine-400">Freigeschaltete Texte</h1>
        <div v-if="store.approvedPosts.length > 0">
            <div class="flex gap-4 py-2 px-5 border-b-2 border-bandicoot-400 mb-4 font-bold">
                <div class="w-1/4">Autor*in</div>
                <div class="w-2/4">Titel</div>
                <div class="w-1/12">Altersgruppe</div>
                <div class="w-1/12">Datum</div>
            </div>
            <div class="flex flex-col gap-2">
                <PostTableItem v-for="post in store.approvedPosts" :post="post"
                    :link="`/wettbewerb/${$route.params.competitionId}/texte/${post.slug}/angenommen`" :key="post.id" />
            </div>
        </div>
        <div v-else>
            <p>Es gibt noch keine freigeschalteten Texte</p>
        </div>
    </div>
</template>