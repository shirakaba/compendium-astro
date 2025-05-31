/// <reference types="react/experimental" />

import {
  useRef,
  useState,
  unstable_ViewTransition as ViewTransition,
  startTransition,
} from 'react';
import { createPortal } from 'react-dom';
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
  const [fullSize, setFullSize] = useState(false);

  // const transitionName = 'xcode-window';

  return (
    // I introduced this container <div> just to handle Astro's `.not-content`
    // failing to match on the popover (for reasons I can't explain).
    <div className={className}>
      {/* https://github.com/facebook/react/blob/ee76351917106c6146745432a52e9a54a41ee181/fixtures/view-transition/src/components/Page.js#L112 */}
      {fullSize ? (
        createPortal(
          <ViewTransition
          // default="enter-slide-right exit-slide-left"
          // name={transitionName}
          >
            <XcodeWindowInner
              {...props}
              className="fixed inset-0 z-50"
              onZoom={() => setFullSize((fullsize) => !fullsize)}
            />
          </ViewTransition>,
          document.body
        )
      ) : (
        <ViewTransition
        // default="enter-slide-right exit-slide-left"
        // name={transitionName}
        >
          <XcodeWindowInner
            {...props}
            onZoom={() => setFullSize((fullsize) => !fullsize)}
          />
        </ViewTransition>
      )}
    </div>
  );
}

function XcodeWindowInner({
  className,
  onZoom,
  ...props
}: XcodeWindowInnerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [projectAndTargetsListVisibility, setProjectAndTargetsListVisibility] =
    useState<'visible' | 'hidden'>('visible');

  return (
    <div
      ref={ref}
      {...props}
      // TODO: would be nice to animate the full-screen backdrop
      // illuminating/dimming independently of the Xcode window
      className={twMerge(
        'pt-appkit-window-shadow-top pr-appkit-window-shadow-right pb-appkit-window-shadow-bottom pl-appkit-window-shadow-left',
        className
      )}
    >
      <div className="relative flex h-40 min-h-[360px] resize flex-col overflow-hidden rounded-lg bg-appkit-title-bar text-sm text-black shadow-appkit-window dark:text-white">
        <TitleBar
          onZoom={() => {
            startTransition(async () => {
              await new Promise<void>((resolve) => setTimeout(resolve, 500));
              onZoom?.();
            });
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
  onZoom?: () => void;
};
