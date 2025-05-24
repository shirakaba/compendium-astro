import Add from '@material-design-icons/svg/round/add.svg?react';
import ArrowForwardIos from '@material-design-icons/svg/round/arrow_forward_ios.svg?react';

import { Icon } from './icon-button';

export function SettingsDetailView() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-7.5 items-center border border-transparent border-b-appkit-divider-minor px-[5px]">
        <Icon SVG={Add} className="size-5" />
      </div>
      <div className="flex flex-col px-5">
        <BuildPhase title="Target Dependencies (0 items)" />
        <BuildPhase title="Run Build Tool Plug-ins (0 items)" />
        <BuildPhase title="[CP] Check Pods Manifest.lock" />
        <BuildPhase title="[Expo] Configure project" />
        <BuildPhase title="Compile Sources (4 items)" />
        <BuildPhase title="Link Binary With Libraries (1 item)" />
        <BuildPhase title="Copy Bundle Resources (5 items)" />
        <BuildPhase title="Bundle React Native code and images" />
        <BuildPhase title="[CP] Copy Pods Resources" />
        <BuildPhase title="[CP] Embed Pods Frameworks" />
      </div>
    </div>
  );
}

function BuildPhase({
  isOpen: _isOpen,
  title,
}: {
  isOpen?: boolean;
  title: string;
}) {
  return (
    <div className="flex h-10 items-center gap-x-2 border border-transparent border-b-appkit-divider-minor">
      <Icon
        SVG={ArrowForwardIos}
        className="size-2.5 text-xcode-accordion-arrow active:text-xcode-accordion-arrow-active"
      />
      {/*
        Problem: Now that we've removed Tailwind Preflight for the sake of
        Astro, this has user agent styles to fight against
      */}
      <h1 className="text-xs">{title}</h1>
    </div>
  );
}
