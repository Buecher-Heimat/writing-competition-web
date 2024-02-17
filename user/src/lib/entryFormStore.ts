import { createPinia, defineStore } from "pinia";
import { fetchRunningCompetitions } from "./api";
import type { Competition } from "../payload";

export const pinia = createPinia();

export interface PostCreationInput {
    title: string;
    author: string;
    email: string;
    phone: string | undefined;
    age_author: number;
    agegroup: {
        age_start: number;
        age_end: number;
    }
    permission_publish_forever: boolean;
    accept_terms: boolean;
    accept_privacy: boolean;
    content: string;
    competition: string;
}

const defaultFormData: PostCreationInput = {
    title: "Beispieltitel",
    content: "Schreibe hier Deinen Text. Vielleicht hast Du ihn auch schon in einem anderen Programm geschrieben und kannst ihn hier einfügen. Alles, was Du hier schreibst, wird jederzeit automatisch lokal gespeichert. Viel Erfolg... 🚀"
} as PostCreationInput;

export const useEntryFormStore = defineStore({
    id: "entryForm",
    state: () => ({
        finished: false,
        loading: true,
        warning: "",
        currentStep: JSON.parse(localStorage.getItem("currentStep") || "0") as number,
        lastStep: JSON.parse(localStorage.getItem("lastStep") || "0") as number,
        highestStep: JSON.parse(localStorage.getItem("highestStep") || "0") as number,
        formData: JSON.parse(localStorage.getItem("entryForm") || JSON.stringify(defaultFormData)) as PostCreationInput,
        competition: {} as Competition,
    }),
    actions: {
        async loadCompetition() {
            this.loading = true;
            const competitions = await fetchRunningCompetitions();

            if (competitions.length === 0) {
                this.warning = "Es scheinen keine Wettbewerbe aktiv zu sein.";
                return;
            }

            if (competitions[0].id !== this.formData.competition) {
                if (this.currentStep > 0) {
                    this.warning = "Der aktive Wettbewerb scheint sich seit Deiner letzten Bearbeitung geändert zu haben. Bitte überprüfe Deine Eingaben.";
                }
                this.formData.competition = competitions[0].id;
                this.saveToLocalStorage();
            }

            this.competition = competitions[0];
            this.loading = false;
        },
        submitForm() {
            this.loading = true;
            console.log(JSON.stringify(this.formData));
            console.log("Form submitted!");
            setTimeout(() => {
                this.loading = false;
                this.finished = true;
            }, 2000);
        },
        clearForm() {
            this.formData = {} as PostCreationInput;
            this.currentStep = 0;
            this.saveToLocalStorage();
        },
        clearLocalStorage() {
            localStorage.removeItem("entryForm");
            localStorage.removeItem("currentStep");
            localStorage.removeItem("lastStep");
            localStorage.removeItem("highestStep");
        },
        saveToLocalStorage() {
            localStorage.setItem("entryForm", JSON.stringify(this.formData));
            localStorage.setItem("currentStep", JSON.stringify(this.currentStep));
            localStorage.setItem("lastStep", JSON.stringify(this.lastStep));
            localStorage.setItem("highestStep", JSON.stringify(this.highestStep));
        }
    },
});