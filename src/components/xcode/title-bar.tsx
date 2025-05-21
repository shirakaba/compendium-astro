import Add from '@material-design-icons/svg/round/add.svg?react';
import ExpandMore from '@material-design-icons/svg/round/expand_more.svg?react';
import PhoneIphone from '@material-design-icons/svg/round/phone_iphone.svg?react';
import PlayArrow from '@material-design-icons/svg/round/play_arrow.svg?react';
import Stop from '@material-design-icons/svg/round/stop.svg?react';
import Warning from '@material-design-icons/svg/round/warning.svg?react';
import DockToLeft from '@material-symbols/svg-500/rounded/dock_to_left.svg?react';
import DockToRight from '@material-symbols/svg-500/rounded/dock_to_right.svg?react';
import Graph1 from '@material-symbols/svg-500/rounded/graph_1-fill.svg?react';
import { cva } from 'class-variance-authority';
import { match } from 'ts-pattern';

import AppIcon from './app-icon.png';
import { Icon, IconButton } from './icon-button';

export function TitleBar() {
  return (
    // We use two containers in order to stop content overflowing into the
    // padding box. We can simplify this to a single container with
    // `overflow: clip` once `overflow-clip-margin: content-box` is supported.
    <div className="border-appkit-divider-major bg-xcode-title-bar min-h-[38px]border-b flex px-2.5 py-1.5">
      <div className="flex grow items-center gap-x-[14px] overflow-hidden">
        <WindowControlButtonRow />

        <IconButton SVG={DockToRight} className="size-5" />
        <IconButton SVG={Stop} className="invisible size-5" />
        <IconButton SVG={PlayArrow} className="size-5 [&_svg]:scale-150" />

        <WorkingTree />

        <div className="grow"></div>

        <TargetBar state="built" />

        <WarningsCounter />

        <div className="grow-2"></div>

        <IconButton SVG={Add} className="size-5" />
        <IconButton SVG={DockToLeft} className="size-5" />
      </div>
    </div>
  );
}

export function WindowControlButtonRow() {
  return (
    <div className="flex gap-2">
      <WindowControlButton type="close" />
      <WindowControlButton type="minimize" />
      <WindowControlButton type="zoom" />
    </div>
  );
}

export function WindowControlButton({
  type,
}: {
  type: 'close' | 'minimize' | 'zoom';
}) {
  return <div className={windowControlButtonVariants({ type })}></div>;
}

const windowControlButtonVariants = cva('size-3 rounded-full', {
  variants: {
    type: {
      close: 'bg-[#EC6B5D] hairline-border-inset-[#D45241]',
      minimize: 'bg-[#F4B449] hairline-border-inset-[#DCA535]',
      zoom: 'bg-[#64C54F] hairline-border-inset-[#52AC36]',
    },
  },
});

export function WorkingTree() {
  return (
    <div className="flex items-center gap-x-1">
      <Icon
        SVG={Graph1}
        className="size-5 -scale-x-100 rotate-180 [&>svg]:-translate-y-0.5"
      />
      <div className="flex flex-col gap-y-0.5">
        <span className="text-xs leading-none font-bold text-[#4A4A4A] dark:text-[#EBEBEA]">
          compendium
        </span>
        <span className="text-xs leading-none text-[#7C7C7C] dark:text-[#ADADAD]">
          main
        </span>
      </div>
    </div>
  );
}

export function TargetBar({ state }: { state: 'running' | 'built' }) {
  return (
    // We use two containers in order to stop content overflowing into the
    // padding box. We can simplify this to a single container with
    // `overflow: clip` once `overflow-clip-margin: content-box` is supported.
    <div className="flex min-w-0 grow-1 rounded-md bg-[#E8E8E8] px-[7px] py-0.5 dark:bg-[#434241]">
      <div className="flex grow-1 content-start items-center overflow-hidden text-xs leading-none text-nowrap text-[#373736] dark:text-white">
        <div
          // We set a min-width based on the AppIcon and chevron, as otherwise the
          // neighbouring flex items won't start shrinking until this shrinks to
          // 0px. Unfortunately `min-w-min-content` and friends don't work, even
          // with `break-all`. The span just refuses to assume a minimum intrinsic
          // size of 0px.
          className="group flex min-w-[calc(16px+4px+1em)] shrink-[999999] items-center overflow-hidden rounded-md p-1 hover:bg-[#DBDAD9] dark:hover:bg-[#4C4B4A]"
        >
          <img
            src={AppIcon.src}
            width="16"
            height="16"
            className="scale mr-1 shrink-0"
          />
          <span className="min-w-0 overflow-hidden overflow-ellipsis mr-1">
            compendium
          </span>
          <div className="block size-[1em] shrink-0">
            <strong className="block size-full pl-1 group-hover:hidden text-xcode-outer-button dark:text-[#D8D8D5]">
              〉
            </strong>
            <Icon
              SVG={ExpandMore}
              className="hidden size-full group-hover:block dark:text-[#D8D8D5] [&_svg]:scale-150"
            />
          </div>
        </div>
        <div
          // Again, we set the min-w as otherwise this shrinks to 0px (whilst
          // somehow overflowing despite overflow-hidden).
          className="group mr-1 flex min-w-[calc(1em+6px+1em)] shrink-1 items-center overflow-hidden rounded-md p-1 hover:bg-[#DBDAD9] dark:hover:bg-[#4C4B4A]"
        >
          <Icon
            SVG={PhoneIphone}
            className="mr-1.5 size-[1em] shrink-0 dark:text-[#A2A2A2] [&_svg]:scale-125"
          />
          <span className="mr-1 min-w-0 overflow-hidden overflow-ellipsis">
            iPhone 16 Pro
          </span>
          <Icon
            SVG={ExpandMore}
            className="size-[1em] invisible group-hover:visible shrink-0 dark:text-[#D8D8D5] [&_svg]:scale-150"
          />
        </div>
        <span className="shrink-0 grow text-right">
          {match(state)
            .with('running', () => 'Running compendium')
            .with('built', () => (
              <>
                Build <strong>Succeeded</strong> | 2025/02/12 at 14:40
              </>
            ))
            .exhaustive()}
        </span>
      </div>
    </div>
  );
}

export function WarningsCounter() {
  return (
    <span className="group -ml-1 rounded-md p-1.5 text-[10px] leading-none text-nowrap hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]">
      <Icon
        SVG={Warning}
        className="size-2.5 text-[#F5C73B] dark:text-[#F5C73B] [&_svg]:scale-150 [&_svg]:bg-[radial-gradient(circle_at_50%_60%,_white_30%,_transparent_31%)]"
      />
      <strong className="ml-1 leading-none text-[#777777] dark:text-[#B4B4B4]">
        487
      </strong>
    </span>
  );
}
