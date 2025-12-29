import { IUser } from "../types/User";

export const GENERAL_FIELDS: Array<{
  field: keyof IUser;
  icon: string;
  label: string;
}> = [
  {
    field: "department",
    icon: "/assets/workbag.png",
    label: "Department",
  },
  {
    field: "building",
    icon: "/assets/building.png",
    label: "Building",
  },
  {
    field: "room",
    icon: "/assets/door.png",
    label: "Room",
  },
  {
    field: "desk_number",
    icon: "/assets/hashtag.png",
    label: "Desk number",
  },
];

export const CONTACT_FIELDS: Array<{
  field: keyof IUser;
  icon: string;
  label: string;
  link?: boolean;
}> = [
  {
    field: "phone",
    icon: "/assets/mobile.png",
    label: "Mobile phone",
    link: true,
  },
  {
    field: "email",
    icon: "/assets/at.png",
    label: "Email",
    link: true,
  },
  {
    field: "skype",
    icon: "/assets/phone.png",
    label: "Skype",
    link: true,
  },
  {
    field: "cnumber",
    icon: "/assets/user-id-card.png",
    label: "C-Number",
  },
];

export const TRAVEL_FIELDS: Array<{
  field: keyof IUser;
  icon: string;
  label: string;
  isLast?: boolean;
}> = [
  {
    field: "citizenship",
    icon: "/assets/globe.png",
    label: "Citizenship",
  },
  {
    field: "visa1",
    icon: "/assets/user-id-card.png",
    label: "Visa 1",
  },
  {
    field: "visa1_period",
    icon: "/assets/calendar-alt.png",
    label: "Visa 1 validity period (expired)",
  },
  {
    field: "visa2",
    icon: "/assets/user-id-card.png",
    label: "Visa 2",
  },
  {
    field: "visa2_period",
    icon: "/assets/calendar-alt.png",
    label: "Visa 2 validity period",
    isLast: true,
  },
];
