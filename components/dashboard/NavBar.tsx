import Link from "next/link";
import type { FC } from "react";
import { CaretDownMd, House01 } from "react-coolicons";

type NavigationItem = {
  id: number;
  title: string;
  path: string;
  icon?: string | FC<{ color?: string; fill?: string; size: number }>;
  active?: boolean;
};

const navigation: NavigationItem[] = [
  {
    id: 1,
    title: "მიმოხილვა",
    path: "/dashboard",
    icon: House01,
    active: true,
  },
  { id: 2, title: "რეპეტიტორები", path: "/dashboard/tutors", icon: House01 },
  { id: 3, title: "გაკვეთილები", path: "/lessons", icon: House01 },
  { id: 4, title: "შეფასებები", path: "/dashboard/reviews", icon: House01 },
  { id: 5, title: "პაკეტები", path: "/packages", icon: House01 },
];

type StudentUser = {
  id: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "TEACHER";
};

type NavBarProps = {
  user: StudentUser;
};

const NavBar: FC<NavBarProps> = ({ user }) => {
  return (
    <div
      className="pt-8 text-center sm:text-start 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto lg:pt-[28px] lg:flex lg:justify-between lg:items-center
    xl:pt-8 w-full"
    >
      <span className="text-[32px] leading-[100%] text-[#0C0F21] font-aclonica-regular lg:w-1/4">
        LunaMind
      </span>
      <ul className="hidden lg:flex bg-[#EBECF0] p-3 rounded-[60px] xl:p-2 xl:gap-1 xl:rounded-[50px]">
        {navigation.map((item) => (
          <Link
            href={item?.path}
            key={item.id}
            className={`text-xs leading-4 flex items-center gap-1 ${
              item?.active
                ? "pl-3 pr-[20px] py-[10px] bg-white rounded-[100px] xl:bg-[#080808] xl:p-0 "
                : ""
            }`}
          >
            {item?.active ? (
              <>
                <div className="block xl:hidden">
                  {item.icon && (
                    <item.icon color="#080A0D" fill="#080A0D" size={24} />
                  )}
                </div>
                <span
                  className="xl:!font-helveticaneue-regular text-xs leading-4 text-[#080A0D] !font-helveticaneue-medium xl:text-white
                  xl:text-sm xl:leading-5 xl:px-5 xl:py-[14px]"
                >
                  {item.title}
                </span>
              </>
            ) : (
              <div className="">
                <div className="p-[10px] block xl:hidden">
                  {item.icon && (
                    <item.icon color="#080A0D" fill="#080A0D" size={24} />
                  )}
                </div>
                <div className="hidden xl:block">
                  <span className="text-sm leading-5 text-[#737373] px-5 py-3 font-helveticaneue-regular">
                    {item.title}
                  </span>
                </div>
              </div>
            )}
          </Link>
        ))}
      </ul>
      <Link
        href="/dashboard/student-profile"
        className="hidden lg:flex bg-[#EBECF0] rounded-[50px] px-4 py-3 items-center gap-2"
      >
        <div className="w-10 h-10 bg-black rounded-full"></div>
        <div className="flex flex-col">
          <span className="text-sm leading-5 text-[#000000] font-helveticaneue-medium">
            {user?.firstName + " " + user?.lastName}
          </span>
          <p className="text-xs leading-[18px] text-[#767676] font-helveticaneue-regular">
            მოსწავლის პროფილი
          </p>
        </div>
        <div>
          <CaretDownMd color="#737373" />
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
