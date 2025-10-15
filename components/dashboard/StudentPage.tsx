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
    <div className="px-4 lg:px-6 bg-[#F6F5FA] 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto pb-[70px] lg:pb-0">
      <NavBar user={user} />
      <div className="grid grid-cols-1 pt-8 lg:hidden">
        <ActivityTracker />
        <OurLessons />
        <FutureLessons />
        <PremiumStats />
        <RepetitorSwiper />
        <Review />
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 gap-4 lg:mt-6">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <OurLessons />
          <Review />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ActivityTracker />
          <div className="xl:grid xl:grid-cols-3 gap-4">
            <FutureLessons />
            <PremiumStats />
          </div>
          <div className="hidden xl:block">
            <RepetitorSwiper />
          </div>
        </div>
        <div className="lg:col-span-3 xl:hidden">
          <RepetitorSwiper />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
