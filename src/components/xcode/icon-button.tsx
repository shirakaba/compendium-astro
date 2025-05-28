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
      true: 'rounded-md p-1 hover:bg-xcode-hoverable-button-bg',
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
    // TODO: Can we get away without a <div> here? Is it still needed for
    // IconButton's use-case of a rounded hit box on hover, or was it only ever
    // needed for fighting Docusaurus global styles?
    <div
      {...props}
      className={twMerge(
        'box-content inline size-[1em] leading-0 text-xcode-outer-button',
        className
      )}
    >
      {/*
        We apply display:inherit so that users can toggle the SVG between block
        and inline layout simply by setting the class of the outer div. It may
        not be great for different display types like flex and grid.

        If we can remove the outer <div>, we can remove this style inheritance.
      */}
      <SVG className="m-0 [display:inherit] size-[inherit] fill-current p-0" />
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
