export const appConfig = {
    versions: {
        branches: ["main"],
        // branches: [],
        prefix: "v",
        includeMinor: true,
    }
  }
  
  export type AppConfig = typeof appConfig
  