// app/login/page.tsx
import { getCurrentUser } from "@/lib/session";
import LoginPageClient from "./LoginPageClient";

export default async function LoginPage() {
  const user = await getCurrentUser();

  // ✅ მხოლოდ ერთი მარტივი შემოწმება
  if (user) {
    // ❌ აღარ არის პროფილის შემოწმება აქ
    // ❌ აღარ არის რედირექტები აქ
    // Middleware ავტომატურად იზრუნებს გადამისამართებაზე
    return null; // ან loading state
  }

  return <LoginPageClient />;
}
