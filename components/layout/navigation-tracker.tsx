"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordNavigation } from "@/lib/nav-history";

export function NavigationTracker() {
  const pathname = usePathname();
  useEffect(() => {
    recordNavigation(pathname);
  }, [pathname]);
  return null;
}
