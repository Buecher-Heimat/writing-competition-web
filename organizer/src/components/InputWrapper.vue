<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="mb-4">
    <label class="block font-bold small-caps">
      {{ props.title }}
    </label>
    <p class="text-sm">
      {{ props.description }}
    </p>
    <div class="mt-2">
      <slot></slot>
    </div>
  </div>
</template>
