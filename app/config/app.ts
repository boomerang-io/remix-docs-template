export const appConfig = {
    versions: {
        // branches: ["main", "dev"],
        branches: [],
        prefix: "v",
        includeMinor: true,
    }
  }
  
  export type AppConfig = typeof appConfig
  