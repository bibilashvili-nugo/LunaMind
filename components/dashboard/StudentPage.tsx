import NavBar from "./NavBar";

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
    <div className="px-4 lg:px-6">
      <NavBar user={user} />
    </div>
  );
};

export default StudentPage;
