import { defineStore } from "pinia";
import axios from "@/axios";
import type { Competition } from "@/payload";

export enum StoreStatus {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export const useAllCompetitionsStore = defineStore({
    id: "allCompetitions",
    state: () => ({
        allCompetitions: [] as Competition[],
        status: StoreStatus.IDLE as StoreStatus,
    }),
    actions: {
        async getAllCompetitions() {
            this.status = StoreStatus.LOADING;
            const response = await axios.get("/competitions");
            this.allCompetitions = response.data.docs as Competition[];
            this.status = StoreStatus.SUCCESS;
        },
    },
    getters: {
        runningCompetitions(): Competition[] {
            return this.allCompetitions.filter(
                (competition) => new Date(competition.date_start) <= new Date() && new Date(competition.date_end) >= new Date()
            );
        },
        upcomingCompetitions(): Competition[] {
            return this.allCompetitions.filter(
                (competition) => new Date(competition.date_start) > new Date()
            );
        },
        pastCompetitions(): Competition[] {
            return this.allCompetitions.filter(
                (competition) => new Date(competition.date_end) < new Date()
            );
        },
    }
});
