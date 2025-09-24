"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageDropDown from "../../../../components/ui/LanguageDropDown";

type QuestionType = "text" | "number" | "textarea" | "select";

interface Question {
  key: string;
  label: string;
  type: QuestionType;
  options?: string[];
}
interface Profile {
  [key: string]: string | number | undefined;
}
interface QuestionsClientProps {
  userId: string;
  role: "STUDENT" | "TEACHER";
  initialStep: number;
}

const studentQuestions: Question[] = [
  { key: "age", label: "თქვენი ასაკი", type: "number" },
  {
    key: "country",
    label: "ქვეყანა",
    type: "select",
    options: ["საქართველო", "აშშ", "გერმანია"],
  },
  { key: "city", label: "ქალაქი", type: "text" },
  { key: "address", label: "სრული მისამართი", type: "text" },
  {
    key: "educationLevel",
    label: "რა არის თქვენი მიმდინარე საგანმანათლებლო დონე?",
    type: "select",
    options: ["SCHOOL", "UNIVERSITY", "OTHER"],
  },
  {
    key: "subjectInterest",
    label: "რომელი საგანი ან უნარი გაინტერესებთ ყველაზე მეტად?",
    type: "select",
    options: ["პროგრამირება", "მათემატიკა", "ენები"],
  },
  {
    key: "reason",
    label: "რატომ გადაწყვიტეთ ჩვენი პლატფორმის გამოყენება?",
    type: "textarea",
  },
  {
    key: "availability",
    label: "როდის ხარ ხელმისაწვდომი?",
    type: "select",
    options: ["FLEXIBLE", "FIXED"],
  },
];

const teacherQuestions: Question[] = [
  { key: "age", label: "რამდენი წლის ხარ?", type: "number" },
  {
    key: "country",
    label: "ქვეყანა",
    type: "select",
    options: ["საქართველო", "აშშ", "გერმანია"],
  },
  { key: "city", label: "ქალაქი", type: "text" },
  { key: "address", label: "ზუსტი მისამართი", type: "text" },
  { key: "profession", label: "პროფესიული ინფორმაცია", type: "textarea" },
  {
    key: "education",
    label: "რა არის თქვენი უმაღლესი განათლება?",
    type: "select",
    options: ["BACHELOR", "MASTER", "DOCTORATE", "OTHER"],
  },
];

const QuestionsClient: React.FC<QuestionsClientProps> = ({
  userId,
  role,
  initialStep,
}) => {
  const router = useRouter();
  const questions = role === "STUDENT" ? studentQuestions : teacherQuestions;
  const [step, setStep] = useState<number>(initialStep);
  const [answers, setAnswers] = useState<Profile>({});

  const handleChange = (key: string, value: string | number | undefined) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const handleNext = async () => {
    const current = questions[step];
    const value = answers[current.key];
    const isLastQuestion = step >= questions.length - 1;

    console.log("🔍 handleNext:", {
      step,
      isLastQuestion,
      currentKey: current.key,
    });

    try {
      const response = await fetch(`/api/${role.toLowerCase()}s/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          key: current.key,
          value,
          step: step, // მიმდინარე step
          isLastQuestion,
        }),
      });

      const data = await response.json();
      console.log("✅ API response:", data);

      if (isLastQuestion) {
        console.log("🚀 Last question completed - redirecting to dashboard");
        router.push("/dashboard");
        router.refresh();
      } else {
        setStep(step + 1);
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  const current = questions[step];
  const totalSteps = questions.length;

  return (
    <>
      <div
        className="flex justify-between items-center mt-8 pb-4 md:pb-6
      px-4 md:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto"
      >
        <div className="text-2xl leading-[100%] font-aclonica-regular xl:text-[32px] cursor-pointer px-2 sm:px-0">
          LunaMind
        </div>
        <LanguageDropDown />
      </div>
      <hr className="text-[#EBEBEB] pb-6 sm:pb-8" />
      <div className="px-4 md:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto lg:w-[576px] lg:mx-auto">
        <div className="flex justify-center gap-2 pb-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`
                h-[5px] rounded-[10px] 
                transition-all duration-300 ease-in-out
                ${
                  index === step
                    ? "bg-[#FFD52A] w-[48px]"
                    : "bg-gray-300 w-8 md:w-[42px] lg:w-[60px] xl:w-[80px]"
                }
                `}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-lgvanastasia-regular text-[44px] leading-8 text-[#0C0F21] text-center">
            დაგვეხმარე შეგმოგთავაზოთ სწორი სასწავლო კურსი
          </p>
          <p className="text-[#737373] font-helveticaneue-medium text-sm leading-5 text-center xl:text-base">
            დაგვეხმარეთ სწორად შეგირჩიოთ რეპეტიტორი თქვენი პირადი საჭიროებების
            საფუძველზე
          </p>
        </div>
        <h2
          className="mt-[42px] pb-3 font-helveticaneue-regular text-[#0C0F21] text-sm leading-4 sm:mt-8 
        xl:text-base "
        >
          {current.label}
        </h2>

        {current.type === "text" && (
          <input
            type="text"
            value={answers[current.key] ?? ""}
            onChange={(e) => handleChange(current.key, e.target.value)}
            className="w-full py-4 px-4 border border-[#EBEBEB] rounded-[12px] text-[#000000] 
            text-sm leading-5 font-helveticaneue-regular
          focus:outline-none focus:ring-2 focus:ring-[#FFD52A] focus:border-0 transition-all duration-300 ease-in-out
          xl:text-base"
          />
        )}
        {current.type === "number" && (
          <input
            type="number"
            value={answers[current.key] ?? ""}
            onChange={(e) =>
              handleChange(
                current.key,
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            className="w-full py-4 px-4 border border-[#EBEBEB] rounded-[12px] text-[#000000] 
            text-sm leading-5 font-helveticaneue-regular
          focus:outline-none focus:ring-2 focus:ring-[#FFD52A] focus:border-0 transition-all duration-300 ease-in-out
          xl:text-base"
          />
        )}
        {current.type === "textarea" && (
          <textarea
            value={answers[current.key] ?? ""}
            onChange={(e) => handleChange(current.key, e.target.value)}
            className="w-full py-4 px-4 border border-[#EBEBEB] rounded-[12px] text-[#000000] 
            text-sm leading-5 font-helveticaneue-regular
          focus:outline-none focus:ring-2 focus:ring-[#FFD52A] focus:border-0 transition-all duration-300 ease-in-out
          xl:text-base"
          />
        )}
        {current.type === "select" && (
          <select
            value={answers[current.key] ?? ""}
            onChange={(e) => handleChange(current.key, e.target.value)}
            className="w-full py-4 px-4 border border-[#EBEBEB] rounded-[12px] text-[#000000] 
            text-sm leading-5 font-helveticaneue-regular
          focus:outline-none focus:ring-2 focus:ring-[#FFD52A] focus:border-0 transition-all duration-300 ease-in-out
          xl:text-base"
          >
            <option value="">აირჩიეთ...</option>
            {current.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleNext}
          className="mt-6 bg-[#FFD52A] cursor-pointer py-4 text-center w-full rounded-[40px] 
          text-[#0C0F21] text-sm leading-5 font-helveticaneue-medium xl:text-base"
        >
          {step < questions.length - 1 ? "შემდეგი" : "დასრულება"}
        </button>
      </div>
    </>
  );
};

export default QuestionsClient;
