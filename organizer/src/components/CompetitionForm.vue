<script setup lang="ts">
import type { Competition } from '@/payload';

const model = defineModel<Competition>()
</script>
<template>
    <div>
        <h1>{{ model?.title }}</h1>
    </div>
</template>