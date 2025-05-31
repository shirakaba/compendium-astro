import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { ProjectSelectionBar } from './project-selection-bar';
import { SettingsSplitView } from './settings-split-view';
import { TabBar } from './tab-bar';
import { TitleBar } from './title-bar';
import { XcodeprojNavigationBar } from './xcodeproj-navigation-bar';

export function XcodeWindow({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
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
        'pt-appkit-window-shadow-top pr-appkit-window-shadow-right pb-appkit-window-shadow-bottom pl-appkit-window-shadow-left transition-all transition-discrete duration-500 open:size-full starting:open:top-(--starting-top) starting:open:left-(--starting-left) starting:open:h-(--starting-height) starting:open:w-(--starting-width)',
        className
      )}
    >
      <div className="relative flex h-40 min-h-[360px] resize flex-col overflow-hidden rounded-lg bg-appkit-title-bar text-sm text-black shadow-appkit-window dark:text-white">
        <TitleBar
          onZoom={() => {
            const div = ref.current;
            if (!div) {
              return;
            }

            if (div.popover) {
              // Removing the 'popover' attribute triggers a janky transition.
              // I've not found any way around it. Here are the styles the
              // browser applies (the CSS is inspectable in Chrome).
              //
              // STAGE 1 (first half of transition)
              // transitions style {
              //   position: fixed;
              //   top: 0;
              //   bottom: 0;
              //   height: 100%;
              //   width: 100%;
              // }
              //
              // STAGE 2 (second half of transition)
              // transitions style {
              //   position: static;
              //   top: auto;
              //   width: auto;
              //   height: auto;
              //   bottom: auto;
              // }
              //
              // STAGE 3
              // Initial styles.

              // The best we can do for now is just opt out of the transition.
              div.style.transitionDuration = '0s';
              div.popover = null;
              requestAnimationFrame(() => {
                div.style.transitionDuration = '';
              });
            } else {
              // Get the initial dimensions so that we can animate with
              // `@starting-style`.
              const { width, height, top, left } = div.getBoundingClientRect();
              div.style.setProperty('--starting-top', `${top}px`);
              div.style.setProperty('--starting-left', `${left}px`);
              div.style.setProperty('--starting-width', `${width}px`);
              div.style.setProperty('--starting-height', `${height}px`);

              // Adding `popover` sets the computed display to `none`.
              div.popover = 'manual';

              // Unfortunately, all browsers fail to animate the transition
              // unless given a frame resting in `display: none`.
              div.style.transitionDuration = '0s';
              requestAnimationFrame(() => {
                div.style.transitionDuration = '';
                div.togglePopover();
              });

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
