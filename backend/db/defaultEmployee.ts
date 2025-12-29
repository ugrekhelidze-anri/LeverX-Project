import { IEmployee } from "../types/index.js";

export const defaultEmployee: Omit<IEmployee, "_id" | "first_name" | "last_name" | "email" | "passwordHash"> = {
  isRemoteWork: false,
  user_avatar: "/assets/employee.png",
  first_native_name: "",
  last_native_name: "",
  department: "Web & Mobile",
  building: "Building 1",
  room: "LPT101",
  date_birth: { year: 1990, month: 1, day: 1 },
  desk_number: 20,
  manager: {
    id: "987ff8cb-b506-4d5e-9166-ab8c644bb891",
    first_name: "John",
    last_name: "Snow",
  },
  phone: "+1234567890",
  skype: "live:.cid.000000",
  cnumber: "C1658411",
  citizenship: "Georgian",
  role: "employee",
  visa: [
    {
      type: "National visa type D",
      start_date: 1652158800000,
      end_date: 1683608400000,
    },
    {
      type: "National visa type C",
      start_date: 1683608400000,
      end_date: 1715144400000,
    },
  ],
};
