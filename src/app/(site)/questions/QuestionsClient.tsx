"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type QuestionType = "text" | "number" | "textarea" | "select" | "subjects";

interface Subject {
  name: string;
  price: number;
}

interface Profile {
  [key: string]: string | number | undefined | Subject[];
}

interface Question {
  key: string;
  label: string;
  type: QuestionType;
  options?: string[];
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
  { key: "subjects", label: "აირჩიეთ საგნები და ფასები", type: "subjects" },
];

const subjectOptions = [
  "მათემატიკა",
  "ქართული",
  "ისტორია",
  "გეოგრაფია",
  "ქიმია",
  "ფიზიკა",
  "ბიოლოგია",
  "ხელოვნება",
  "ინგლისური",
  "რუსული",
  "გერმანული",
  "ესპანური",
  "ფრანგული",
  "დაწყებითი კლასები",
];

const QuestionsClient: React.FC<QuestionsClientProps> = ({
  userId,
  role,
  initialStep,
}) => {
  const router = useRouter();
  const questions = role === "STUDENT" ? studentQuestions : teacherQuestions;

  // ✅ ვალიდაცია initialStep-ისთვის
  const validatedInitialStep = Math.max(
    0,
    Math.min(initialStep, questions.length - 1)
  );
  const [step, setStep] = useState<number>(validatedInitialStep);
  const [answers, setAnswers] = useState<Profile>({
    subjects: [],
  });

  // ✅ ვალიდაციის ფუნქციები
  const isValidNumber = (
    value: string | number | undefined | Subject[]
  ): boolean => {
    if (value === "" || value === undefined || Array.isArray(value))
      return false;
    const num = Number(value);
    return !isNaN(num) && num > 0;
  };

  const isNonEmptyString = (
    value: string | number | undefined | Subject[]
  ): boolean => {
    return typeof value === "string" && value.trim() !== "";
  };

  const hasValidSubjects = (): boolean => {
    const subjects = answers.subjects as Subject[];
    return (
      Array.isArray(subjects) &&
      subjects.length > 0 &&
      subjects.every((s) => s.price > 0)
    );
  };

  const getCurrentValue = (): string | number | undefined | Subject[] => {
    return answers[current.key];
  };

  // ✅ ვალიდაცია current-ისთვის
  const current = questions[step];

  // ✅ თუ current არ არსებობს, redirect
  if (!current) {
    console.error("❌ Invalid step or questions array:", {
      step,
      questionsLength: questions.length,
      initialStep,
      validatedInitialStep,
    });
    router.push("/dashboard");
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  const handleChange = (
    key: string,
    value: string | number | undefined | Subject[]
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubjectChange = (name: string, price: number) => {
    setAnswers((prev) => {
      const subjects = [...((prev.subjects as Subject[]) || [])];
      const index = subjects.findIndex((s) => s.name === name);

      if (index >= 0) {
        if (price === 0) {
          // Remove subject if price is 0
          subjects.splice(index, 1);
        } else {
          // Update price
          subjects[index].price = price;
        }
      } else {
        // Add new subject
        subjects.push({ name, price });
      }

      return { ...prev, subjects };
    });
  };

  const isNextDisabled = (): boolean => {
    const value = getCurrentValue();

    switch (current.type) {
      case "number":
        return !isValidNumber(value);
      case "text":
      case "textarea":
      case "select":
        return !isNonEmptyString(value);
      case "subjects":
        return !hasValidSubjects();
      default:
        return !value;
    }
  };

  const handleNext = async () => {
    const value = getCurrentValue();
    const isLastQuestion = step === questions.length - 1;

    // თუ ბოლო ნაბიჯი არაა, ვალიდაცია ჯერ გავაკეთოთ
    if (!isLastQuestion && isNextDisabled()) {
      alert("გთხოვთ შეავსოთ ველი სწორად");
      return;
    }

    try {
      const apiUrl =
        role === "STUDENT" ? "/api/students/profile" : "/api/teachers/profile";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          key: current.key,
          value,
          step: step,
          isLastQuestion,
        }),
      });

      const data = await response.json();
      console.log("📥 API Response:", data);

      if (isLastQuestion) {
        // ბოლო ნაბიჯზე პირდაპირ dashboard–ზე გადაგვყავს
        router.push("/dashboard");
        return;
      }

      // შემდეგი ნაბიჯი
      setStep((prev) => prev + 1);
    } catch (err) {
      console.error("❌ Error saving profile:", err);
    }
  };

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
            value={(answers[current.key] as string) ?? ""}
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
            value={(answers[current.key] as number | string) ?? ""}
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
            value={(answers[current.key] as string) ?? ""}
            onChange={(e) => handleChange(current.key, e.target.value)}
            className="w-full py-4 px-4 border border-[#EBEBEB] rounded-[12px] text-[#000000] 
            text-sm leading-5 font-helveticaneue-regular
          focus:outline-none focus:ring-2 focus:ring-[#FFD52A] focus:border-0 transition-all duration-300 ease-in-out
          xl:text-base"
          />
        )}
        {current.type === "select" && (
          <select
            value={(answers[current.key] as string) ?? ""}
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
        {current.type === "subjects" && (
          <div className="space-y-4">
            <select
              onChange={(e) => {
                const name = e.target.value;
                if (
                  name &&
                  !(answers.subjects as Subject[]).find((s) => s.name === name)
                ) {
                  handleSubjectChange(name, 0);
                }
                e.target.value = ""; // Reset select
              }}
              className="w-full py-4 px-4 border border-[#EBEBEB] rounded-[12px] text-[#000000] 
                text-sm leading-5 font-helveticaneue-regular
                focus:outline-none focus:ring-2 focus:ring-[#FFD52A] focus:border-0 transition-all duration-300 ease-in-out
                xl:text-base"
            >
              <option value="">აირჩიეთ საგანი...</option>
              {subjectOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="space-y-3">
              {((answers.subjects as Subject[]) || []).map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-[#EBEBEB] rounded-[12px]"
                >
                  <span className="flex-1 text-[#0C0F21] font-helveticaneue-regular">
                    {subject.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={subject.price}
                      onChange={(e) =>
                        handleSubjectChange(
                          subject.name,
                          Number(e.target.value)
                        )
                      }
                      placeholder="ფასი"
                      className="w-24 py-2 px-3 border border-[#EBEBEB] rounded-[8px] text-[#000000] 
                        text-sm leading-5 font-helveticaneue-regular
                        focus:outline-none focus:ring-2 focus:ring-[#FFD52A] focus:border-0 transition-all duration-300 ease-in-out"
                    />
                    <span className="text-[#737373] text-sm">₾</span>
                    <button
                      onClick={() => handleSubjectChange(subject.name, 0)}
                      className="text-red-500 hover:text-red-700 p-1"
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {((answers.subjects as Subject[]) || []).length === 0 && (
              <p className="text-[#737373] text-center py-4">
                არ არის არჩეული საგანი. გთხოვთ აირჩიოთ საგანი ზემოთ მოცემული
                სიიდან.
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className={`mt-6 cursor-pointer py-4 text-center w-full rounded-[40px] 
          text-[#0C0F21] text-sm leading-5 font-helveticaneue-medium xl:text-base
          transition-all duration-300 ease-in-out
          ${
            isNextDisabled()
              ? "bg-gray-300 cursor-not-allowed opacity-50"
              : "bg-[#FFD52A] hover:bg-[#FFC107]"
          }`}
        >
          {step < questions.length - 1 ? "შემდეგი" : "დასრულება"}
        </button>
      </div>
    </>
  );
};

export default QuestionsClient;
