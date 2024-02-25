<script setup lang="ts">
import type { Post } from '@/payload';
import { createAgeGroupString } from '@/lib/ageGroups';

defineProps<{
    post: Post;
    link: string;
}>();
</script>

<template>
    <router-link :to="link"
        class="flex gap-4 py-5 px-5 bg-pearl-bush-50 rounded hover:bg-twine-400 hover:text-pearl-bush-50 transition-all duration-300 cursor-pointer">
        <div class="w-1/4">{{ post.author }}</div>
        <div class="w-2/4 truncate ...">{{ post.title }}</div>
        <div class="w-1/12">{{ createAgeGroupString([post.agegroup?.age_start, post.agegroup?.age_end]) }}</div>
        <div class="w-1/12">{{ new Date(post.createdAt).toLocaleDateString("de-DE") }}</div>
    </router-link>
</template>