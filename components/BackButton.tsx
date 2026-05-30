"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center active:scale-90 transition-transform"
      style={{ width: 38, height: 38, borderRadius: 999, backgroundColor: "#1F3D34" }}
      aria-label="Voltar"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 19l-7-7 7-7"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
