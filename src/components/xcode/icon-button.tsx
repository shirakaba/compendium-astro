import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export function IconButton({
  className,
  disabled,
  hoverable = true,
  ...props
}: IconProps & { disabled?: boolean; hoverable?: boolean }) {
  return (
    <Icon
      {...props}
      role="button"
      tabIndex={0}
      {...(disabled ? { ['data-disabled']: '' } : {})}
      className={twMerge(iconButtonVariants({ hoverable }), className)}
    />
  );
}

const iconButtonVariants = cva('', {
  variants: {
    hoverable: {
      true: 'p-1 rounded-md hover:bg-xcode-hoverable-button-bg',
      false: '',
    },
  },
});

// https://github.com/marella/material-design-icons/tree/main/svg#readme
// https://github.com/gregberge/svgr/tree/main
// https://developers.google.com/fonts/docs/material_icons
// https://github.com/marella/material-symbols/tree/main/svg/500#readme

export function Icon({ SVG, className, ...props }: IconProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'text-xcode-outer-button box-content inline size-[1em] leading-0',
        className
      )}
    >
      <SVG className="m-0 inline size-[inherit] fill-current p-0" />
    </div>
  );
}

export type IconProps = {
  className?: string;
  SVG: React.ComponentType<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
