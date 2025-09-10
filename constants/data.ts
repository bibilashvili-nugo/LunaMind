import type { FC } from "react";
import {
  Biology,
  ForeignLanguages,
  Geography,
  GeorgianLanguage,
  History,
  Math,
} from "../components/ui/Icons";

interface SubjectType {
  title: string;
  icon: string | FC<{ color?: string }>;
  id: number;
}

export const headerData = [
  { title: "მთავარი", href: "/" },
  { title: "რატომ ჩვენ", href: "/about-us" },
  { title: "რეპეტიტორები", href: "/tutors" },
  { title: "შეფასებები", href: "/reviews" },
  { title: "პაკეტები", href: "/packages" },
];

export const subjectsData: SubjectType[] = [
  { title: "ბიოლოგიის", icon: Biology, id: 1 },
  { title: "ქართული ენის", icon: GeorgianLanguage, id: 2 },
  { title: "ისტორიის", icon: History, id: 3 },
  { title: "მათემატიკის", icon: Math, id: 4 },
  { title: "უცხო ენის", icon: ForeignLanguages, id: 5 },
  { title: "გეოგრაფიის", icon: Geography, id: 6 },
];
