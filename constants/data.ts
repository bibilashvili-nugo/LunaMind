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

interface WhyOurPlatform {
  title: string;
  description: string;
}

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

export const whyOurPlatformData: WhyOurPlatform[] = [
  {
    title: "ონლაინ ვიდეო გაკვეთილები",
    description:
      "HD ხარისხის ვიდეო და ხმა, ინტერაქტიული ვაითბორდი და რეალურ დროში თანამშრომლობა",
  },
  {
    title: "დამომწბული რეპეტიტორები",
    description:
      "HD ხარისხის ვიდეო და ხმა, ინტერაქტიული ვაითბორდი და რეალურ დროში თანამშრომლობა",
  },
  {
    title: "უსაფრთხო გადახდები",
    description:
      "HD ხარისხის ვიდეო და ხმა, ინტერაქტიული ვაითბორდი და რეალურ დროში თანამშრომლობა",
  },
  {
    title: "მოქნილი განრიგი",
    description:
      "HD ხარისხის ვიდეო და ხმა, ინტერაქტიული ვაითბორდი და რეალურ დროში თანამშრომლობა",
  },
  {
    title: "პროგრესის ტრეკინგი",
    description:
      "HD ხარისხის ვიდეო და ხმა, ინტერაქტიული ვაითბორდი და რეალურ დროში თანამშრომლობა",
  },
  {
    title: "კომუნიკაცია",
    description:
      "HD ხარისხის ვიდეო და ხმა, ინტერაქტიული ვაითბორდი და რეალურ დროში თანამშრომლობა",
  },
];

export const tutorSwiper = [
  {
    img: "/images/giorgi.png",
    subject: "არაბული ენის რეპეტიტორი",
    fullName: "გიორგი კაციაშვილი",
    description:
      "შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი შეუძლებელია. დღეს უამრავი პერსონალური საგამომცემლო",
    price: 35.0,
    star: 4.8,
  },
  {
    img: "/images/giorgi.png",
    subject: "არაბული ენის რეპეტიტორი",
    fullName: "გიორგი კაციაშვილი",
    description:
      "შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი შეუძლებელია. დღეს უამრავი პერსონალური საგამომცემლო",
    price: 35.0,
    star: 4.8,
  },
  {
    img: "/images/giorgi.png",
    subject: "არაბული ენის რეპეტიტორი",
    fullName: "გიორგი კაციაშვილი",
    description:
      "შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი შეუძლებელია. დღეს უამრავი პერსონალური საგამომცემლო",
    price: 35.0,
    star: 4.8,
  },
  {
    img: "/images/giorgi.png",
    subject: "არაბული ენის რეპეტიტორი",
    fullName: "გიორგი კაციაშვილი",
    description:
      "შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი შეუძლებელია. დღეს უამრავი პერსონალური საგამომცემლო",
    price: 35.0,
    star: 4.8,
  },
  {
    img: "/images/giorgi.png",
    subject: "არაბული ენის რეპეტიტორი",
    fullName: "გიორგი კაციაშვილი",
    description:
      "შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი შეუძლებელია. დღეს უამრავი პერსონალური საგამომცემლო",
    price: 35.0,
    star: 4.8,
  },
];
