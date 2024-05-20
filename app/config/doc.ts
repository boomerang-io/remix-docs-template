/*
This file contains the configuration for the documentation and versioning integration.

- pathToDocs: The path to the documentation folder in the repository. i.e. "docs" or "documentation"
- versions: The configuration for the versioning system.
- versions.branches: The branches that will be added to the version switcher. If none, left as empty array. If running locally, "local" will be added by the code.
- versions.prefix: The prefix for the version tag. i.e. "v" for "v1.0.0". Leave blank if no prefix.
- versions.includeMinor: If true, the minor version will be included in the version list i.e. "1.1.0" and "1.2.0". If false, only the latest major version will be included i.e. "1.2.0".
*/

export const docConfig = {
        pathToDocs: "bob",
        versions: {
            branches: ["main"],
            prefix: "v",
            includeMinor: true,
        },
  }
  
  export type DocConfig = typeof docConfig
  