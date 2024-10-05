import {
  BookUser,
  LayoutDashboardIcon,
  LayoutGrid,
  Settings,
  TableProperties,
  Tag,
  User,
  UserRoundPlus,
  Users,
  type LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  title?: string;
  icon?: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  title?: string
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
          href: "/",
          label: "Página Inicial",
          active: pathname.includes("/pagina-inicial"),
          title:"Página inicial",
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
          icon: User,
          title:"Clientes",
          submenus: [
            {
              href: "/clients",
              label: "Dashboad",
              title:"Dashboard de clientes",
              active: pathname === "/clients",
              icon: LayoutDashboardIcon
            },
            {
              href: "/clients/list",
              label: "Listagem",
              title:"Listagem dos clientes",
              active: pathname === "/clients/list",
              icon: BookUser
            },
            {
              href: "/clients/create",
              label: "Cadastro",
              title:"Cadastro de cliente",
              active: pathname === "/clients/create",
              icon: UserRoundPlus
            }
          ]
        },
        {
          href: "/users",
          label: "Funcionários",
          active: pathname.includes("/users"),
          title:"Funcionários",
          icon: Users,
          submenus: [
            {
              href: "/users/dashboard",
              label: "Dashboad",
              title:"Dashboard dos usuarios",
              active: pathname === "/users/dashboard",
              icon: LayoutDashboardIcon
            },
            {
              href: "/users/list",
              label: "Listagem",
              title:"Listagem dos usuarios",
              active: pathname === "/users/list",
              icon: BookUser
            },
            {
              href: "/users/create",
              label: "Cadastro",
              title:"Cadastro dos usuarios",
              active: pathname === "/users/create",
              icon: UserRoundPlus
            }
          ]
        },
        {
          href: "/solicitations",
          label: "Solicitações",
          active: pathname.includes("/solicitations"),
          icon: Tag,
          title:"Solicitações",
          submenus: [
            {
              href: "/solicitations/dashboard",
              label: "Dashboad",
              title:"Dashboard das solicitações",
              active: pathname === "/solicitations/dashboard",
              icon: LayoutDashboardIcon
            },
            {
              href: "/solicitations/list",
              label: "Listagem",
              title:"Listagem das solicitações",
              active: pathname === "/solicitations/list",
              icon: TableProperties
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


export function findActiveLabel( pathname: string): string | null {
  const menuList = getMenuList(pathname);
  for (const group of menuList) {
    for (const menu of group.menus) {
      const activeSubmenu = menu.submenus.find(submenu => submenu.active);
      if (activeSubmenu) {
        return activeSubmenu.title ? activeSubmenu.title : "";
      }
      if (menu.active) {
        return menu.title ? menu.title : "";;
      }
    }
  }
  return null;
}