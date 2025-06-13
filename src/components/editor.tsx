import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useRef, useEffect } from 'react';

export function Editor({
  initialValue = '',
  language,
}: {
  initialValue?: string;
  language?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const editor = monaco.editor.create(container, {
      value: [initialValue].join('\n'),
      language,
    });

    return () => {
      editor.dispose();
    };
  }, []);

  return <div ref={containerRef} className="size-full"></div>;
}
