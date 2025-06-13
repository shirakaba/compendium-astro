import { useCallback, useRef } from 'react';

import {
  SettingsDetailView,
  type SettingsDetailViewProps,
} from './settings-detail-view';
import { ProjectAndTargetsList } from './settings-project-and-targets-list';

export function SettingsSplitView({
  projectAndTargetsListVisibility,
  phasesSetter,
}: SettingsSplitViewProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeStateRef = useRef<
    | { type: 'idle' }
    | {
        type: 'resizing';
        startState: PointerDownState;
        removedClasses: Set<string>;
      }
  >({ type: 'idle' });

  const onResize = useCallback(
    (event: PointerEvent, startState: PointerDownState) => {
      const sidebar = sidebarRef.current;
      if (!sidebar) {
        return;
      }

      // Resize just began.
      if (resizeStateRef.current.type !== 'resizing') {
        if (!(event.target instanceof HTMLElement)) {
          return;
        }

        // Remove all transition classes at the start of a drag, as otherwise it
        // kills performance. We'll restore them post-drag.
        const removedClasses = new Set<string>();
        sidebar.classList.forEach((value) => {
          if (!value.startsWith('transition')) {
            return;
          }
          removedClasses.add(value);
          sidebar.classList.remove(value);
        });

        resizeStateRef.current = {
          type: 'resizing',
          startState,
          removedClasses,
        };
      }

      // Stop selection occurring.
      event.preventDefault();
      // Not really needed, but stops the event bubbling further needlessly.
      event.stopPropagation();

      const sidebarClientX = sidebar.getBoundingClientRect().x;
      const width = event.clientX - sidebarClientX;
      sidebar.style.setProperty('--width', `${width}px`);
    },
    []
  );

  const onResizeFinish = useCallback((event: PointerEvent) => {
    // Stop selection occurring.
    event.preventDefault();
    // Not really needed, but stops the event bubbling further needlessly.
    event.stopPropagation();

    // The expected state.
    if (resizeStateRef.current.type === 'resizing') {
      sidebarRef.current?.classList.add(
        ...resizeStateRef.current.removedClasses
      );
    }

    resizeStateRef.current = { type: 'idle' };
  }, []);

  return (
    <div className="flex grow overflow-hidden">
      <div
        ref={sidebarRef}
        // This transition kills the performance of the drag handle, so we
        // remove it when drags begin and restore it when drags end.
        className="ml-(--ml) w-(--width) max-w-[calc(100%-80px)] min-w-[170px] overflow-y-auto overscroll-contain transition-[margin-left_2s]"
        style={{
          ['--width' as string]: '170px',
          // FIXME: margin-left isn't working as expected when --width < 170px.
          ['--ml' as string]:
            projectAndTargetsListVisibility === 'visible'
              ? '0px'
              : 'calc(-1 * min(max(170px, var(--width)), calc(100%-80px)) - 1px)',
        }}
        inert={projectAndTargetsListVisibility === 'hidden'}
      >
        <ProjectAndTargetsList />
      </div>
      <DragHandle
        onResize={onResize}
        onResizeFinish={onResizeFinish}
        disabled={projectAndTargetsListVisibility === 'hidden'}
      />
      <SettingsDetailView phasesSetter={phasesSetter} />
    </div>
  );
}

export interface SettingsSplitViewProps extends SettingsDetailViewProps {
  projectAndTargetsListVisibility: 'visible' | 'hidden';
}

function DragHandle({
  onResize,
  onResizeFinish,
  disabled,
}: {
  onResize: (event: PointerEvent, pointerDownState: PointerDownState) => void;
  onResizeFinish: (event: PointerEvent) => void;
  disabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStateRef = useRef<
    | { type: 'pointerup' }
    | { type: 'pointerdown'; startState: PointerDownState }
  >({ type: 'pointerup' });

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (pointerStateRef.current.type !== 'pointerdown') {
        return;
      }

      onResize(event, pointerStateRef.current.startState);
    },
    [onResize]
  );
  const onPointerDown = useCallback(
    ({ nativeEvent }: React.PointerEvent<HTMLDivElement>) => {
      pointerStateRef.current = {
        type: 'pointerdown',
        startState: {
          clientX: nativeEvent.clientX,
          clientY: nativeEvent.clientY,
          offsetX: nativeEvent.offsetX,
          offsetY: nativeEvent.offsetY,
        },
      };

      containerRef.current?.setPointerCapture(nativeEvent.pointerId);
      containerRef.current?.addEventListener('pointermove', onPointerMove);
    },
    []
  );
  const onPointerFinish = useCallback(
    ({ nativeEvent }: React.PointerEvent<HTMLDivElement>) => {
      pointerStateRef.current = { type: 'pointerup' };
      containerRef.current?.releasePointerCapture(nativeEvent.pointerId);
      containerRef.current?.removeEventListener('pointermove', onPointerMove);
      onResizeFinish(nativeEvent);
    },
    [onResizeFinish]
  );

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerFinish}
      onPointerCancel={onPointerFinish}
      {...(disabled ? { 'data-disabled': '' } : {})}
      draggable={false}
      // TODO: Change cursor to one-sided once it's at its min width
      className="relative box-content w-px touch-none not-data-[disabled]:cursor-col-resize"
    >
      {/* The hitbox. */}
      <div className="absolute -inset-x-2 h-full"></div>
      {/* The visual line. */}
      <div className="absolute h-full w-px bg-appkit-divider-supermajor"></div>
    </div>
  );
}

type PointerDownState = Pick<
  MouseEvent,
  'clientX' | 'clientY' | 'offsetX' | 'offsetY'
>;
