export interface IMenuItem {
  name: string;
  url: string;
}

export const MENU_DATA: IMenuItem[] = [
  {
    name: "Menege my offers",
    url: "/myaccount/offers",
  },
  {
    name: "Messages",
    url: "/myaccount/messages",
  },
  {
    name: "My Details",
    url: "/myaccount/details",
  },
];
