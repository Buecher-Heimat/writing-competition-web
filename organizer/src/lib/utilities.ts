export function prepareBackendUrl(url: string, append: string = '/api') {
    url = url ? url : "";
    let newUrl = url.trim();
    if (url.endsWith('/')) {
        newUrl = url.slice(0, -1)
    }
    return newUrl + append;
}