export interface IMenuItem {
  name: string;
  url: string;
  icon: string;
}

export const ADMIN_MENU_DATA: IMenuItem[] = [
  {
    icon: "radix-icons:dashboard ",
    name: "Home",
    url: "/admin",
  },
];
