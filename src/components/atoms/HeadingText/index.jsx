import React from "react";
export default function HeadingText({children, className, ...props}) {
  return <>
  <p className={`fw-semibold fs-2 lh-sm text-uppercase text-start text-black px-4 py-4 ${className}`} {...props}>
  {children}
  </p>
  </>
};
