import { useMemo } from "react";

export default function useCssReset(cssReset) {
  return useMemo(() => (cssReset ? { margin: 0 } : {}), [cssReset]);
}
