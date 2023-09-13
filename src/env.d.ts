/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST_URL: string;
  readonly VITE_API_LOCATION: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_CLIENT_SCOPE: string;
  readonly CYPRESS_BASE_URL: string;
  readonly CYPRESS_USERNAME: string;
  readonly CYPRESS_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
