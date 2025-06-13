import Add from '@material-design-icons/svg/round/add.svg?react';
import ArrowForwardIos from '@material-design-icons/svg/round/arrow_forward_ios.svg?react';
import { TextField, Input, Form, Label, TextArea } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { match } from 'ts-pattern';

import {
  useOptionallyManagedState,
  type UseStateReturnWithoutSetter,
} from '../../utils/use-optionally-managed-state';

import { Icon } from './icon-button';

export function SettingsDetailView({
  phasesSetter,
  className,
  ...props
}: SettingsDetailViewProps) {
  const [phases, setPhases] = useOptionallyManagedState(phasesSetter);

  return (
    <div
      {...props}
      className={twMerge(
        'flex w-full flex-col overflow-y-auto overscroll-contain',
        className
      )}
    >
      <div className="flex h-7.5 shrink-0 items-center border border-transparent border-b-appkit-divider-minor px-[5px]">
        <Icon SVG={Add} className="size-5" />
      </div>
      <div className="flex flex-col px-5">
        {phases.map((phase, i) => {
          return (
            <BuildPhase
              key={i}
              phase={phase}
              setPhase={(action) =>
                setPhases((phases) =>
                  phases.map((phase, j) =>
                    j === i
                      ? typeof action === 'function'
                        ? action(phase)
                        : action
                      : phase
                  )
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export interface SettingsDetailViewProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  phasesSetter: UseStateReturnWithoutSetter<Array<BuildPhaseState>>;
}

function BuildPhase({ phase, setPhase }: BuildPhaseProps) {
  return (
    <div className="border border-transparent border-b-appkit-divider-minor">
      <BuildPhaseHeader phase={phase} setPhase={setPhase} />
      {phase.isOpen && <BuildPhaseBody phase={phase} setPhase={setPhase} />}
    </div>
  );
}

interface BuildPhaseProps extends BuildPhaseHeaderProps, BuildPhaseBodyProps {}

function BuildPhaseHeader({
  phase: { isOpen, title, contents },
  setPhase,
}: BuildPhaseHeaderProps) {
  const itemsLength = ('items' in contents ? contents.items : undefined)
    ?.length;
  const suffix =
    typeof itemsLength === 'number'
      ? ` (${itemsLength} ${itemsLength ? 'items' : 'item'})`
      : '';

  return (
    <div
      {...(isOpen ? { 'data-open': '' } : {})}
      className="group flex h-10 items-center gap-x-2"
      onClick={() =>
        setPhase((phase) => ({
          ...phase,
          isOpen: !phase.isOpen,
        }))
      }
    >
      <Icon
        SVG={ArrowForwardIos}
        className="size-2.5 text-xcode-accordion-arrow group-data-open:rotate-90 active:text-xcode-accordion-arrow-active"
      />
      <h1 className="cursor-default text-xs font-bold whitespace-pre select-none">{`${title}${suffix}`}</h1>
    </div>
  );
}

interface BuildPhaseHeaderProps {
  phase: BuildPhaseState;
  setPhase: React.Dispatch<React.SetStateAction<BuildPhaseState>>;
}

export interface BuildPhaseState extends BuildPhaseInfo {
  isOpen?: boolean;
}

function BuildPhaseBody({
  phase: { contents },
  setPhase,
}: BuildPhaseBodyProps) {
  return (
    <div className="pt-1 pb-3 pl-25">
      {match(contents)
        .with(
          { type: 'Run Script' },
          ({
            type,
            shell,
            shellScript,
            // runScriptForInstallBuildsOnly,
            // runScriptBasedOnDependencyAnalysis,
            // showEnvVarsInBuildLog,
            // useDiscoveredDepFile,
            // inputFiles,
            // inputFileLists,
            // outputFiles,
            // outputFileLists,
          }) => (
            <Form className="flex flex-col gap-y-2 text-[10px] leading-none">
              <TextField
                type="text"
                className="flex flex-1 items-center gap-x-2"
              >
                <Label>Shell</Label>
                <Input
                  className={twMerge(
                    'flex-1 px-1.5 py-1',
                    styles.inputField,
                    styles.inputFieldFocusRing
                  )}
                  onChange={({ target: { value } }) => {
                    setPhase((phase) => ({
                      ...phase,
                      contents: match(phase.contents)
                        .with({ type }, (contents) => ({
                          ...contents,
                          shell: value,
                        }))
                        .otherwise((contents) => contents),
                    }));
                  }}
                  value={shell ?? ''}
                />
              </TextField>
              <TextField
                type="text"
                className="flex flex-1 items-center gap-x-2"
              >
                <Label className="hidden">Script</Label>
                <TextArea
                  className={twMerge(
                    'flex-1 px-1.5 py-1 font-mono',
                    styles.multiLineInputField,
                    styles.inputFieldFocusRing
                  )}
                  onChange={({ target: { value } }) => {
                    setPhase((phase) => ({
                      ...phase,
                      contents: match(phase.contents)
                        .with({ type }, (contents) => ({
                          ...contents,
                          shellScript: value,
                        }))
                        .otherwise((contents) => contents),
                    }));
                  }}
                  value={shellScript ?? ''}
                />
              </TextField>
            </Form>
          )
        )
        .otherwise(() => null)}
    </div>
  );
}

const styles = {
  inputField: twMerge(
    'box-border border border-x-[#f5f5f5] border-t-[#f5f5f5] border-b-[#d1d1d1] p-0 text-[10px] dark:border-x-[#363533] dark:border-t-[#363533] dark:border-b-[#4d4d4b] dark:bg-[#2e2d2b] dark:text-white'
  ),
  multiLineInputField: twMerge(
    'border border-transparent border-y-[#e6e6e6] border-r-[#e6e6e6] p-0 text-[10px] dark:border-y-[#393836] dark:border-r-[#393836] dark:bg-[#292a30] dark:text-white'
  ),
  inputFieldFocusRing: twMerge(
    'outline-none focus:ring-3 focus:ring-[#95b3f6] dark:focus:ring-[#3a658c]'
  ),
};

interface BuildPhaseBodyProps {
  phase: BuildPhaseState;
  setPhase: React.Dispatch<React.SetStateAction<BuildPhaseState>>;
}

interface BuildPhaseInfo {
  title: string;
  contents: BuildPhaseContents;
}

type BuildPhaseContents =
  | {
      type:
        | 'Target Dependencies'
        | 'Run Build Tool Plug-ins'
        | 'Copy Bundle Resources';
      items: Array<string>;
    }
  | {
      type: 'Compile Sources';
      items: Array<{ name: string; compilerFlags?: string }>;
    }
  | {
      type: 'Link Binary With Libraries';
      items: Array<{ name: string; required?: boolean }>;
    }
  | {
      type: 'Run Script';
      shell?: string;
      shellScript?: string;
      runScriptForInstallBuildsOnly?: boolean;
      runScriptBasedOnDependencyAnalysis?: boolean;
      showEnvVarsInBuildLog?: boolean;
      useDiscoveredDepFile?: string;
      inputFiles?: Array<string>;
      inputFileLists?: Array<string>;
      outputFiles?: Array<string>;
      outputFileLists?: Array<string>;
    };
