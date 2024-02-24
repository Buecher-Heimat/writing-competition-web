<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
</script>
<template>
    <BaseLayout>
        <div class="w-screen h-screen flex flex-col gap-5 items-center justify-center">
            <h1 class="text-4xl text-twine-400 font-serif font-semibold">404 - Seite nicht gefunden</h1>
            <router-link to="/"
                class="text-pearl-bush-50 bg-twine-400 py-2 px-4 rounded-lg font-semibold hover:underline">Zurück zur
                Startseite</router-link>
        </div>
    </BaseLayout>
</template>