import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface BookedLesson {
  id: string;
  date: string;
  teacher: User;
  student: User;
  createdAt: string;
  duration: number;
  subject: string;
  time: string;
}

interface UseBookedLessonsParams {
  studentId?: string | null;
  teacherId?: string | null;
}

const fetchBookedLessons = async ({
  studentId,
  teacherId,
}: UseBookedLessonsParams) => {
  const params = new URLSearchParams();
  if (studentId) params.append("studentId", studentId);
  if (teacherId) params.append("teacherId", teacherId);

  const res = await fetch(
    `/api/book-lesson/[booked-lessons]?${params.toString()}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "ვერ მოხერხდა გაკვეთილების წამოღება");
  }

  return res.json() as Promise<BookedLesson[]>;
};

export const useBookedLessons = ({
  studentId,
  teacherId,
}: UseBookedLessonsParams) => {
  const enabled = !!studentId || !!teacherId;

  return useQuery({
    queryKey: ["bookedLessons", { studentId, teacherId }],
    queryFn: () => fetchBookedLessons({ studentId, teacherId }),
    enabled,
    staleTime: 1000 * 60, // 1 წუთი fresh
  });
};
