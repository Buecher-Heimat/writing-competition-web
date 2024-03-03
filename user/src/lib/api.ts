import qs from "qs";
import type { Competition, InstructionStep, Post, PrivacyCompetition, PrivacyWebsite, WritingTip } from "../payload";
import type { PostCreationInput } from "./entryFormStore";

// I'm not quite sure why sometimes the import.meta.env... is undefined
export const PUBLIC_BACKEND_URL: string = import.meta.env.PUBLIC_BACKEND_URL || process.env.PUBLIC_BACKEND_URL || "http://localhost:49152";

console.log(`Using "${PUBLIC_BACKEND_URL}" as backend_url.`);


const BASE_URL = PUBLIC_BACKEND_URL + "/api";

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

export async function fetchPostBySlug(slug: string) {
    const query = qs.stringify(
        {
            where: {
                slug: {
                    equals: slug,
                }
            }
        },
        {
            addQueryPrefix: true,
        }
    )
    const postResponse = await fetch(
        BASE_URL + "/posts" + query,
    );
    const postData = await postResponse.json();
    return postData.docs[0] as Post;
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
        BASE_URL + "/posts?sort=-createdAt&limit=" + limit,
    );
    const recentPostsData = await recentPostsResponse.json();
    return recentPostsData.docs as Post[];
}

export async function fetchRecentCompetitionPosts(competitionId: string, limit: number = 3) {
    const query = qs.stringify(
        {
            where: {
                "competition": { equals: competitionId, },
            },
            sort: "-createdAt",
            limit: limit,
        },
        {
            addQueryPrefix: true,
        }
    );

    const recentCompetitionPostResponse = await fetch(
        BASE_URL + "/posts" + query,
    );
    const recentCompetitionPostData = await recentCompetitionPostResponse.json();
    console.log(recentCompetitionPostData);
    return recentCompetitionPostData.docs as Post[];
}

export async function fetchCompetitionData(competitionSlug: string) {
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

    const competitionResponse = await fetch(
        BASE_URL + "/competitions" + query,
    );
    const competitionData = await competitionResponse.json();
    return competitionData.docs[0] as Competition;
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

export async function validateEmail(token: string) {
    const response = await fetch(
        PUBLIC_BACKEND_URL + "/verify/" + token,
    );

    if (!response.ok) {
        throw new Error(response.status.toString());
    }

    return await response.json();
}