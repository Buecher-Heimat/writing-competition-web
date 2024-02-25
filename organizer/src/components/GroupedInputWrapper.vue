<script setup lang="ts">
const props = defineProps<{
  title: string
  index?: number
}>()
</script>

<template>
  <div class="w-full h-fit border border-bandicoot-400">
    <div class="bg-pearl-bush-50 border-b border-bandicoot-400 py-2 px-4">
      <h2 class="text-lg font-bold small-caps">{{ title + ' ' + (index ?? '') }}</h2>
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>
