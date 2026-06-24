import { forwardRef } from "react";
import type { ReactNode, Ref } from "react";
import clsx from "clsx";

const PillCard = forwardRef(function PillCard(
  { children, className }: { children: ReactNode; className?: string },
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={clsx("rounded-[2.5rem] sm:rounded-[3rem]", className)}>
      {children}
    </div>
  );
});

export default PillCard;
