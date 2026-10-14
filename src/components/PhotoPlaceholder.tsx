import { LogoMark } from "./Logo";
import { Leaf, Star } from "./decor/Decorations";

/** Calm decorative stand-in shown while a photo hasn't been uploaded yet. */
export function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex h-full min-h-48 w-full flex-col items-center justify-center gap-3 overflow-hidden bg-mint text-center">
      <Leaf tone="mint" className="absolute -top-4 -left-2 w-16 rotate-[-30deg]" />
      <Leaf tone="mint" className="absolute -right-3 -bottom-4 w-20 rotate-[150deg]" />
      <Star className="absolute top-[22%] right-[22%] w-5" />
      <LogoMark className="h-16 w-16 opacity-90" />
      <span className="px-6 text-sm font-semibold text-forest/80">{label}</span>
    </div>
  );
}
