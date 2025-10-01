import ActivityTracker from "./ActivityTracker";
import FutureLessons from "./FutureLessons";
import NavBar from "./NavBar";
import OurLessons from "./OurLessons";
import PremiumStats from "./PremiumStats";
import RepetitorSwiper from "./RepetitorSwiper";
import Review from "./Review";

type StudentUser = {
  id: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "TEACHER";
};

type StudentPageProps = {
  user: StudentUser;
};

const StudentPage: React.FC<StudentPageProps> = ({ user }) => {
  return (
    <div className="px-4 lg:px-6 bg-[#F6F5FA]">
      <NavBar user={user} />
      <div className="grid grid-cols-1 pt-8">
        <ActivityTracker />
        <OurLessons />
        <FutureLessons />
        <PremiumStats />
        <RepetitorSwiper />
        <Review />
      </div>
    </div>
  );
};

export default StudentPage;
