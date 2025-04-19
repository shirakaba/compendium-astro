import ArrowBackIos from '@material-design-icons/svg/round/arrow_back_ios.svg?react';
import ArrowForwardIos from '@material-design-icons/svg/round/arrow_forward_ios.svg?react';
import AddColumnRight from '@material-symbols/svg-500/outlined/add_column_right.svg?react';
import GridView from '@material-symbols/svg-500/outlined/grid_view.svg?react';
import SlabSerif from '@material-symbols/svg-500/outlined/slab_serif.svg?react';
import SyncAlt from '@material-symbols/svg-500/outlined/sync_alt.svg?react';

import { Icon, IconButton } from './icon-button';

export function TabBar() {
  return (
    <div className="bg-xcode-content-view border-appkit-divider-minor flex h-7 grow items-center gap-x-2 border-b px-1.5">
      <Icon
        SVG={GridView}
        className="size-4 text-[#7F7F7F] dark:text-[#969696]"
      />
      <Divider />
      <IconButton
        SVG={ArrowBackIos}
        hoverable={false}
        className="text-xcode-inner-button size-4"
      />
      <IconButton
        SVG={ArrowForwardIos}
        hoverable={false}
        disabled
        className="text-xcode-inner-button size-4"
      />

      <Tab />
      <div className="grow"></div>

      <Icon
        SVG={SyncAlt}
        className="size-4 text-[#7F7F7F] dark:text-[#969696]"
      />
      <Divider />
      <IconButton
        SVG={AddColumnRight}
        hoverable={false}
        className="text-xcode-inner-button size-4"
      />
    </div>
  );
}

function Divider() {
  return <div className="bg-appkit-divider-minor h-[1em] w-px"></div>;
}

function Tab() {
  return (
    <div className="bg-xcode-selected-tab flex h-full items-center gap-x-1 px-5 text-xs leading-none">
      <Icon
        // Trying to suggest the Xcode logo. Alternatively:
        // bottom_panel_open
        // picture_in_picture_center
        // photo
        // integration_instructions
        // rectangle
        // slab_serif
        SVG={SlabSerif}
        className="size-4 text-[#3B79F4] dark:text-[#4B85EC]"
      />
      <span className="font-medium text-[#3677F8] dark:text-white">
        compendium
      </span>
    </div>
  );
}
