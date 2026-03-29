/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENABLE_MOCK?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_ENABLE_MOCK?: string;
  readonly VITE_API_TIMEOUT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
