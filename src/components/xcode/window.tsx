import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { ProjectSelectionBar } from './project-selection-bar';
import { SettingsSplitView } from './settings-split-view';
import { TabBar } from './tab-bar';
import { TitleBar } from './title-bar';
import { XcodeprojNavigationBar } from './xcodeproj-navigation-bar';

export function XcodeWindow({
  withoutPopover,
  className,
  ...props
}: { withoutPopover?: boolean } & Omit<XcodeWindowInnerProps, 'isPopover'>) {
  return (
    // I introduced this container <div> just to handle Astro's `.not-content`
    // failing to match on the popover (for reasons I can't explain).
    <div className={className}>
      {/* This one reserves space in the DOM tree. */}
      <XcodeWindowInner {...props} isPopover={false} />

      {/* This one is the popover. */}
      {!withoutPopover && <XcodeWindowInner {...props} isPopover={true} />}
    </div>
  );
}

function XcodeWindowInner({
  className,
  isPopover,
  ...props
}: XcodeWindowInnerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [projectAndTargetsListVisibility, setProjectAndTargetsListVisibility] =
    useState<'visible' | 'hidden'>('visible');

  return (
    <div
      ref={ref}
      {...props}
      popover={isPopover ? 'manual' : undefined}
      // TODO: would be nice to animate the full-screen backdrop
      // illuminating/dimming independently of the Xcode window
      className={twMerge(
        // Appearance
        'pt-appkit-window-shadow-top pr-appkit-window-shadow-right pb-appkit-window-shadow-bottom pl-appkit-window-shadow-left',

        // Animation
        'transition-all transition-discrete duration-500',

        // Popover open
        'open:size-full starting:open:top-(--starting-top) starting:open:left-(--starting-left) starting:open:h-(--starting-height) starting:open:w-(--starting-width)',

        // Popover closed
        isPopover &&
          'top-(--ending-top) left-(--ending-left) h-(--ending-height) w-(--ending-width)',
        className
      )}
    >
      <div className="relative flex h-40 min-h-[360px] resize flex-col overflow-hidden rounded-lg bg-appkit-title-bar text-sm text-black shadow-appkit-window dark:text-white">
        <TitleBar
          onZoom={() => {
            const popover = isPopover
              ? ref.current
              : ref.current?.nextElementSibling;
            if (!(popover instanceof HTMLDivElement)) {
              return;
            }

            const inFlow = popover.previousElementSibling;
            if (!(inFlow instanceof HTMLDivElement)) {
              return;
            }

            // Get the initial dimensions so that we can animate with
            // `@starting-style`.
            const { width, height, top, left } = inFlow.getBoundingClientRect();

            // The popover handles the close, while the in-flow component
            // handles the open.
            if (isPopover) {
              popover.style.setProperty('--ending-top', `${top}px`);
              popover.style.setProperty('--ending-left', `${left}px`);
              popover.style.setProperty('--ending-width', `${width}px`);
              popover.style.setProperty('--ending-height', `${height}px`);
              popover.hidePopover();
            } else {
              popover.style.setProperty('--starting-top', `${top}px`);
              popover.style.setProperty('--starting-left', `${left}px`);
              popover.style.setProperty('--starting-width', `${width}px`);
              popover.style.setProperty('--starting-height', `${height}px`);
              popover.style.setProperty('--ending-top', '0px');
              popover.style.setProperty('--ending-left', '0px');
              popover.style.setProperty('--ending-width', '100%');
              popover.style.setProperty('--ending-height', '100%');
              popover.showPopover();

              // On Safari, the popover fails to lay out properly before 18.4.
              // https://webkit.org/blog/16574/webkit-features-in-safari-18-4/
              // https://github.com/WebKit/WebKit/commit/4b91c7fe1375dbfc4af6c5d8e3ebe23d6589f895
            }
          }}
        />
        <div className="flex bg-appkit-content-view">
          <TabBar />
        </div>
        <div className="flex bg-xcode-content-view">
          <ProjectSelectionBar />
        </div>
        <div className="flex bg-xcode-content-view">
          <XcodeprojNavigationBar
            onToggleProjectAndTargetsListVisibility={() => {
              setProjectAndTargetsListVisibility((visibility) =>
                visibility === 'visible' ? 'hidden' : 'visible'
              );
            }}
          />
        </div>

        <div className="flex grow overflow-hidden bg-xcode-content-view">
          <SettingsSplitView
            projectAndTargetsListVisibility={projectAndTargetsListVisibility}
          />
        </div>

        <div className="box-border flex h-7 shrink-0 self-stretch border-t border-appkit-divider-major bg-xcode-content-view">
          {/* TODO: footer */}
        </div>
      </div>
    </div>
  );
}

type XcodeWindowInnerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isPopover: boolean;
};
