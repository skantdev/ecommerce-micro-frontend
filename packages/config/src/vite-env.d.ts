/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_CDN_URL?: string;
  readonly VITE_GA_ID?: string;
  readonly VITE_FB_PIXEL_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
  // Add more env variables as needed
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
