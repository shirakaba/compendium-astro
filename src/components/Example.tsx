import type { PropsWithChildren } from "react";

export function Example({ children, className } : PropsWithChildren<{ className?: string; }>){
  return (<h1 className={className}>{children}</h1>);
}