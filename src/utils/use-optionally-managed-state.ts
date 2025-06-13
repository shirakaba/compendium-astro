import { useEffect, useMemo, useState } from 'react';

/**
 * A hook for "optionally managed" components to use under the hood.
 *
 * @example
 * // Unmanaged:
 * // The parent defines the starting value via props, but the component itself
 * // manages the state changes under the hood.
 * <Input defaultValue={value} />
 *
 * // Managed:
 * // The component state is completely determined by the props passed to it.
 * const [value, setValue] = useState('');
 * <Input value={value} onChange={({ target: { value } }) => setValue(value)} />
 */
export function useOptionallyManagedState<T>(
  setter: UseStateReturnWithoutSetter<T>
) {
  const [state, setState] = setter;
  const internalSetter = useState<T>(state);

  useEffect(() => {
    if (setState) {
      // It's managed by a parent, so no need to run our internal setter.
      return;
    }

    // The props changed, so sync up our internal state.
    internalSetter[1](state);
  }, [state, setState]);

  // Prefer to return the parent setter when defined. Otherwise, the internal.
  return useMemo(
    () => (setState ? (setter as UseStateReturn<T>) : internalSetter),
    [setter, internalSetter]
  );
}

export type UseStateReturnWithoutSetter<T> = [
  state: T,
  setState?: React.Dispatch<React.SetStateAction<T>>,
];

export type UseStateReturn<T> = [
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>,
];
