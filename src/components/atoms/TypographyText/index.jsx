import React from "react";

export default function TypographyText({children, className, ...props}) {
  return <>
  <p className={`fw-normal fs-6 lh-sm text-start text-black py-5 ${className}`} {...props}>
  {children}
  </p>
  </>
};
