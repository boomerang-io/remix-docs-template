type MainNavItem = {
  title: string,
  href: string,
}

interface NavConfig {
  mainNav: MainNavItem[]
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: "Boomerang",
      href: "http://useboomerang.io",
    },
    {
      title: "Remix",
      href: "https://remix.run",
    },
    {
      title: "Kent C. Dodds",
      href: "https://kentcdodds.com/",
    },
    {
      title: "shadcn/ui",
      href: "https://ui.shadcn.com/",
    },
  ],
}
