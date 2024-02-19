<script setup lang="ts">
import { ref, watch } from 'vue';
import { Minimize2, Maximize2 } from 'lucide-vue-next';

const props = defineProps<{
    title: string;
}>();

const open = ref(false);

watch(() => open.value, (value) => {
    if (value) {
        document.body.style.overflow = 'hidden'
        document.getElementById('navbar')?.style.setProperty('display', 'none', 'important')
    } else {
        document.body.style.overflow = 'auto'
        document.getElementById('navbar')?.style.removeProperty('display')
    }
});
</script>

<template>
    <div>
        <div @click="open = true" :title="title"
            class="text-bandicoot-400 p-5 font-medium cursor-pointer bg-white border-2 border-bandicoot-400 rounded-lg gap-5 flex justify-between items-center z-10 relative">
            {{ title }}
            <Maximize2 :size="16" />
        </div>

        <div v-if="open"
            class="fixed top-0 left-0 bottom-0 right-0 bg-white bg-opacity-90 z-50 flex justify-center items-center h-full">
            <div
                class="h-[90vh] bg-white flex flex-col overflow-hidden rounded-lg border-2 border-bandicoot-400 max-w-2xl w-full mx-2">
                <div class="flex justify-between px-10 sm:px-5 2xs:px-3 py-5 items-center">
                    <h2 class="text-bandicoot-400 text-lg font-bold">{{ title }}</h2>
                    <button @click="open = false"
                        class="p-2 hover:bg-twine-100 rounded transition-all duration-300 ease-out">
                        <Minimize2 :size="16" class="text-bandicoot-400" />
                    </button>
                </div>
                <div class="w-full overflow-y-scroll h-full px-10 sm:px-5 2xs:px-3 pb-10">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>