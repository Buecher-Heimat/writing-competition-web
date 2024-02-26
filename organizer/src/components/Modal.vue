<script setup lang="ts">
defineProps<{
    visible: boolean;
    warning?: boolean;
}>();
</script>
<template>
    <div v-if="visible">
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
        <div class="fixed inset-0 flex justify-center items-center z-50">
            <div class="bg-white p-5 rounded-xl max-w-md w-full" :class="{
                'border-4 border-warning-600 text-warning-600': warning,
                'border-4 border-bandicoot-400': !warning

            }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>