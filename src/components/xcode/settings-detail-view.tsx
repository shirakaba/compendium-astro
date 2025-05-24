import Add from '@material-design-icons/svg/round/add.svg?react';
import ArrowForwardIos from '@material-design-icons/svg/round/arrow_forward_ios.svg?react';
import { useState } from 'react';

import { Icon } from './icon-button';

export function SettingsDetailView() {
  const [phases, setPhases] = useState<
    Array<{ title: string; isOpen?: boolean }>
  >([
    { title: 'Target Dependencies (0 items)' },
    { title: 'Run Build Tool Plug-ins (0 items)' },
    { title: '[CP] Check Pods Manifest.lock' },
    { title: '[Expo] Configure project' },
    { title: 'Compile Sources (4 items)' },
    { title: 'Link Binary With Libraries (1 item)' },
    { title: 'Copy Bundle Resources (5 items)' },
    { title: 'Bundle React Native code and images' },
    { title: '[CP] Copy Pods Resources' },
    { title: '[CP] Embed Pods Frameworks' },
  ]);

  return (
    <div className="flex w-full flex-col overflow-y-auto">
      <div className="flex h-7.5 shrink-0 items-center border border-transparent border-b-appkit-divider-minor px-[5px]">
        <Icon SVG={Add} className="size-5" />
      </div>
      <div className="flex flex-col px-5">
        {phases.map(({ title, isOpen }, i) => (
          <BuildPhase
            key={i}
            isOpen={isOpen}
            title={title}
            onClickHeader={() =>
              setPhases((phases) =>
                phases.map((phase, j) => ({
                  ...phase,
                  isOpen: j === i ? !phase.isOpen : phase.isOpen,
                }))
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

function BuildPhase({ isOpen, onClickHeader, title }: BuildPhaseProps) {
  return (
    <>
      <BuildPhaseHeader isOpen={isOpen} title={title} onClick={onClickHeader} />
      {isOpen && <BuildPhaseBody />}
    </>
  );
}

interface BuildPhaseProps
  extends Omit<BuildPhaseHeaderProps, 'onClick'>,
    BuildPhaseBodyProps {
  onClickHeader?: BuildPhaseHeaderProps['onClick'];
}

function BuildPhaseHeader({ isOpen, title, onClick }: BuildPhaseHeaderProps) {
  return (
    <div
      {...(isOpen ? { 'data-open': '' } : {})}
      className="group flex h-10 items-center gap-x-2 border border-transparent border-b-appkit-divider-minor"
      onClick={onClick}
    >
      <Icon
        SVG={ArrowForwardIos}
        className="size-2.5 text-xcode-accordion-arrow group-data-open:rotate-90 active:text-xcode-accordion-arrow-active"
      />
      {/*
        Problem: Now that we've removed Tailwind Preflight for the sake of
        Astro, this has user agent styles to fight against. Maybe we could
        fork Preflight and select on .not-content.
      */}
      <h1 className="cursor-default text-xs select-none">{title}</h1>
    </div>
  );
}

interface BuildPhaseHeaderProps extends Pick<BuildPhaseInfo, 'title'> {
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function BuildPhaseBody() {
  return <div>Hi</div>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BuildPhaseBodyProps {
  // TODO
}

interface BuildPhaseInfo {
  title: string;
}
