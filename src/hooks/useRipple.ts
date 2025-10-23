import React, { useCallback, useRef } from 'react';

export function useRipple() {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      onClick?: () => void,
      disabled?: boolean,
    ) => {
      if (disabled) return;

      const button = ref.current;
      if (button) {
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        const rect = button.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.className = 'ripple';

        const ripple = button.getElementsByClassName('ripple')[0];
        ripple?.remove();

        button.appendChild(circle);

        setTimeout(() => {
          if (circle.parentElement === button) {
            button.removeChild(circle);
          }
        }, 600);
      }

      onClick?.();
    },
    [],
  );

  return { ref, handleClick };
}
