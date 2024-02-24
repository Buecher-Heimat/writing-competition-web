<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";
import Editor from "@/components/Milkdown.vue";
import type { CreatePostInput } from "@/stores/competition";
import InputWrapper from "./InputWrapper.vue";
import { checkIfAgeIsInRange } from "@/lib/ageGroups";
import { ref, watch } from "vue";

const model = defineModel<CreatePostInput>({ required: true, type: Object });
const contentLength = ref(0);

const validation = [
    {
        message: () => 'Es gibt keine passende Altersgruppe. An dem Wettbewerb kann nicht teilgenommen werden.',
        validate: () => {
            return model.value.competition.agegroups?.some((agegroup) => {
                return checkIfAgeIsInRange(model.value.age_author, [agegroup.age_start, agegroup.age_end]);
            });
        }
    },
    {
        message: () => 'Der Text ist zu kurz.',
        validate: () => {
            return model.value.content.length >= model.value.competition.text_min_length;
        }
    },
    {
        message: () => 'Der Text ist zu lang.',
        validate: () => {
            return model.value.content.length <= model.value.competition.text_max_length;
        }
    },
    {
        message: () => 'Der Name des Autors ist ungültig.',
        validate: () => {
            return model.value.author.length > 0;
        }
    },
    {
        message: () => 'Die E-Mail-Adresse des Autors ist ungültig.',
        validate: () => {
            return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(model.value.email) && model.value.email?.length <= 250;
        }
    },
    {
        message: () => 'Das Alter des Autors ist ungültig.',
        validate: () => {
            return model.value.age_author > 0;
        }
    },
    {
        message: () => 'Der Titel des Textes ist ungültig.',
        validate: () => {
            return model.value.title.length > 0;
        }
    }
]

watch(() => model.value.age_author, () => {
    model.value.agegroup = model.value.competition.agegroups?.find((agegroup) => {
        return checkIfAgeIsInRange(model.value.age_author, [agegroup.age_start, agegroup.age_end]);
    });
});

const showHints = ref(false);
const emit = defineEmits(['save']);
</script>

<template>
    <div class="max-w-2xl w-full">
        <form @submit.prevent="() => {
            emit('save');
        }">
            <InputWrapper title="Autor *" description="Der Name des/der Autor*in">
                <input v-model="model.author" type="text" required
                    class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400" />
            </InputWrapper>
            <InputWrapper title="E-Mail-Adresse *" description="Die E-Mail-Adresse des/der Autor*in">
                <input v-model="model.email" type="email" required
                    class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400" />
            </InputWrapper>
            <InputWrapper title="Telefonnummer"
                description="Die Telefonnummer des/der Autor*in. Sie anzugeben ist nicht verpflichtend">
                <input v-model="model.phone" type="tel"
                    class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400" />
            </InputWrapper>
            <InputWrapper title="Alter *"
                description="Das Alter des/der Autor*in. Es wird zur Bestimmung der Altersgruppe sowie der Volljährigkeit benötigt.">
                <input v-model="model.age_author" type="number" required
                    class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400" />
            </InputWrapper>
            <InputWrapper title="Titel *" description="Der Titel des Textes">
                <input v-model="model.title" type="text" id="title" required
                    class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400" />
            </InputWrapper>
            <InputWrapper title="Inhalt *" description="Füge hier den Inhalt des Textes ein">
                <MilkdownProvider>
                    <Editor v-model="model.content" :title="model.title" :max-length="model.competition.text_max_length"
                        :min-length="model.competition.text_min_length" @update:content-length="(l) => contentLength = l"
                        class="h-96" />
                </MilkdownProvider>
            </InputWrapper>
            <div class="flex gap-5 items-center mt-5">
                <input v-model="model.delete_after_competition" type="checkbox" id="title"
                    class="bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400" />
                <div>
                    <label class="block font-bold small-caps">
                        Nach dem Wettbewerb löschen
                    </label>
                    <p class="text-sm">
                        Möchte der/die Autor*in, dass der Text nach Ende des Wettbewerbs gelöscht wird?
                    </p>
                </div>
            </div>
            <div class="flex gap-5 items-center mt-5">
                <input v-model="model.approved_by_organizer" type="checkbox" id="title"
                    class="bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400" />
                <div>
                    <label class="block font-bold small-caps">
                        Direkt freischalten
                    </label>
                    <p class="text-sm">
                        Ob der Text mit dem Hochladen auch freigeschaltet und veröffentlicht wird.
                    </p>
                </div>
            </div>
            <p v-if="model.age_author && model.age_author < 18"
                class="rounded text-warning-600 border-2 border-warning-600 p-3 mb-4 font-semibold mt-5">Der/die Autor*in
                ist minderjährig! Wurde die Teilnahmeerlaubnis der Erziehungsberechtigten bereits abgegeben?</p>
            <div class="relative mt-5 mb-20">
                <div class="absolute bottom-16 w-full z-20 flex flex-col gap-1" v-if="showHints">
                    <p v-for="v in validation.filter(v => !v.validate())"
                        class="rounded text-pearl-bush-50 bg-warning-600 p-3 font-semibold">
                        {{ v.message() }}
                    </p>
                </div>
                <button type="submit" class="w-full p-4 text-pearl-bush-50 font-bold rounded-lg"
                    :disabled="!validation.every(v => v.validate())" :class="{
                        'bg-twine-400': validation.every(v => v.validate()),
                        'bg-twine-400/50 cursor-not-allowed': !validation.every(v => v.validate())
                    }" @mouseenter="showHints = true" @mouseleave="showHints = false">Speichern</button>
            </div>
        </form>
    </div>
</template>