export function SVG({
  svg: Child,
  ...props
}: { svg: React.ComponentType<SVGProps> } & SVGProps) {
  return <Child {...props} />;
}

type SVGProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};
