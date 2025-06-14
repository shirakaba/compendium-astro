import Add from '@material-design-icons/svg/round/add.svg?react';
import ArrowForwardIos from '@material-design-icons/svg/round/arrow_forward_ios.svg?react';
import {
  TextField,
  Input,
  Form,
  Label,
  TextArea,
  Table,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { match, P } from 'ts-pattern';

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
      ? ` (${itemsLength} ${itemsLength === 1 ? 'item' : 'items'})`
      : '';

  return (
    <div
      {...(isOpen ? { 'data-open': '' } : {})}
      className="group flex h-10 items-center gap-x-2 select-none"
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
  const colCount = match(contents.type)
    .with('Compile Sources', 'Link Binary With Libraries', () => 2)
    .otherwise(() => 1);

  return (
    <div className="pt-1 pb-3 pl-25">
      {match(contents)
        .with({ items: P.array() }, (contents) => {
          const { type, items } = contents;
          return (
            <Table
              className="w-full text-[11px]"
              aria-label={match(contents.type)
                .with('Compile Sources', () => 'Sources')
                .with('Copy Bundle Resources', () => 'Target dependencies')
                .with(
                  'Link Binary With Libraries',
                  () => 'Frameworks and Libraries'
                )
                .with('Run Build Tool Plug-ins', () => 'Build tool plug-ins')
                .with('Target Dependencies', () => 'Target dependencies')
                .exhaustive()}
            >
              <TableHeader className="text-left">
                <Column
                  isRowHeader
                  className={twMerge(
                    styles.tableHeaderCol,
                    styles.tableHeaderFirstCol
                  )}
                >
                  Name
                </Column>
                {match(contents.type)
                  .with(
                    'Compile Sources',
                    'Link Binary With Libraries',
                    (type) => (
                      <Column
                        isRowHeader
                        className={twMerge(
                          styles.tableHeaderCol,
                          styles.tableHeaderLastCol
                        )}
                      >
                        {match(type)
                          .with('Compile Sources', () => 'Compiler Flags')
                          .with('Link Binary With Libraries', () => 'Status')
                          .exhaustive()}
                      </Column>
                    )
                  )
                  .otherwise(() => null)}
              </TableHeader>
              <TableBody>
                {items.length ? (
                  items.map((item, i) => {
                    const { name } = item;

                    return (
                      <Row key={i} className={styles.tableRow}>
                        <Cell
                          className={twMerge(
                            styles.tableRowCell,
                            styles.tableRowFirstCell
                          )}
                        >
                          {name}
                        </Cell>
                        {match(type)
                          .with(
                            'Compile Sources',
                            'Link Binary With Libraries',
                            () => (
                              <Cell
                                className={twMerge(
                                  styles.tableRowCell,
                                  styles.tableRowLastCell
                                )}
                              >
                                {match(type)
                                  .returnType<string | null>()
                                  .with(
                                    'Compile Sources',
                                    () =>
                                      (
                                        item as BuildPhaseItem<'Compile Sources'>
                                      ).compilerFlags ?? ''
                                  )
                                  .with('Link Binary With Libraries', () =>
                                    (
                                      item as BuildPhaseItem<'Link Binary With Libraries'>
                                    ).required
                                      ? 'Required'
                                      : 'Optional'
                                  )
                                  .otherwise(() => null)}
                              </Cell>
                            )
                          )
                          .otherwise(() => null)}
                      </Row>
                    );
                  })
                ) : (
                  <Row className={styles.tableRow}>
                    <Cell
                      colSpan={colCount}
                      className="h-[70px] text-center text-[#808080] dark:text-[#9c9c9c]"
                    >
                      {instructionsForEmptyTable(type).body}
                    </Cell>
                  </Row>
                )}
              </TableBody>
            </Table>
          );
        })
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
  tableHeaderCol: twMerge(
    'h-7 cursor-default border border-t-transparent border-r-appkit-divider-minor border-b-appkit-divider-minor border-l-transparent font-normal whitespace-pre select-none active:bg-[#f2f2f2] active:font-bold dark:active:bg-[#363432]'
  ),
  tableHeaderFirstCol: twMerge('pr-1 pl-2'),
  tableHeaderMiddleCol: twMerge('px-1'),
  tableHeaderLastCol: twMerge('pr-2 pl-1'),

  tableRow: twMerge(
    'border border-x-transparent border-t-transparent border-b-appkit-divider-minor'
  ),
  tableRowCell: twMerge('cursor-default py-1 whitespace-pre select-none'),
  tableRowFirstCell: twMerge('pl-3'),
  tableRowMiddleCell: twMerge('px-3'),
  tableRowLastCell: twMerge('pr-3'),

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
      items: Array<{ name: string }>;
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

export type BuildPhaseWithItems<
  T extends Extract<BuildPhaseContents, { items: Array<any> }>['type'],
> = BuildPhaseContents & { type: T };
export type BuildPhaseItem<
  T extends Extract<BuildPhaseContents, { items: Array<any> }>['type'],
> = BuildPhaseWithItems<T>['items'][number];

function instructionsForEmptyTable(
  type: Extract<BuildPhaseContents, { items: Array<unknown> }>['type']
) {
  return match(type)
    .returnType<{ body: string; toolbar?: string }>()
    .with('Target Dependencies', () => ({
      body: 'Add target dependencies here',
    }))
    .with('Run Build Tool Plug-ins', () => ({
      body: "No build tool plug-ins were found in any of this target's package dependencies.",
    }))
    .with('Copy Bundle Resources', () => ({
      body: 'Add resource files here',
    }))
    .with('Compile Sources', () => ({
      body: 'Add source files here',
    }))
    .with('Link Binary With Libraries', () => ({
      body: 'Add frameworks & libraries here',
      toolbar: 'Drag to reorder linked binaries',
    }))
    .exhaustive();
}
