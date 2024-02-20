import qs from "qs";
import type { Competition, InstructionStep, Post, PrivacyCompetition, PrivacyWebsite, WritingTip } from "../payload";
import type { PostCreationInput } from "./entryFormStore";

const BASE_URL = import.meta.env.PUBLIC_BACKEND_URL + "/api";

export async function fetchCompetitions(limit: number = 10) {
    const competitionsResponse = await fetch(
        BASE_URL + "/competitions?limit=" + limit + "&depth=3&sort=-date_start",
    );
    const competitionsData = await competitionsResponse.json();
    return competitionsData.docs as Competition[];
}

export async function fetchRunningCompetitions() {
    const query = qs.stringify(
        {
            where: {
                date_start: { less_than_equal: new Date().toISOString() },
                date_end: { greater_than_equal: new Date().toISOString() },
            }
        },
        {
            addQueryPrefix: true,
        }
    );

    const competitionsResponse = await fetch(
        BASE_URL + "/competitions" + query,
    );
    const competitionsData = await competitionsResponse.json();
    return competitionsData.docs as Competition[];
}

export async function fetchPrivacyCompetition() {
    const privacyResponse = await fetch(
        BASE_URL + "/globals/privacy_competition",
    );
    return await privacyResponse.json() as PrivacyCompetition;
}

export async function fetchPrivacyWebsite() {
    const privacyResponse = await fetch(
        BASE_URL + "/globals/privacy_website",
    );
    return await privacyResponse.json() as PrivacyWebsite;
}

export async function fetchWritingTips() {
    const writingTipsResponse = await fetch(
        BASE_URL + "/globals/writing_tips",
    );
    return await writingTipsResponse.json() as WritingTip;
}

export async function fetchInstructionSteps() {
    const instructionStepsResponse = await fetch(
        BASE_URL + "/globals/instruction_steps",
    );
    return await instructionStepsResponse.json() as InstructionStep;
}

export async function fetchRecentPosts(limit: number = 10) {
    const recentPostsResponse = await fetch(
        BASE_URL + "/posts?sort=-date_created&limit=" + limit,
    );
    const recentPostsData = await recentPostsResponse.json();
    return recentPostsData.docs as Post[];
}

export async function createPost(data: PostCreationInput) {
    const response = await fetch(
        BASE_URL + "/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return await response.json();
}