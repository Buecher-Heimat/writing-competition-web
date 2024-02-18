import { createPinia, defineStore } from "pinia";
import { fetchPrivacyCompetition, fetchRunningCompetitions, fetchWritingTips } from "./api";
import type { Competition, PrivacyCompetition, WritingTip } from "../payload";

export const pinia = createPinia();

export interface PostCreationInput {
    title: string;
    author: string;
    email: string;
    phone: string | undefined;
    age_author: number;
    agegroup: {
        age_start: number | null | undefined;
        age_end: number | null | undefined;
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
        privacy: {} as PrivacyCompetition,
        writingTips: {} as WritingTip,
    }),
    actions: {
        async loadData() {
            this.loading = true;
            await Promise.all([
                this.loadCompetition(),
                this.loadPrivacy(),
                this.loadWritingTips(),
            ]);
            this.loading = false;
        },
        async loadCompetition() {
            try {
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
            } catch (error) {
                console.error(error);
                this.warning = "Der aktuelle Wettbewerb konnte nicht geladen werden.";
            }
        },
        async loadPrivacy() {
            try {

                this.privacy = await fetchPrivacyCompetition();
            } catch (error) {
                console.error(error);
                this.warning = "Die Datenschutzerklärung konnte nicht geladen werden.";
            }
        },
        async loadWritingTips() {
            try {
                this.writingTips = await fetchWritingTips();
            } catch (error) {
                console.error(error);
                this.warning = "Die Schreibtipps konnten nicht geladen werden.";
            }
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