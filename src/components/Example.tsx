import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

// Any changes saved in a .tsx file will:
// - SSR: cause a page reload.
// - CSR: apply by HMR.
export function Example({
  children,
  className,
}: PropsWithChildren<{ className?: string; }>){
  return (<h1 className={twMerge("text-4xl", className)}>{children}</h1>);
}
