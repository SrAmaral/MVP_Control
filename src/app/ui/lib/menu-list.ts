import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/pagina-inicial",
          label: "Página Inicial",
          active: pathname.includes("/pagina-inicial"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Clientes",
          active: pathname.includes("/clients"),
          icon: SquarePen,
          submenus: [
            {
              href: "/clients/dashboard",
              label: "Dashboad",
              active: pathname === "/clients/dashboard"
            },
            {
              href: "/clients/list",
              label: "Listagem",
              active: pathname === "/clients/list"
            }
          ]
        },
        {
          href: "/users",
          label: "Funcionários",
          active: pathname.includes("/users"),
          icon: Bookmark,
          submenus: [
            {
              href: "/users/dashboard",
              label: "Dashboad",
              active: pathname === "/users/dashboard"
            },
            {
              href: "/users/list",
              label: "Listagem",
              active: pathname === "/users/list"
            },
            {
              href: "/users/form",
              label: "Cadastro",
              active: pathname === "/users/form"
            }
          ]
        },
        {
          href: "/solicitations",
          label: "Solicitações",
          active: pathname.includes("/solicitations"),
          icon: Tag,
          submenus: [
            {
              href: "/solicitations/dashboard",
              label: "Dashboad",
              active: pathname === "/solicitations/dashboard"
            },
            {
              href: "/solicitations/list",
              label: "Listagem",
              active: pathname === "/solicitations/list"
            }
          ]
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/account",
          label: "Conta",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
