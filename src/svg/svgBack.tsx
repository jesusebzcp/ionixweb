import * as React from "react";
import { SVGProps } from "react";

export const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={21}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 8.5c0-.477-.36-.87-.825-.933l-.13-.008H3.265l6.063-5.951A.932.932 0 0 0 9.33.278.965.965 0 0 0 8.088.182l-.107.091-7.7 7.559a.947.947 0 0 0-.276.573.77.77 0 0 0-.005.058v.072l.004.056L0 8.5a.933.933 0 0 0 .188.56l.008.011a.95.95 0 0 0 .084.094v.001l7.7 7.56a.964.964 0 0 0 1.35-.003.931.931 0 0 0 .09-1.225l-.092-.106-6.06-5.95 16.778-.001A.948.948 0 0 0 21 8.5Z"
      fill="#000"
    />
  </svg>
);
