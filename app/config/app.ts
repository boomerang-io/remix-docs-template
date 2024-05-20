export const appConfig = {
    versions: {
        branches: ["main"],
        // branches: [],
        prefix: "v",
        includeMinor: true,
        path: "bob"
    }
  }
  
  export type AppConfig = typeof appConfig
  