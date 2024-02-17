import qs from "qs";
import type { Competition } from "../payload";

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
        import.meta.env.PUBLIC_BACKEND_URL + "/api/competitions" + query,
    );
    const competitionsData = await competitionsResponse.json();
    return competitionsData.docs as Competition[];
}