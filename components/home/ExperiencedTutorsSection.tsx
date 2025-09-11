import { SectionHeader } from "../ui/Text";
import TutorSwipe from "./TutorSwipe";

const ExperiencedTutorsSection = () => {
  return (
    <div className="pt-[32px]">
      <SectionHeader
        title="ჩვენი გამოცდილი რეპეტიტორები"
        description="ჩვენ გვჯერა, რომ ტექნოლოგიებს შეუძლიათ სწავლის გამოცდილების შეცვლა"
      />
      <TutorSwipe />
    </div>
  );
};

export default ExperiencedTutorsSection;
