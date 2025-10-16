import ActivityTracker from "./ActivityTracker";
import FutureLessons from "./FutureLessons";
import NavBar from "./NavBar";
import OurLessons from "./OurLessons";
import PremiumStats from "./PremiumStats";

type TeacherUser = {
  id: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "TEACHER";
};

type TeacherPageProps = {
  user: TeacherUser;
};

const TeacherProfile: React.FC<TeacherPageProps> = ({ user }) => {
  return (
    <div className="px-4 lg:px-6 bg-[#F6F5FA] 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto pb-[70px] lg:pb-0">
      <NavBar user={user} />
      <div className="grid grid-cols-1 pt-8 lg:hidden">
        <ActivityTracker teacher={true} />
        <OurLessons teacher={true} />
        <FutureLessons teacher={true} teacherId={user?.id} />
        <PremiumStats />
      </div>
      <div className="hidden lg:grid lg:grid-cols-3 gap-4 lg:mt-6">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <OurLessons teacher={true} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ActivityTracker teacher={true} />
          <div className="xl:grid xl:grid-cols-3 gap-4">
            <FutureLessons teacher={true} teacherId={user?.id} />
            <PremiumStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
