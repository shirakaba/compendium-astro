import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

// Any changes saved to a React SSR component will entail a page reload.
export function Server({
  children,
  className,
}: PropsWithChildren<{ className?: string; }>){
  return (<h1 className={twMerge("text-4xl", className)}>{children} 2</h1>);
}
