export interface IMenuItem {
  icon: string;
  name: string;
  url: string;
}

export const MENU_BUTTONS_DATA: IMenuItem[] = [
  {
    icon: "gravity-ui:magnifier",
    name: "H",
    url: "/search",
  },
  {
    icon: "gravity-ui:person",
    name: "user",
    url: "/user-menu",
  },
  {
    icon: "gravity-ui:heart",
    name: "L",
    url: "/favorite",
  },
  {
    icon: "",
    name: "Place an ad  +",
    url: "/add-offer",
  },
];
