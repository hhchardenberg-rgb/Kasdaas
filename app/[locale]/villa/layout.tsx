import { HelpFab } from "@/components/villa/help-fab";

export default function VillaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <HelpFab />
    </>
  );
}
