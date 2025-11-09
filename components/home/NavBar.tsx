"use client";

import { useEffect, useState } from "react";
import { AccountCircle, Evectus } from "../ui/Icons";
import Link from "next/link";
import { Files, House01, Star, Suitcase, UsersGroup } from "react-coolicons";
import Image from "next/image";

const NAV_OFFSET = 80;

type HeaderKey = "home" | "why" | "tutors" | "reviews" | "packages";

interface NavBarProps {
  userImage: string | null;
}

const NavBar = ({ userImage }: NavBarProps) => {
  const headerLinks: {
    key: HeaderKey;
    href: string;
    label: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[] = [
    { key: "home", href: "#home", label: "მთავარი", icon: House01 },
    { key: "why", href: "#why", label: "რატომ ჩვენ", icon: Suitcase },
    { key: "tutors", href: "#tutors", label: "რეპეტიტორები", icon: UsersGroup },
    { key: "reviews", href: "#reviews", label: "შეფასებები", icon: Star },
    { key: "packages", href: "#packages", label: "პაკეტები", icon: Files },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(headerLinks[0]?.href || "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      setIsScrolled(window.scrollY > 300);

      if (window.scrollY === 0) {
        setActiveId(headerLinks[0].href);
        return;
      }

      for (const item of headerLinks) {
        const el = document.getElementById(item.href.replace("#", ""));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - NAV_OFFSET <= 0 && rect.bottom - NAV_OFFSET > 0) {
            setActiveId(item.href);
            break;
          }
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const handleScrollClick = (
    e: React.MouseEvent<HTMLElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetEl = document.getElementById(href.replace("#", ""));
    if (targetEl) {
      setIsScrolling(true);

      let offsetPosition = 0;
      if (href !== "#home") {
        const elementPosition =
          targetEl.getBoundingClientRect().top + window.scrollY;
        offsetPosition = elementPosition - NAV_OFFSET;
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(href);

      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  return (
    <div
      className={`fixed bottom-0 lg:bottom-auto lg:top-0 left-0 w-full pb-[20px] z-50 transition-all duration-300 ${
        isScrolled ? "lg:bg-white/70 lg:backdrop-blur-md" : "lg:bg-white"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        <div className="flex items-center justify-between pt-6">
          <div
            className="cursor-pointer lg:flex items-center gap-2 hidden"
            onClick={(e) => handleScrollClick(e, "#home")}
          >
            <Evectus />
            <span className="text-2xl leading-[100%] font-freeman-regular xl:text-[32px]">
              EVECTUS
            </span>
          </div>

          <ul className="flex bg-[#F6F7FB] rounded-[50px] p-1 mx-auto">
            {headerLinks.map((item) => {
              const isHovered = hoveredId === item.href;
              const isActive = activeId === item.href;
              const liClass = `font-helveticaneue-regular text-sm leading-5 sm:px-5 px-3 py-2 sm:py-3 cursor-pointer rounded-[50px] 3xl:text-base 3xl:leading-6 transition-all duration-300 ${
                isHovered
                  ? "text-[#0C0F21] bg-white scale-105"
                  : !hoveredId && isActive
                  ? "bg-[#080A0D] text-white lg:text-[#0C0F21] lg:bg-white"
                  : "text-[#737373] bg-[#F6F7FB] hover:text-[#0C0F21] hover:bg-white  hover:scale-105"
              }`;
              const Icon = item.icon;
              return (
                <li
                  key={item.href}
                  className={liClass}
                  onClick={(e) => handleScrollClick(e, item.href)}
                  onMouseEnter={() => setHoveredId(item.href)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Mobile view with icon */}
                  <div className="flex items-center sm:gap-1 lg:hidden">
                    {Icon && (
                      <Icon
                        width={24}
                        height={24}
                        stroke={isActive ? "white" : "black"}
                      />
                    )}
                    <div className={isActive ? "hidden sm:block" : "hidden"}>
                      {item.label}
                    </div>
                  </div>

                  {/* Desktop view */}
                  <div className="hidden lg:block">{item.label}</div>
                </li>
              );
            })}
            {userImage ? (
              <Link
                href={"/login"}
                className="lg:hidden ml-2 flex items-center"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={userImage || "/images/default-profile.png"}
                    width={40}
                    height={40}
                    alt="user profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <Link href={"/login"}>
                <div className="bg-[#FFD52A] py-[12px] px-[12px] rounded-full lg:hidden ml-2">
                  <AccountCircle />
                </div>
              </Link>
            )}
          </ul>

          <div className="lg:flex items-center gap-2 xl:gap-6 hidden">
            {userImage ? (
              <Link
                href={"/login"}
                className="hidden lg:flex ml-2 items-center"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={userImage || "/images/default-profile.png"}
                    width={40}
                    height={40}
                    alt="user profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <Link href={"/login"}>
                <div className="bg-[#FFD52A] py-[14px] px-[24px] rounded-[40px] xl:flex xl:items-center xl:gap-2">
                  <AccountCircle />
                  <span className="hidden xl:block xl:text-sm xl:leading-5 3xl:text-base 3xl:leading-[24px] font-helveticaneue-medium">
                    შესვლა
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
