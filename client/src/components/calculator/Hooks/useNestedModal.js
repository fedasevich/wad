import { useOnClickOutside } from './useOnClickOutside';

export function useNestedModal(nestedRef, handler) {
  const nestedHandler = (event) => {
    const modalRoot = document.getElementById('modal-root');
    const activeModals = modalRoot.querySelectorAll('.custom_modal.active');

    const isNestedModalClick = Array.from(activeModals).some(
      (modal) => modal.contains(nestedRef.current) && modal !== event.target
    );

    if (isNestedModalClick) {
      return;
    }

    handler(event);
  };

  useOnClickOutside(nestedRef, nestedHandler);
}
