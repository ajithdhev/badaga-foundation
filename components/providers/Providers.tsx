"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { RatingProvider } from "@/contexts/RatingContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <RatingProvider>{children}</RatingProvider>
    </AuthProvider>
  );
}
