import SlabSerif from '@material-symbols/svg-500/outlined/slab_serif.svg?react';
import type { PropsWithChildren } from 'react';

import AppIcon from './app-icon.png';
import { Icon } from './icon-button';

export function ProjectAndTargetsList() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-y-3 p-4">
        <div className="text:[#272727] m-0 text-xs font-bold uppercase dark:text-[#DEDEDE]">
          Project
        </div>
        {/* For now, just a single-project list */}
        <Project label="compendium" />
      </div>

      <hr className="m-2 border-appkit-divider-minor" />

      <div className="flex flex-col gap-y-3 px-4 pb-4">
        <div className="text:[#272727] m-0 text-xs font-bold uppercase dark:text-[#DEDEDE]">
          Targets
        </div>
        {/* For now, just a single-target list */}
        <Target label="compendium" selected />
      </div>
    </div>
  );
}

export function Project({ label, selected }: ItemProps & { label: string }) {
  return (
    <Item selected={selected}>
      <Icon
        SVG={SlabSerif}
        className="size-4 text-[#3B79F4] dark:text-[#4B85EC]"
      />
      <span className="text-xs font-medium select-none">{label}</span>
    </Item>
  );
}

export function Target({ label, selected }: ItemProps & { label: string }) {
  return (
    <Item selected={selected}>
      <img
        src={AppIcon.src}
        width="16"
        height="16"
        className="scale shrink-0"
      />
      <span className="text-xs font-medium select-none">{label}</span>
    </Item>
  );
}

export function Item({ children, selected }: PropsWithChildren<ItemProps>) {
  return (
    <div
      tabIndex={0}
      {...(selected ? { 'data-selected': '' } : {})}
      className="-mx-1.5 -my-1 flex gap-1 rounded-md px-1.5 py-1 text-[#272727] focus:bg-[#2A62D9] focus:text-white focus:outline-none not-focus:data-selected:bg-[#DDDCDC] dark:text-[#DEDEDE] dark:not-focus:data-selected:bg-[#464646]"
    >
      {children}
    </div>
  );
}

interface ItemProps {
  selected?: boolean;
}
