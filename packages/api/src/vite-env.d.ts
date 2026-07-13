/// <reference types="vite/client" />

/**
 * Vite environment variables type definitions
 */
interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_CDN_URL?: string;
  readonly VITE_GA_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_FACEBOOK_PIXEL_ID?: string;
  readonly VITE_MIXPANEL_TOKEN?: string;
  // Allow any VITE_ prefixed variable
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
