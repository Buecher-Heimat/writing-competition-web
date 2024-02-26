<script setup lang="ts">
import { useEntryFormStore, pinia } from '../../../lib/entryFormStore';
import { checkIfAgeIsInRange, createAgeGroupString } from '../../../lib/ageGroups';
import { watch } from 'vue';

const props = defineProps<{
    ageGroup: { age_start: number | null | undefined, age_end: number | null | undefined };
}>();

const store = useEntryFormStore(pinia);
</script>

<template>
    <!-- <li class="border-[1px] text-sm border-bandicoot-400 rounded-lg px-2 py-1 text-bandicoot-400"
        :class="{ 'bg-bandicoot-400 text-white': checkIfAgeIsInRange(store.formData.age_author, [props.ageGroup.age_start, props.ageGroup.age_end]) }">
        {{ createAgeGroupString([props.ageGroup.age_start, props.ageGroup.age_end]) }} Jahre
    </li> -->
    <li v-if="checkIfAgeIsInRange(store.formData.age_author, [props.ageGroup.age_start, props.ageGroup.age_end])"
        class="border-[1px] text-sm border-bandicoot-400 rounded-lg px-2 py-1 bg-bandicoot-400 text-white">
        {{ createAgeGroupString([props.ageGroup.age_start, props.ageGroup.age_end]) }} Jahre
    </li>
</template>