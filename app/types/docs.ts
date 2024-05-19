export interface DocsByCategory {
  category: Array<{
    title: string
    slug: string
    description: string
  }>
}

// The frontmatter can be any set of key values
// But that's not especially useful to use
// So we'll declare our own set of properties that we are going to expect to exist
export type Frontmatter = {
  meta?: {
    title?: string;
    description?: string;
    category?: string;
  };
};

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  label?: string
  children? : NavItem[]
}
