import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const header = document.querySelector('header');
    const sidebar = document.getElementById('starlight__sidebar');
    const footer = document.querySelector('footer');
    const menuButton = document.querySelector<HTMLElement>(
      'starlight-menu-button'
    );
    if (!header || !sidebar || !footer || !menuButton) {
      return;
    }

    header.style.transition = 'transform 500ms, opacity 500ms';
    menuButton.style.transition = 'transform 500ms, opacity 500ms';
    sidebar.style.transition = 'transform 500ms, opacity 500ms';
    footer.style.transition = 'transform 500ms, opacity 500ms';

    if (fullSize) {
      header.style.transform = 'translateY(-100%)';
      menuButton.style.transform = 'translateY(-100%)';
      sidebar.style.transform = 'translateX(-100%)';
      footer.style.transform = 'translateY(100%)';

      header.style.opacity = '0';
      menuButton.style.opacity = '0';
      sidebar.style.opacity = '0';
      footer.style.opacity = '0';
    } else {
      header.style.transform = '';
      menuButton.style.transform = '';
      sidebar.style.transform = '';
      footer.style.transform = '';

      header.style.opacity = '';
      menuButton.style.opacity = '';
      sidebar.style.opacity = '';
      footer.style.opacity = '';
    }
  }, [fullSize]);

  return (
    // I introduced this container <div> just to handle Astro's `.not-content`
    // failing to match on the popover (for reasons I can't explain).
    <div className={className}>
      <XcodeWindowInner
        {...props}
        fullsize={fullSize}
        onZoom={() => setFullSize((fullsize) => !fullsize)}
      />
    </div>
  );
}

function XcodeWindowInner({
  className,
  fullsize,
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
      {...(fullsize ? { ['data-fullsize']: '' } : {})}
      // TODO: would be nice to animate the full-screen backdrop
      // illuminating/dimming independently of the Xcode window
      className={twMerge(
        'pt-appkit-window-shadow-top pr-appkit-window-shadow-right pb-appkit-window-shadow-bottom pl-appkit-window-shadow-left',
        'transition-all transition-discrete duration-500 data-[fullsize]:fixed data-[fullsize]:inset-0 data-[fullsize]:size-full',
        className
      )}
    >
      <div className="relative flex h-40 min-h-[360px] resize flex-col overflow-hidden rounded-lg bg-appkit-title-bar text-sm text-black shadow-appkit-window dark:text-white">
        <TitleBar
          onZoom={() => {
            onZoom?.();
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
  fullsize?: boolean;
  onZoom?: () => void;
};
