"use client";

import { checkAuth, isLoadingStore } from "@/lib/auth-store";
import { useStoreValue } from "@simplestack/store/react";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoading = useStoreValue(isLoadingStore);

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary size-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
