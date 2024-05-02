export interface IMenuItem {
  name: string;
  url: string;
}

export const MENU_DATA: IMenuItem[] = [
  {
    name: "To rent",
    url: "/to-rent",
  },
  {
    name: "For sale",
    url: "/for-sale",
  },
  {
    name: "Commercial",
    url: "/commercial",
  },
  {
    name: "Parcing & Garage",
    url: "/parking-adn-garage",
  },
  {
    name: "Holiday Rentals",
    url: "/holiday-rental",
  },
];
