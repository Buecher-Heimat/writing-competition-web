<!-- <script setup lang="ts">
import { environment } from '@/lib/environment'
import type { Competition, Media } from '@/payload'
import { FileUp, PlusCircle } from 'lucide-vue-next'
import InputWrapper from './InputWrapper.vue'
import GroupedInputWrapper from './GroupedInputWrapper.vue'
import { computed, ref } from 'vue'
import { createMedia } from '@/lib/utilities'

const props = defineProps<{
  action: 'create' | 'update'
}>()

const model = defineModel<Competition>({ required: true, type: Object })

const dateStart = computed({
  get: () => new Date(model?.value.date_start || '').toISOString().slice(0, 10),
  set: (value: string) => {
    model.value.date_start = value
  }
})

const dateEnd = computed({
  get: () => new Date(model?.value.date_end || '').toISOString().slice(0, 10),
  set: (value: string) => {
    model.value.date_end = value
  }
})

const validation = [
  {
    message: () => 'Der Titel des Wettbewerbs ist ungültig.',
    validate: () => {
      return model.value.title && model.value.title.length > 0
    }
  },
  {
    message: () => 'Der Untertitel des Wettbewerbs ist ungültig.',
    validate: () => {
      return model.value.sponsor_string && model.value.sponsor_string.length > 0
    }
  },
  {
    message: () => 'Das Startdatum des Wettbewerbs ist ungültig.',
    validate: () => {
      return model.value.date_start.length > 0
    }
  },
  {
    message: () => 'Das Enddatum des Wettbewerbs ist ungültig.',
    validate: () => {
      return model.value.date_end.length > 0
    }
  },
  {
    message: () => 'Es wird mindestens eine Altersgruppe benötigt.',
    validate: () => {
      return model.value.agegroups?.length > 0
    }
  },
  {
    message: () => 'Die Altersgruppe(n) ist/sind ungültig.',
    validate: () => {
      return model.value.agegroups?.some((agegroup) => {
        return agegroup.age_start && agegroup.age_start > 0
      })
    }
  },
  {
    message: () => 'Es wird mindestens ein Sponsor benötigt.',
    validate: () => {
      return model.value.sponsors && model.value.sponsors?.length > 0
    }
  },
  {
    message: () => 'Der Name eines oder mehreren Sponsoren ist ungültig.',
    validate: () => {
      return model.value.sponsors?.some((sponsor) => {
        return sponsor.name && sponsor.name.length > 0
      })
    }
  },
  {
    message: () => 'Der Link eines oder mehreren Sponsoren ist ungültig.',
    validate: () => {
      return model.value.sponsors?.some((sponsor) => {
        // TODO: Add a regex to check if the link is valid
        return sponsor.link && sponsor.link.length > 0
      })
    }
  },
  {
    message: () => 'Das Logo eines oder mehreren Sponsoren ist ungültig.',
    validate: () => {
      return model.value.sponsors?.some((sponsor) => {
        return (
          sponsor.logo && (sponsor.logo as Media).url && (sponsor.logo as Media).url!.length > 0
        )
      })
    }
  },
  {
    message: () => 'Es wird mindestens ein Anleitungsschritt benötigt.',
    validate: () => {
      return model.value.instruction_steps?.length > 0
    }
  },
  {
    message: () => 'Der Titel eines oder mehreren Anleitungsschritten ist ungültig.',
    validate: () => {
      return model.value.instruction_steps?.some((step) => {
        return step.title && step.title.length > 0
      })
    }
  },
  {
    message: () => 'Die Beschreibung eines oder mehreren Anleitungsschritten ist ungültig.',
    validate: () => {
      return model.value.instruction_steps?.some((step) => {
        return step.description && step.description.length > 0
      })
    }
  }
]

async function fileUpload(e: SubmitEvent) {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const media = await createMedia(formData)

  model.value.image_hero = media
}

const showHints = ref(false)
const emit = defineEmits(['save'])
</script>
<template>
  <div class="max-w-2xl w-full">
    <form
      @submit.prevent="
        () => {
          emit('save')
        }
      "
      class="flex flex-col gap-8"
    >
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold small-caps">Allgemein</h1>
        <!-- :class="{ "border border-bandicoot-400": model?.image_hero}" -->
        <div class="flex flex-row gap-8">
          <img
            v-if="model?.image_hero"
            :src="environment.backendUrl + (model?.image_hero as Media).url"
            :alt="(model?.image_hero as Media).alt || 'Titelbild'"
            class="h-[15rem] w-[15rem] rounded-lg shadow-lg object-cover"
          />
          <p v-else class="text-bandicoot-400 text-lg"></p>
          <div class="flex flex-col justify-between py-3">
            <div>
              <h2 class="font-bold small-caps mb-1">Titelbild</h2>
              <p class="text-sm">
                Das Titelbild wird an verschiedenen Stellen auf der Webseite genutzt, um eine
                bessere Zielgruppenansprache zu ermöglichen und das Layout freundlicher zu
                gestalten. Es sollte also die Zielgruppe des Wettbewerbs möglichst genau abgebildet
                werden. Außerdem wird das Bild in verschiedenen Seitenverhältnissen angezeigt, an
                den Rändern sollte also nichts Wichtiges zu sehen sein.
              </p>
            </div>
            <form id="upload_form" @submit.prevent="(e) => fileUpload(e as SubmitEvent)">
              <input type="file" name="file" id="image_upload" />
              <button
                type="submit"
                class="w-fit flex gap-2 items-center text-pearl-bush-50 hover:text-twine-400 bg-twine-400 hover:bg-transparent border-twine-400 border rounded-lg px-3 py-2 shadow"
              >
                <FileUp class="w-5 h-5" />
                Hochladen
              </button>
            </form>
          </div>
        </div>
        <InputWrapper title="Titel *" description="Der Titel des Wettbewerbs">
          <input
            :value="model?.title"
            type="text"
            required
            class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
          />
        </InputWrapper>
        <InputWrapper
          title="Untertitle *"
          description="Ein kurzer Satz, der den Wettbewerb genauer beschreibt und ggf. auf den/die Sponsor/en eingeht."
        >
          <input
            :value="model?.sponsor_string"
            type="text"
            required
            class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
          />
        </InputWrapper>
        <InputWrapper
          title="Zeitraum *"
          description="Start und Enddatum des Wettbewerbs. ACHTUNG: Wenn Du einen Wettbewerb planst, der in der Zukunft liegt, wird der auf der Webseite erst angezeigt, sobald der Einreichungszeitraum beginnt."
        >
          <div class="flex flex-row gap-4 items-center">
            <p class="font-bold small-caps mb-1">Von</p>
            <input
              :value="dateStart"
              type="date"
              required
              class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
            />
            <p class="font-bold small-caps mb-1">Bis</p>
            <input
              :value="dateEnd"
              type="date"
              required
              class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
            />
          </div>
        </InputWrapper>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <h1 class="text-2xl font-bold small-caps mb-1">Sponsoren</h1>
          <p class="text-sm">
            Die Sponsoren des Wettbewerbs. Sie werden auf der Webseite und in der Ausschreibung
            genannt.
          </p>
        </div>
        <div v-for="(sponsor, index) in model?.sponsors" :key="index">
          <GroupedInputWrapper title="Sponsor" :index="index + 1">
            <InputWrapper title="Name des Sponsors *">
              <input
                :value="sponsor?.name"
                type="text"
                required
                class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
              />
            </InputWrapper>
            <InputWrapper title="Link zur Sponsoren Webseite *">
              <input
                :value="sponsor?.link"
                type="text"
                required
                class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
              />
            </InputWrapper>
            <div class="flex flex-row gap-8 items-center">
              <div class="w-3/4 flex justify-center">
                <img
                  :src="environment.backendUrl + (sponsor.logo as Media).url"
                  :alt="environment.backendUrl + (sponsor.logo as Media).alt"
                  class="h-[5rem] w-fit shadow-lg object-cover"
                />
              </div>
              <div class="flex flex-col gap-4">
                <div>
                  <h2 class="font-bold small-caps mb-1">Titelbild</h2>
                  <p class="text-sm">
                    Das Logo des Sponsors sollte in einer möglichst nicht zu geringen Auflösung
                    hochgeladen werden.
                  </p>
                </div>
                <form id="upload_form" @submit.prevent="(e) => fileUpload(e as SubmitEvent)">
                  <input type="file" name="file" id="image_upload" />
                  <button
                    type="submit"
                    class="w-fit flex gap-2 items-center text-pearl-bush-50 hover:text-twine-400 bg-twine-400 hover:bg-transparent border-twine-400 border rounded-lg px-3 py-2 shadow"
                  >
                    <FileUp class="w-5 h-5" />
                    Hochladen
                  </button>
                </form>
              </div>
            </div>
          </GroupedInputWrapper>
        </div>
        <button
          class="w-fit flex gap-2 items-center text-bandicoot-400 hover:text-pearl-bush-50 hover:bg-bandicoot-400 border-bandicoot-400 border rounded-lg px-3 py-2 shadow"
        >
          <PlusCircle class="w-5 h-5" />
          Sponsor hinzufügen
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <h1 class="text-2xl font-bold small-caps mb-1">Altersgruppen</h1>
          <p class="text-sm">Die Altersgruppen, die am Wettbewerb teilnehmen können.</p>
        </div>
        <div>
          <div v-for="(ageGroup, index) in model?.agegroups" class="mb-4" :key="index">
            <GroupedInputWrapper title="Altersgruppe" :index="index + 1">
              <div class="flex flex-col gap-4 mb-4">
                <p class="text-sm">
                  Altersspanne für die Teilnehmenden in Jahren von bis. Wird nur der erste Wert
                  eingetragen, ist die Alterspanne nach oben offen. (z.B. 18-25 Jahre, 65+ Jahre)
                </p>
                <div class="flex flex-row gap-4 items-center">
                  <p class="font-bold small-caps mb-1">Von</p>
                  <input
                    :value="ageGroup?.age_start"
                    type="number"
                    required
                    class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                  />
                  <p class="font-bold small-caps mb-1">Bis</p>
                  <input
                    :value="ageGroup?.age_end"
                    type="number"
                    class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                  />
                </div>
              </div>
            </GroupedInputWrapper>
          </div>
        </div>
        <button
          class="w-fit flex gap-2 items-center text-bandicoot-400 hover:text-pearl-bush-50 hover:bg-bandicoot-400 border-bandicoot-400 border rounded-lg px-3 py-2 shadow"
        >
          <PlusCircle class="w-5 h-5" />
          Altersgruppe hinzufügen
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div>
            <h1 class="text-2xl font-bold small-caps mb-1">Anleitungsschritte</h1>
            <p class="text-sm">
              Schritte, die eine Nutzer bei der Teilnahme durchlaufen soll. Es soll Anleiten was
              zutun ist. Zusehen auf der Wettbewerbseite (siehe Bild).
            </p>
          </div>
          <img
            src="../assets/guideStep_example.png"
            alt="Beispielvorschau von zwei Anleitungsschritten"
            class="w-full h-fit rounded-lg shadow-lg"
          />
          <p class="text-sm">
            Die Anleitungsschritte werden auf der Wettbewerbsseite angezeigt und sollen die
            Teilnehmer*innen durch den Prozess der Teilnahme leiten.
          </p>
        </div>
        <div v-for="(step, index) in model?.instruction_steps" :key="index">
          <GroupedInputWrapper title="Schritt" :index="index + 1">
            <InputWrapper title="Titel *">
              <input
                :value="step?.title"
                type="text"
                required
                class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
              />
            </InputWrapper>
            <InputWrapper title="Beschreibung *">
              <input
                :value="step?.description"
                type="text"
                required
                class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
              />
            </InputWrapper>
          </GroupedInputWrapper>
        </div>
        <button
          class="w-fit flex gap-2 items-center text-bandicoot-400 hover:text-pearl-bush-50 hover:bg-bandicoot-400 border-bandicoot-400 border rounded-lg px-3 py-2 shadow"
        >
          <PlusCircle class="w-5 h-5" />
          Sponsor hinzufügen
        </button>
      </div>
      <div>
        <div>
          <h1 class="text-2xl font-bold small-caps mb-1">Texte</h1>
          <p class="text-sm">---</p>
        </div>
        <InputWrapper title="Mindestlänge des Textes *">
          <input
            :value="model?.text_min_length"
            type="number"
            required
            class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
          />
        </InputWrapper>
        <InputWrapper title="Maximallänge des Textes *">
          <input
            :value="model?.text_max_length"
            type="number"
            required
            class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
          />
        </InputWrapper>
      </div>
      <div>
        <h1 class="text-2xl font-bold small-caps mb-1">Teilnahmebedingungen</h1>
        <p class="text-sm">---</p>
        <InputWrapper title="Teilnahmebedingungen *">
          <textarea
            :value="model?.terms_conditions"
            required
            class="w-full bg-transparent border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
          ></textarea>
        </InputWrapper>
      </div>
      <div class="relative mt-5 mb-20">
        <div class="absolute bottom-16 w-full z-20 flex flex-col gap-1" v-if="showHints">
          <p
            v-for="(v, index) in validation.filter((v) => !v.validate())"
            :key="index"
            class="rounded text-pearl-bush-50 bg-warning-600 p-3 font-semibold"
          >
            {{ v.message() }}
          </p>
        </div>
        <button
          type="submit"
          class="w-full p-4 text-pearl-bush-50 font-bold rounded-lg"
          :disabled="!validation.every((v) => v.validate())"
          :class="{
            'bg-twine-400': validation.every((v) => v.validate()),
            'bg-twine-400/50 cursor-not-allowed': !validation.every((v) => v.validate())
          }"
          @mouseenter="showHints = true"
          @mouseleave="showHints = false"
        >
          {{ props.action === 'create' ? 'Erstellen' : 'Aktualisieren' }}
        </button>
      </div>
    </form>
  </div>
</template> -->
