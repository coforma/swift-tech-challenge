declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN: string;
      NODE_ENV: "dev" | "production";
    }
  }
}

export {};
