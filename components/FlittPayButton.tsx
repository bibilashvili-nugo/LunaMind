// components/FlittPayButton.tsx
"use client";
import { useState } from "react";

export function FlittPayButton() {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flitt/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1000,
          currency: "GEL",
          order_desc: "Test payment",
        }),
      });
      const data = await res.json();
      if (data.response && data.response.checkout_url) {
        window.location.href = data.response.checkout_url;
      } else {
        alert("Could not generate payment link");
      }
    } catch (error) {
      console.error(error);
      alert("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 transition"
    >
      {loading ? "Processing..." : "Pay with Flitt"}
    </button>
  );
}
