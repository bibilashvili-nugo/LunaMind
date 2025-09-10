import Hero from "../../components/home/Hero";
import NavBar from "../../components/home/NavBar";
import Tutors from "../../components/home/Tutors";
import VideoLesson from "../../components/ui/VideoLesson";

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
      <div className="hidden lg:block">
        <NavBar />
      </div>
      <Hero />
      <VideoLesson />
      <Tutors />
    </div>
  );
}
