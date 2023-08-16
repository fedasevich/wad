import { useOnClickOutside } from './useOnClickOutside';

export function useNestedModal(nestedRef, handler) {
  const nestedHandler = (event) => {
    const modalRoot = document.getElementById('modal-root');
    const activeElements = modalRoot.querySelectorAll('.custom_modal_content.active');
    const activeElementCount = activeElements.length;
    if (activeElementCount > 1) {
      return;
    }
    handler(event);
  };

  useOnClickOutside(nestedRef, nestedHandler);
}
