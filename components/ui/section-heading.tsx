import { GradientText } from "@/components/ui/gradient-text";
import { FlickerText } from "@/components/effects/FlickerText";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-neon-cyan sm:text-sm">
        <span className="h-px w-8 bg-neon-cyan/55" aria-hidden="true" />
        <FlickerText>{eyebrow}</FlickerText>
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-[1.08] text-foreground sm:text-4xl lg:text-[2.65rem]">
        <GradientText>{title}</GradientText>
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
