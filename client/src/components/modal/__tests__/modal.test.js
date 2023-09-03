import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Modal from '../modal';

describe('Modal.js', () => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(portalRoot);

  it('renders without crashing', async () => {
    render(<Modal active setActive={() => undefined} />);

    const modal = document.querySelector('.custom_modal.active');
    const container = document.querySelector('.custom_modal_content.active');

    expect(modal).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('renders children inside the modal', async () => {
    const testText = 'Test Text';
    render(
      <Modal active setActive={() => undefined}>
        <h2>{testText}</h2>
      </Modal>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('calls setActive with false when clicking outside the modal', async () => {
    const mockSetActive = jest.fn();

    render(
      <Modal active setActive={mockSetActive}>
        <h2>test</h2>
      </Modal>
    );

    const modalContent = document.querySelector('.custom_modal_content.active');
    fireEvent.click(modalContent);

    expect(mockSetActive).not.toHaveBeenCalled();
    const modal = document.querySelector('.custom_modal.active');
    await act(() => {
      userEvent.click(modal);
    });

    expect(mockSetActive).toHaveBeenCalledWith(false);
  });

  it('handles nested modals', async () => {
    const mockMainSetActive = jest.fn();
    const mockNestedSetActive = jest.fn();

    render(
      <>
        <Modal active setActive={mockMainSetActive}>
          <h2>main</h2>
        </Modal>
        <Modal active setActive={mockNestedSetActive}>
          <h2>nested</h2>
        </Modal>
      </>
    );

    const [mainModal, nestedModal] = document.querySelectorAll('.custom_modal.active');

    const nestedModalContent = nestedModal.querySelector('.custom_modal_content.active');
    fireEvent.click(nestedModalContent);

    expect(mockMainSetActive).not.toHaveBeenCalled();
    expect(mockNestedSetActive).not.toHaveBeenCalled();

    await act(() => {
      userEvent.click(nestedModal);
    });
    expect(mockMainSetActive).not.toHaveBeenCalled();
    expect(mockNestedSetActive).toHaveBeenCalledWith(false);

    const mainModalContent = mainModal.querySelector('.custom_modal_content.active');
    fireEvent.click(mainModalContent);

    expect(mockMainSetActive).not.toHaveBeenCalled();

    await act(() => {
      userEvent.click(mainModal);
    });

    expect(mockMainSetActive).toHaveBeenCalledWith(false);
  });
});
