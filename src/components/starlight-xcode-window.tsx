import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { XcodeWindow } from './xcode/window';

export function StarlightXcodeWindow({ className }: { className?: string }) {
  const [fullSize, setFullSize] = useState(false);

  useEffect(() => {
    const header = document.querySelector('header');
    const sidebar = document.getElementById('starlight__sidebar');
    const footer = document.querySelector('footer');
    const menuButton = document.querySelector<HTMLElement>(
      'starlight-menu-button'
    );
    if (!header || !sidebar || !footer || !menuButton) {
      return;
    }

    header.style.transition = 'transform 500ms, opacity 500ms';
    menuButton.style.transition = 'transform 500ms, opacity 500ms';
    sidebar.style.transition = 'transform 500ms, opacity 500ms';
    footer.style.transition = 'transform 500ms, opacity 500ms';

    if (fullSize) {
      header.style.transform = 'translateY(-100%)';
      menuButton.style.transform = 'translateY(-100%)';
      sidebar.style.transform = 'translateX(-100%)';
      footer.style.transform = 'translateY(100%)';

      header.style.opacity = '0';
      menuButton.style.opacity = '0';
      sidebar.style.opacity = '0';
      footer.style.opacity = '0';
    } else {
      header.style.transform = '';
      menuButton.style.transform = '';
      sidebar.style.transform = '';
      footer.style.transform = '';

      header.style.opacity = '';
      menuButton.style.opacity = '';
      sidebar.style.opacity = '';
      footer.style.opacity = '';
    }
  }, [fullSize]);

  return (
    <XcodeWindow
      fullsize={fullSize}
      className={twMerge(
        'transition-all transition-discrete duration-500 data-[fullsize]:fixed data-[fullsize]:inset-0 data-[fullsize]:size-full',
        className
      )}
      onZoom={() => {
        setFullSize((fullSize) => !fullSize);
      }}
    />
  );
}
