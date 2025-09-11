import type { FC } from "react";

import {
  Biology,
  ForeignLanguages,
  Geography,
  GeorgianLanguage,
  History,
  Math,
} from "../components/ui/Icons";
import { Gift, TrendingUp, WavyCheck } from "react-coolicons";

interface SubjectType {
  title: string;
  icon: string | FC<{ color?: string }>;
  id: number;
}

interface DiscoveryEducationItem {
  title: string;
  description: string;
  icon: string | FC<{ color?: string }>;
  backgroundColor: string;
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

export const discoveryEducationData: DiscoveryEducationItem[] = [
  {
    title: "საკუთარი ცოდნის გაძლიერება სერტიფიცირებული განათლებით",
    description:
      "განიცადეთ უნიკალური საგანმანათლებლო მოგზაურობა შეუდარებელი სწავლის მოქნილობისთვის",
    icon: WavyCheck,
    backgroundColor: "#63D49C",
  },
  {
    title: "ინდივიდუალურად მორგებული განათლება ხელმისაწვდომ ფასად",
    description:
      "განიცადეთ უნიკალური საგანმანათლებლო მოგზაურობა შეუდარებელი სწავლის მოქნილობისთვის",
    icon: Gift,
    backgroundColor: "rgba(125, 63, 255, 0.97)",
  },
  {
    title: "შეუზღუდავი მოქნილობა და მუდმივად მზარდი გამოცდილება",
    description:
      "განიცადეთ უნიკალური საგანმანათლებლო მოგზაურობა შეუდარებელი სწავლის მოქნილობისთვის",
    icon: TrendingUp,
    backgroundColor: "#FF8C38",
  },
];
