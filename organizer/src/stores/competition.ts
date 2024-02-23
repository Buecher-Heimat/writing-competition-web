import { defineStore } from "pinia";
import axios from "@/axios";
import qs from "qs";
import type { Competition, Post } from "@/payload";

export enum StoreStatus {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export const useCompetitionStore = defineStore({
    id: "competition",
    state: () => ({
        competition: {} as Competition,
        posts: [] as Post[],
        status: StoreStatus.IDLE as StoreStatus,
    }),
    actions: {
        async loadCompetition(competitionId: string) {
            await Promise.all([
                this.getCompetition(competitionId),
                this.getPosts(),
            ]);
        },
        async getCompetition(competitionSlug: string) {
            this.status = StoreStatus.LOADING;

            const query = qs.stringify(
                {
                    where: {
                        slug: { equals: competitionSlug, },
                    },
                },
                {
                    addQueryPrefix: true,
                }
            );

            const response = await axios.get(`/competitions${query}`);
            this.competition = response.data.docs[0] as Competition;
            this.status = StoreStatus.SUCCESS;
        },
        async getPosts() {
            this.status = StoreStatus.LOADING;

            const query = qs.stringify(
                {
                    where: {
                        "competition": { equals: this.competition.id, },
                    },
                    sort: "-date_created",
                    limit: 1000,
                },
                {
                    addQueryPrefix: true,
                }
            );

            const response = await axios.get("/posts" + query);
            this.posts = response.data.docs as Post[];
            this.status = StoreStatus.SUCCESS;
        },
        async approvePost(postId: string) {
            this.status = StoreStatus.LOADING;
            const post = this.posts.find((post) => post.id === postId);
            if (!post) {
                this.status = StoreStatus.ERROR;
                return;
            }
            post.approved_by_organizer = true;
            await axios.patch(`/posts/${postId}`, { approved_by_organizer: true });
            this.status = StoreStatus.SUCCESS;
        },
        async deletePost(postId: string) {
            this.status = StoreStatus.LOADING;
            this.posts = this.posts.filter((post) => post.id !== postId);
            await axios.delete(`/posts/${postId}`);
            this.status = StoreStatus.SUCCESS;
        },
        async setWinner(postId: string, winner: boolean) {
            this.status = StoreStatus.LOADING;
            const post = this.posts.find((post) => post.id === postId);
            if (!post) {
                this.status = StoreStatus.ERROR;
                return;
            }
            post.winner = winner;
            await axios.patch(`/posts/${postId}`, { winner: winner });
            this.status = StoreStatus.SUCCESS;
        },
        getPostsByAgeGroup(age_start: number, age_end: number): Post[] {
            return this.posts.filter((post) => post.age_author >= age_start && post.age_author <= age_end);
        }
    },
    getters: {
        isRunning(): boolean {
            return new Date(this.competition.date_start) <= new Date() && new Date(this.competition.date_end) >= new Date();
        },
        isUpcoming(): boolean {
            return new Date(this.competition.date_start) > new Date();
        },
        isPast(): boolean {
            return new Date(this.competition.date_end) < new Date();
        },
        winnerPosts(): Post[] {
            return this.posts.filter((post) => post.winner);
        },
        approvedPosts(): Post[] {
            return this.posts.filter((post) => post.approved_by_organizer);
        },
        pendingPosts(): Post[] {
            return this.posts.filter((post) => !post.approved_by_organizer);
        },
    }
})