function constructEnv(name: string, defaultOption: string = ""): string {
    const env = import.meta.env[name];
    if (!env && !defaultOption) {
        throw new Error(`Environment variable ${name} not found`);
    }
    return env || defaultOption;
}

export const environment = {
    backendUrl: constructEnv("VITE_BACKEND_URL"),
};
