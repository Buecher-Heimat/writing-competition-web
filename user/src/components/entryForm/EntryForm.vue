<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import FormStep1 from './components/FormStep1.vue';
import FormStep2 from './components/FormStep2.vue';
import FormStep3 from './components/FormStep3.vue';
import { pinia, useEntryFormStore } from '../../lib/entryFormStore';
import { checkIfAgeIsInRange } from '../../lib/ageGroups';
import { CheckCircle, X } from 'lucide-vue-next';
import FormStep4 from './components/FormStep4.vue';
import { Vue3Lottie } from 'vue3-lottie';
import { Loader2 } from 'lucide-vue-next';

const store = useEntryFormStore(pinia);
store.loadCompetition();

const showHints = ref(false);

export interface FormStep {
    title: string;
    description: string;
    validation?: {
        field: string;
        message: string;
        validate: () => boolean;
    }[];
    component: typeof FormStep1;
}

const form: FormStep[] = [
    {
        title: 'Legen wir los',
        description: 'Super, dass Du mitmachst! Es dauert auch gar nicht lange, Deinen Text hier einzureichen.',
        validation: [
            {
                field: '',
                message: 'Es läuft gerade kein Wettbewerb. Schau doch später nochmal vorbei!',
                validate: () => {
                    return store.competition !== undefined && store.competition.title !== undefined;
                }
            }
        ],
        component: FormStep1
    },
    {
        title: 'Angaben zu Dir',
        description: 'Erstmal brauchen wir ein paar Informationen über Dich, damit wir Dich kontaktieren und der richtigen Altersgruppe zuordnen können.',
        validation: [
            {
                field: 'age_author',
                message: 'Es gibt keine passende Altersgruppe für Dich! An diesem Wettbewerb kannst Du leider nicht teilnehmen.',
                validate: () => {
                    return store.competition.agegroups?.some((agegroup) => {
                        return checkIfAgeIsInRange(store.formData.age_author, [agegroup.age_start, agegroup.age_end]);
                    });
                }
            },
            {
                field: 'author',
                message: 'Bitte gib Deinen Namen an!',
                validate: () => {
                    return store.formData.author?.length > 0;
                }
            },
            {
                field: 'author',
                message: 'Dein Name ist zu lang! (max. 100 Zeichen)',
                validate: () => {
                    return store.formData.author === undefined || store.formData.author?.length <= 100;
                }
            },
            {
                field: 'email',
                message: 'Deine E-Mail-Adresse ist ungültig!',
                validate: () => {
                    return store.formData.email?.includes('@') && store.formData.email?.length <= 250;
                }
            }
        ],
        component: FormStep2
    },
    {
        title: 'Deinen Text einreichen',
        description: 'Jetzt zum Wichtigsten! Hier musst Du Deinen Text schreiben oder rein kopieren. Wenn Du hier schreibst, wird Dein Fortschritt automatisch gespeichert!',
        validation: [
            {
                field: 'title',
                message: 'Bitte gib Deinem Text einen Titel!',
                validate: () => {
                    return store.formData.title?.length > 0 && store.formData.title !== "Beispieltitel";
                }
            },
            {
                field: 'title',
                message: 'Dein Titel ist zu lang! (max. 100 Zeichen)',
                validate: () => {
                    return store.formData.title === undefined || store.formData.title?.length <= 100;
                }
            },
            {
                field: 'content',
                message: 'Dein Text ist zu kurz! (min. ' + store.competition?.text_min_length + ' Zeichen)',
                validate: () => {
                    return store.formData.content?.length > store.competition?.text_min_length;
                }
            },
            {
                field: 'content',
                message: 'Dein Text ist zu lang! (max. ' + store.competition?.text_max_length + ' Zeichen)',
                validate: () => {
                    return store.formData.content?.length <= store.competition?.text_max_length;
                }
            }
        ],
        component: FormStep3
    },
    {
        title: 'Absenden!',
        description: `Alles klar, der letzte Schritt! Lies die von Dir angegebenen Daten und vor allem Deinen Text noch einmal sorgfältig durch. Wir können kein
                    Lektorat oder Korrektorat anbieten!`,
        validation: [
            {
                field: 'terms',
                message: 'Bitte akzeptiere die Teilnahmebedingungen!',
                validate: () => {
                    return store.formData.accept_terms;
                }
            },
            {
                field: 'privacy',
                message: 'Bitte akzeptiere die Datenschutzerklärung!',
                validate: () => {
                    return store.formData.accept_privacy;
                }
            }
        ],
        component: FormStep4
    }
]

onMounted(() => {
    displayHints();
})

function displayHints() {
    for (let i = 0; i <= store.highestStep; i++) {
        const fieldsWithWarnings: string[] = [];
        const fieldsWithoutWarnings: string[] = [];
        form[i].validation?.forEach((v) => {
            if (!v.validate() && showHints.value) {
                fieldsWithWarnings.push(v.field);
            } else {
                fieldsWithoutWarnings.push(v.field);
            }
        });

        fieldsWithoutWarnings.forEach((field) => {
            if (field !== '')
                document.getElementById(field)?.classList.remove('bg-warning-200');
        });

        fieldsWithWarnings.forEach((field) => {
            if (field !== '')
                document.getElementById(field)?.classList.add('bg-warning-200');
        });
    }
}

watch(() => showHints.value, () => {
    displayHints();
});

watch(store, () => {
    store.highestStep = Math.max(store.highestStep, store.currentStep);
    store.saveToLocalStorage();
    // TODO: This is a hacky way to make sure the hints are displayed correctly. Find a better way to do this.
    setTimeout(() => {
        displayHints();
    }, 1);
}, { deep: true });

watch(() => store.currentStep, (_, oldVal) => {
    store.lastStep = oldVal;
});

function getAnimation() {
    return window.innerWidth > 1648 ? 'rotate' : ''
}

function getShowHints() {
    if (window.innerWidth < 797) {
        showHints.value = false;
    }
}
</script>

<template>
    <div>
        <div class="bg-white rounded-lg p-5 mb-5 border-2 border-warning-600 font-medium text-warning-600 hidden sm:block">
            Wir empfehlen
            Dir, deinen Beitrag an einem PC
            mit einem großen
            Bildschirm und einer Tastatur einzureichen!
        </div>
        <div
            class="w-full min-h-[80vh] bg-white rounded-3xl overflow-hidden shadow-lg relative flex flex-col transition-all duration-300 ease-out">
            <Transition name="fade">
                <div v-if="store.finished || store.loading"
                    class="absolute h-full w-full bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-grey/30 backdrop-blur-sm z-[41]">
                    <Loader2 v-if="store.loading" class="loader text-twine-400 h-10 w-10" />
                    <Vue3Lottie v-if="store.finished" class="absolute z-0" animation-link="/images/animations/party.json"
                        :loop="0" />
                    <div v-if="store.finished"
                        class="bg-white rounded-lg shadow-lg border-bandicoot-400 border-2 relative max-w-sm z-10">

                        <div class="p-5 flex flex-col gap-3">
                            <h3 class="font-bold text-bandicoot-400 text-lg">E-Mail bestätigen</h3>
                            <p class="font-medium text-bandicoot-400">Dein Beitrag zu {{ store.competition?.title }} wurde
                                gesendet. Jetzt musst du nur noch Deine E-Mail Adresse bestätigen, indem Du auf den Link
                                klickst,
                                den wir dir gerade an '{{ store.formData.email }}' geschickt haben.</p>
                            <button class="w-full p-3 bg-twine-400 rounded text-white">Zur Startseite</button>
                        </div>
                    </div>
                </div>
            </Transition>

            <div class="w-full relative z-20">
                <div class="w-full flex justify-between shadow bg-white lg:flex-wrap">
                    <div v-for="(step, index) in form" @click="() => {
                        if (store.highestStep > index - 1) store.currentStep = index;
                    }" class="w-full flex justify-center items-center p-5 lg:py-2 transition-all duration-300 ease-out"
                        :class="{
                            'cursor-pointer': store.highestStep >= index,
                            'cursor-not-allowed': store.highestStep < index,
                            'shadow-inner text-bandicoot-400': store.currentStep === index,
                            'bg-twine-400 text-white': !step.validation?.some((v) => !v.validate()),
                            'bg-warning-600 text-white': step.validation?.some((v) => !v.validate()) && store.highestStep > index,
                        }">
                        <p class="font-sans font-semibold">{{ (index + 1) + ". " + step.title }}</p>
                        <CheckCircle :size="18" v-if="!step.validation?.some((v) => !v.validate())"
                            class="ml-2 flex-shrink-0" />
                    </div>
                    <div class="absolute h-1 bg-twine-400 rounded-r-full -bottom-1 transition-all duration-1000 ease-in-out"
                        :style="{ 'width': ((store.currentStep + 1) / form.length) * 100 + '%' }"></div>
                </div>
            </div>

            <div v-if="store.warning.length > 0" class="w-full flex justify-between p-5 bg-warning-600 text-white z-20">
                {{ store.warning }}
                <div @click="store.warning = ''" class="cursor-pointer">
                    <X />
                </div>
            </div>

            <form class="w-full h-full flex flex-col flex-grow px-5">
                <div class="flex-grow flex items-center h-full relative">
                    <Transition :name="getAnimation()"
                        :enterFromClass="store.currentStep > store.lastStep ? 'rotate-enter-from' : 'rotate-leave-to'"
                        :leaveToClass="store.currentStep > store.lastStep ? 'rotate-leave-to' : 'rotate-enter-from'">
                        <component :is="form[store.currentStep].component" :title="form[store.currentStep].title"
                            :description="form[store.currentStep].description" :currentStep="store.currentStep"
                            class="w-full top-0 bottom-0" />
                    </Transition>
                </div>
                <div class="py-5 flex w-full justify-between flex-shrink-0 z-40">
                    <div>
                        <button @click.prevent="store.currentStep--" v-if="store.currentStep > 0"
                            class="border-bandicoot-400 border-[1px] rounded-lg px-3 py-1 font-serif text-bandicoot-400 text-sm font-medium hover:bg-bandicoot-400 hover:text-white transition-all duration-300 ease">
                            &larr; Zurück</button>
                    </div>
                    <div class="relative">
                        <Transition name="bounce">
                            <div v-if="showHints && form[store.currentStep].validation?.some((val) => !val.validate())"
                                class="absolute bottom-10 right-0 flex flex-col gap-2">
                                <TransitionGroup name="list">
                                    <p v-for="(v, index) in form[store.currentStep].validation?.filter((val) => !val.validate())"
                                        :key="index"
                                        class="text-white leading-tight text-sm font-medium bg-red-400 p-2 rounded-lg w-full"
                                        :class="{ 'opacity-100': showHints }">
                                        {{ v.message }}
                                    </p>
                                </TransitionGroup>
                            </div>
                        </Transition>
                        <button @click.prevent="() => {
                            store.currentStep++;
                            showHints = false;
                        }" v-if="store.currentStep < form.length - 1" :class="{
    'cursor-not-allowed opacity-50 border-bandicoot-400': form[store.currentStep].validation?.some((v) => !v.validate()),
    'bg-bandicoot-400 text-white hover:bg-twine-400': !form[store.currentStep].validation?.some((v) => !v.validate())
}" :disabled="form[store.currentStep].validation?.some((v) => !v.validate())" @mouseenter="showHints = true"
                            @mouseleave="getShowHints"
                            class="border-[1px] rounded-lg px-3 py-1 font-serif text-bandicoot-400 text-sm font-medium transition-all duration-300 ease">
                            Nächster Schritt &rarr;</button>
                        <button @click.prevent="() => {
                            store.submitForm();
                        }" v-if="store.currentStep === form.length - 1" :class="{
    'cursor-not-allowed opacity-50 border-bandicoot-400': form[store.currentStep].validation?.some((v) => !v.validate()),
    'hover:bg-twine-300 text-white bg-twine-400': !form[store.currentStep].validation?.some((v) => !v.validate())
}" :disabled="form[store.currentStep].validation?.some((v) => !v.validate())" @mouseenter="showHints = true"
                            class="border-[1px] rounded-lg px-3 py-1 font-serif text-bandicoot-400 text-sm font-medium transition-all duration-300 ease">
                            Absenden!</button>
                    </div>
                </div>
            </form>
            <div class="absolute w-full h-full md:hidden pointer-events-none translate-all duration-1000 ease-in-out"
                :style="{ 'rotate': store.currentStep * 24 + 'deg' }">
                <img class="scale-75 absolute left-[70%] -top-16 lg:w-28" src="/images/shapes/three.svg" alt="Shapes" />
                <img class="scale-75 absolute -left-[8%] -top-[30%] lg:w-16" src="/images/shapes/two1.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-[34%] -rotate-90 -top-[50%] lg:w-16" src="/images/shapes/two1.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-[35%] -rotate-90 -bottom-[25%] lg:w-16" src="/images/shapes/two1.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute left-[20%] -bottom-10 lg:w-28 -rotate-45" src="/images/shapes/three.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-[55%] -bottom-20 lg:w-10 rotate-12" src="/images/shapes/one.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-[30%] -top-[10%] lg:w-10 rotate-12" src="/images/shapes/one.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-0 -top-[30%] rotate-180 lg:w-28" src="/images/shapes/three.svg"
                    alt="Shapes" />

                <img class="scale-75 absolute left-[25%] top-16 lg:w-28" src="/images/shapes/three.svg" alt="Shapes" />
                <img class="scale-75 absolute left-[8%] top-[30%] lg:w-16" src="/images/shapes/two1.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-[20%] -rotate-90 top-[50%] lg:w-16" src="/images/shapes/two1.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute left-[-4%] bottom-0 lg:w-28 -rotate-45" src="/images/shapes/three.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-[50%] bottom-10 lg:w-10 rotate-12" src="/images/shapes/one.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-[30%] top-[10%] lg:w-10 rotate-12" src="/images/shapes/one.svg"
                    alt="Some shapes" />
                <img class="scale-75 absolute right-0 top-[30%] rotate-180 lg:w-28" src="/images/shapes/three.svg"
                    alt="Shapes" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}

.rotate-move,
/* apply transition to moving elements */
.rotate-enter-active,
.rotate-leave-active {
    transition: all 1s ease;
    z-index: 1;
    position: absolute;
}

.rotate-enter-from {
    opacity: 0;
    transform: rotate(-15deg) translateY(80%);
}

.rotate-leave-to {
    opacity: 0;
    transform: rotate(15deg) translateY(-80%)
}

.loader {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>