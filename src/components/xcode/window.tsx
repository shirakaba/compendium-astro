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
  React.HTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
>) {
  const ref = useRef<HTMLDialogElement>(null);
  const [projectAndTargetsListVisibility, setProjectAndTargetsListVisibility] =
    useState<'visible' | 'hidden'>('visible');

  return (
    <dialog
      ref={ref}
      {...props}
      // TODO: would be nice to animate the full-screen backdrop
      // illuminating/dimming independently of the Xcode window
      className={twMerge(
        // Appearance.
        'pt-appkit-window-shadow-top pr-appkit-window-shadow-right pb-appkit-window-shadow-bottom pl-appkit-window-shadow-left',

        // Animation.
        'transition-all transition-discrete duration-500',

        // Overriding <dialog> user agent styles to make it start as visible.
        'relative block size-auto',

        // Open/close styling.
        'open:size-full starting:open:top-(--starting-top) starting:open:left-(--starting-left) starting:open:h-(--starting-height) starting:open:w-(--starting-width)',

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

            if (div.open) {
              div.close();
            } else {
              // Get the initial dimensions so that we can animate with
              // `@starting-style`.
              const { width, height, top, left } = div.getBoundingClientRect();
              div.style.setProperty('--starting-top', `${top}px`);
              div.style.setProperty('--starting-left', `${left}px`);
              div.style.setProperty('--starting-width', `${width}px`);
              div.style.setProperty('--starting-height', `${height}px`);

              // <dialog> only seems to animate the properties when animating
              // from `display: none`, so we reset it back to its user agent
              // styles for one frame.
              div.style.transitionDuration = '0s';
              div.classList.remove('block', 'relative', 'size-auto');
              requestAnimationFrame(() => {
                div.style.transitionDuration = '';
                div.showModal();
              });
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
    </dialog>
  );
}
