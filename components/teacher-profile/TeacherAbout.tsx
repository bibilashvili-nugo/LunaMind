import { CircleWarning } from "react-coolicons";

const TeacherAboutLiContent = ({
  desc,
  explain,
}: {
  desc: string;
  explain: string | number | null | string[];
}) => {
  const displayValue = Array.isArray(explain)
    ? desc === "სერტიფიკატი"
      ? explain.length > 0
        ? "კი"
        : "არა"
      : explain.join(", ")
    : explain ?? "-";

  return (
    <li className="flex items-center gap-3">
      <CircleWarning width={24} height={24} color="#737373" />
      <div className="flex flex-col gap-1">
        <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
          {desc}
        </span>
        <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium">
          {displayValue} {typeof explain === "number" && "წლის"}
        </span>
      </div>
    </li>
  );
};

const TeacherAbout = ({
  age,
  city,
  education,
  experienceYears,
  preferredAgeGroups,
  certificateFiles,
}: {
  age: number | null;
  city: string | null;
  education: string | null;
  experienceYears: string | null;
  preferredAgeGroups: string[];
  certificateFiles: string[];
}) => {
  return (
    <div className="rounded-2xl bg-white p-5">
      <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
        ინფორმაცია
      </span>
      <ul className="mt-5 flex flex-col gap-2">
        <TeacherAboutLiContent desc="ასაკი" explain={age} />
        <TeacherAboutLiContent desc="ქალაქი" explain={city} />
        <TeacherAboutLiContent desc="უმაღლესი განათლება" explain={education} />
        <TeacherAboutLiContent
          desc="გამოცდილება (წლები)"
          explain={experienceYears}
        />
        <TeacherAboutLiContent
          desc="ასაკობრივი ჯგუფი"
          explain={preferredAgeGroups}
        />
        <TeacherAboutLiContent desc="სერტიფიკატი" explain={certificateFiles} />
      </ul>
    </div>
  );
};

export default TeacherAbout;
