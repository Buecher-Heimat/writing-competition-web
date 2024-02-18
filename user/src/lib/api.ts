import qs from "qs";
import type { Competition } from "../payload";

const BASE_URL = import.meta.env.PUBLIC_BACKEND_URL + "/api";

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
    return await privacyResponse.json();
}

export async function fetchWritingTips() {
    const writingTipsResponse = await fetch(
        BASE_URL + "/globals/writing_tips",
    );
    return await writingTipsResponse.json();
}