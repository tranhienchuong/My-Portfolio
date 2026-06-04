import { GradientText } from "@/components/ui/gradient-text";
import { FlickerText } from "@/components/effects/FlickerText";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neon-cyan">
        <FlickerText>{eyebrow}</FlickerText>
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        <GradientText>{title}</GradientText>
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
