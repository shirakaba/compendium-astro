import { useState } from 'react';
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
  const [projectAndTargetsListVisibility, setProjectAndTargetsListVisibility] =
    useState<'visible' | 'hidden'>('visible');

  return (
    <div
      {...props}
      className={twMerge(
        'pl-appkit-window-shadow-left pr-appkit-window-shadow-right pt-appkit-window-shadow-top pb-appkit-window-shadow-bottom',
        className
      )}
    >
      <div className="bg-appkit-title-bar shadow-appkit-window relative flex h-40 min-h-[360px] resize flex-col overflow-hidden rounded-lg text-sm text-black dark:text-white">
        <TitleBar />
        <div className="bg-appkit-content-view flex">
          <TabBar />
        </div>
        <div className="bg-xcode-content-view flex">
          <ProjectSelectionBar />
        </div>
        <div className="bg-xcode-content-view flex">
          <XcodeprojNavigationBar
            onToggleProjectAndTargetsListVisibility={() => {
              setProjectAndTargetsListVisibility((visibility) =>
                visibility === 'visible' ? 'hidden' : 'visible'
              );
            }}
          />
        </div>

        <div className="bg-xcode-content-view flex grow">
          <SettingsSplitView
            projectAndTargetsListVisibility={projectAndTargetsListVisibility}
          />
        </div>

        <div className="bg-xcode-content-view border-appkit-divider-major flex h-7 self-stretch border-t">
          {/* TODO: footer */}
        </div>
      </div>
    </div>
  );
}
