export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidPassword = (password: string) => {
  // მინიმუმ 8 სიმბოლო, ერთი დიდი ასო, ერთი ციფრი
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};
// ტელეფონის ვალიდაცია: მხოლოდ ციფრები, 9-15 სიმბოლო
export const isValidPhone = (phone: string) => /^[0-9]{9,15}$/.test(phone);
