import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { ProjectSelectionBar } from './project-selection-bar';
import {
  SettingsSplitView,
  type SettingsSplitViewProps,
} from './settings-split-view';
import { TabBar } from './tab-bar';
import { TitleBar } from './title-bar';
import { XcodeprojNavigationBar } from './xcodeproj-navigation-bar';

export function XcodeWindow({
  className,
  phasesSetter,
  ...props
}: XcodeWindowProps) {
  const [projectAndTargetsListVisibility, setProjectAndTargetsListVisibility] =
    useState<'visible' | 'hidden'>('visible');

  return (
    <WindowShadowPadding {...props} className={className}>
      <div className="window relative flex h-40 min-h-[360px] resize flex-col overflow-hidden rounded-lg bg-appkit-title-bar text-sm text-black shadow-appkit-window dark:text-white">
        <TitleBar />
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
            phasesSetter={phasesSetter}
          />
        </div>

        <div className="box-border flex h-7 shrink-0 self-stretch border-t border-appkit-divider-major bg-xcode-content-view">
          {/* TODO: footer */}
        </div>
      </div>
    </WindowShadowPadding>
  );
}

export function WindowShadowPadding({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      {...props}
      className={twMerge(
        'pt-appkit-window-shadow-top pr-appkit-window-shadow-right pb-appkit-window-shadow-bottom pl-appkit-window-shadow-left',
        className
      )}
    >
      {children}
    </div>
  );
}

export interface XcodeWindowProps
  extends SettingsSplitViewProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {}
