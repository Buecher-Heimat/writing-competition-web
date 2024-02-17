<script setup lang="ts">
import { defineModel } from 'vue'
const model = defineModel()

const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <div @click="model = !model"
        class="text-bandicoot-400 p-5 font-medium cursor-pointer bg-white border-2 border-bandicoot-400 rounded-lg flex gap-5 items-center z-10 relative">
        <input type="checkbox" name="" id="" v-model="model"
            class="border-2 rounded accent-twine-400 text-twine-400 ring-twine-400 border-bandicoot-400 focus:ring-bandicoot-400 h-5 w-5">
        <div>
            {{ title }}
        </div>
    </div>
</template>