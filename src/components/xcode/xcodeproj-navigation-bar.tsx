import DockToRight from '@material-symbols/svg-500/rounded/dock_to_right.svg?react';
import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from './icon-button';

export function XcodeprojNavigationBar({
  onToggleProjectAndTargetsListVisibility,
}: {
  onToggleProjectAndTargetsListVisibility?: () => void;
}) {
  return (
    // We use two containers in order to stop content overflowing into the
    // padding box. We can simplify this to a single container with
    // `overflow: clip` once `overflow-clip-margin: content-box` is supported.
    <div className="bg-xcode-content-view border-appkit-divider-minor flex grow overflow-hidden border-b px-1.5">
      <div className="flex h-7 grow items-center gap-x-2 overflow-hidden">
        <Icon
          SVG={DockToRight}
          className="size-4 text-[#7F7F7F] active:text-[#262626] dark:text-[#969696] dark:active:text-[#DEDEDE]"
          onClick={onToggleProjectAndTargetsListVisibility}
        />
        <div className="grow"></div>
        <div className="flex gap-x-2 text-xs">
          <Bean>General</Bean>
          <Bean>Signing & Capabilities</Bean>
          <Bean>Resource Tags</Bean>
          <Bean>Info</Bean>
          <Bean>Build Settings</Bean>
          <Bean active>Build Phases</Bean>
          <Bean>Build Rules</Bean>
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
}

function Bean({
  active,
  children,
  className,
}: PropsWithChildren<
  { active?: boolean } & React.JSX.IntrinsicElements['div']
>) {
  return (
    <div
      {...(active ? { ['data-active']: '' } : {})}
      className={twMerge(
        'group rounded-md px-2 py-0.5 font-medium text-nowrap text-[#373736] select-none hover:bg-[#F2F2F2] data-[active]:bg-[#D6E6FD] data-[active]:text-[#3979F9] dark:text-white dark:hover:bg-[#303131] dark:data-[active]:bg-[#3A5172] dark:data-[active]:text-white',
        className
      )}
    >
      {children}
    </div>
  );
}
