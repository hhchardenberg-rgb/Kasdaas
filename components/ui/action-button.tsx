import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const styles: Record<Variant, string> = {
  primary: "bg-ocean-800 text-white shadow-[var(--shadow-soft)] hover:bg-ocean-900",
  secondary: "bg-white text-ink shadow-[var(--shadow-soft)] hover:bg-sand-100",
  ghost: "bg-sand-100 text-ink hover:bg-sand-200",
  danger: "bg-danger text-white shadow-[var(--shadow-soft)]",
};

/** Large touch-friendly link button. External links are marked as needing internet. */
export function ActionLink({ href, icon: Icon, children, variant = "secondary", external, netLabel, className = "" }: {
  href: string; icon?: LucideIcon; children: React.ReactNode; variant?: Variant; external?: boolean; netLabel?: string; className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer", "data-net-label": netLabel } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.9rem] font-semibold transition ${styles[variant]} ${external ? "needs-net" : ""} ${className}`}
    >
      {Icon && <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} aria-hidden />}
      {children}
    </a>
  );
}
