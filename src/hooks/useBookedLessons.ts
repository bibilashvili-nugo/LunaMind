import { useQuery } from "@tanstack/react-query";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
}

interface BookedLesson {
  id: string;
  date: string;
  teacher: Teacher;
  createdAt: string; // აქ უკვე გაქვს მონაცემებში
  duration: number; // აქ უკვე გაქვს მონაცემებში
  // სხვა ფილდები თუ გაქვს, დაამატე აქ
}

const fetchBookedLessons = async (
  studentId: string
): Promise<BookedLesson[]> => {
  const res = await fetch(
    `/api/book-lesson/[booked-lessons]?studentId=${studentId}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "ვერ მოხერხდა გაკვეთილების წამოღება");
  }

  return res.json();
};

export const useBookedLessons = (studentId: string | null) => {
  return useQuery({
    queryKey: ["bookedLessons", studentId],
    queryFn: () => fetchBookedLessons(studentId!),
    enabled: !!studentId, // მხოლოდ მაშინ გაეშვება, თუ studentId არსებობს
    staleTime: 1000 * 60 * 1, // 1 წუთი ხდება fresh
  });
};
