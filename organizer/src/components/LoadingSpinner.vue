<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
</script>

<template>
    <div
        class="absolute h-full w-full bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-grey/30 backdrop-blur-sm z-[41]">
        <Loader2 class="loader text-twine-400 h-10 w-10" />
    </div>
</template>


<style scoped>
.loader {
    animation: spin 2s linear infinite;
}
</style>