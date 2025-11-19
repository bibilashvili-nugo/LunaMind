// types/dashboard.ts
export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "SUPER_ADMIN";

export interface DashboardUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}
