/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro-integration-lottie/env" />

interface ImportMetaEnv {
    readonly PUBLIC_BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}