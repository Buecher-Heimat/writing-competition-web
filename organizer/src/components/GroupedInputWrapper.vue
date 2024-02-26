<!-- <script setup lang="ts">
import { Trash } from 'lucide-vue-next'

const props = defineProps<{
  title: string
  index?: number
}>()
</script>

<template>
  <div class="w-full h-fit border border-bandicoot-400">
    <div
      class="bg-pearl-bush-50 border-b border-bandicoot-400 py-2 px-4 flex flex-row justify-between"
    >
      <h2 class="text-lg font-bold small-caps">{{ title + ' ' + (index ?? '') }}</h2>
      <button class="w-fit flex gap-2 items-center text-warning-600 drop-shadow">
        <Trash class="w-5 h-5" />
        {{ title }} entfernen
      </button>
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template> -->
