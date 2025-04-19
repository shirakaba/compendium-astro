import ArrowBackIos from '@material-design-icons/svg/round/arrow_back_ios.svg';
import ArrowForwardIos from '@material-design-icons/svg/round/arrow_forward_ios.svg';
import Warning from '@material-design-icons/svg/round/warning.svg';
import SlabSerif from '@material-symbols/svg-500/outlined/slab_serif.svg';
import UnfoldMore from '@material-symbols/svg-500/outlined/unfold_more.svg';

import { Icon, IconButton } from './icon-button';

export function ProjectSelectionBar() {
  return (
    <div className="bg-xcode-content-view border-appkit-divider-minor flex h-7 grow items-center gap-x-2 border-b px-1.5">
      <div className="group flex cursor-default items-center gap-x-1 rounded-md px-1 py-0.5 text-[#373736] hover:bg-[#F2F2F2] dark:text-white dark:hover:bg-[#303131]">
        <Icon
          SVG={SlabSerif}
          className="size-4 text-[#3B79F4] dark:text-[#4B85EC]"
        />
        <span className="text-xs font-medium select-none">compendium</span>
        <Icon
          SVG={UnfoldMore}
          className="invisible -ml-1 size-3 group-hover:visible"
        />
      </div>

      <div className="grow"></div>

      <div className="flex items-center gap-x-0.5 pr-1">
        <IconButton
          SVG={ArrowBackIos}
          hoverable={false}
          className="text-xcode-inner-button -mx-1 size-4"
        />
        <Icon
          SVG={Warning}
          className="size-4 text-[#F5C73B] dark:text-[#F5C73B] [&_svg]:bg-[radial-gradient(circle_at_50%_60%,_white_30%,_transparent_31%)]"
        />
        <IconButton
          SVG={ArrowForwardIos}
          hoverable={false}
          disabled
          className="text-xcode-inner-button -mx-1 size-4"
        />
      </div>
    </div>
  );
}
