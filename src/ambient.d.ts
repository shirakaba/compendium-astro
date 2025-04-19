declare module '*.svg?react' {
  import type { ComponentType, SVGProps } from 'react';

  const ReactComponent: ComponentType<
    SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}
