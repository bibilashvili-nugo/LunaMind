import ChooseAnyTime from "../../components/home/ChooseAnyTime";
import DiscoverEducation from "../../components/home/DiscoverEducation";
import Footer from "../../components/home/Footer";
import Hero from "../../components/home/Hero";
import NavBar from "../../components/home/NavBar";
import OurPackages from "../../components/home/OurPackages";
import StudentTestimonials from "../../components/home/StudentTestimonials";
import Tutors from "../../components/home/Tutors";
import TutorsType from "../../components/home/TutorsType";
import TutorSwipe from "../../components/home/TutorSwipe";
import WhyOurPlatform from "../../components/home/WhyOurPlatform";
import VideoLesson from "../../components/ui/VideoLesson";

export default function Home() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        <div className="hidden lg:block">
          <NavBar />
        </div>
        <Hero id="home" />
        <div className="lg:flex lg:gap-6">
          <VideoLesson />
          <div className="lg:order-3 lg:w-[20%] lg:h-full">
            <Tutors />
            <div className="hidden lg:block lg:w-full lg:h-full">
              <TutorsType />
            </div>
          </div>
          <ChooseAnyTime />
        </div>
        <DiscoverEducation />
        <WhyOurPlatform id="why" />
      </div>

      <TutorSwipe id="tutors" />
      <div className="px-4 sm:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        <StudentTestimonials id="reviews" />
        <OurPackages id="packages" />
      </div>
      <Footer />
    </>
  );
}
