import axios from "@/axios";
import type { Media } from "@/payload";

export function prepareBackendUrl(url: string, append: string = '/api') {
    url = url ? url : "";
    let newUrl = url.trim();
    if (url.endsWith('/')) {
        newUrl = url.slice(0, -1)
    }
    return newUrl + append;
}

export async function createMedia(media: FormData) {
    return (await axios.post('/media', media)).data.doc as Media;
}