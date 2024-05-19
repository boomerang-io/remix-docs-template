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
      title: "Features",
      href: "/features",
    },
    {
      title: "Solutions",
      href: "/solutions",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ],
}
