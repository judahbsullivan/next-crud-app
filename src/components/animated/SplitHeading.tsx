"use client";
import * as React from "react";
import SplitType from "split-type";
import { gsap } from "gsap";

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface SplitHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
}

export function SplitHeading({ as = "h1", children, className, ...rest }: SplitHeadingProps) {
  const ref = React.useRef<HTMLHeadingElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: "words,chars" });
    gsap.fromTo(
      split.chars,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.03 }
    );
    return () => split.revert();
  }, []);

  const Comp = as;
  return (
    <Comp ref={ref} className={className} {...rest}>
      {children}
    </Comp>
  );
}


