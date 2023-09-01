import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockTransactions } from '../../../../setupTests';
import { useStore } from '../../../store';
import ChangeTransactionModal from '../ChangeTransactionModal';

const mockTransaction = mockTransactions[0];

jest.mock('../../modal/modal');
jest.mock('../../../store');
describe('ChangeTransactionModal.js', () => {
  const changeTransactionModal = true;
  const setChangeTransactionModal = jest.fn();
  const { id, description, sum } = mockTransaction;

  beforeEach(async () => {
    render(
      <ChangeTransactionModal
        changeTransactionModal={changeTransactionModal}
        setChangeTransactionModal={setChangeTransactionModal}
        id={id}
      />
    );
  });

  it('renders modal with initial values', () => {
    expect(screen.getByText(/Change transaction/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Description: ${description}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Id: ${id}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Sum: ${sum}`, 'i'))).toBeInTheDocument();
    expect(screen.getByLabelText(/enter new description:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enter spent:/i)).toBeInTheDocument();
  });

  it('handles description and soent changes', () => {
    const descriptionInput = screen.getByLabelText(/enter new description:/i);
    const sumInput = screen.getByLabelText(/enter spent:/i);

    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(sumInput, { target: { value: 150 } });

    expect(descriptionInput).toHaveValue('New Description');
    expect(sumInput).toHaveValue(150);
  });

  it('handles modal close and commit', () => {
    const closeButton = screen.getByTestId('menu-cancel-button');
    const commitButton = screen.getByTestId('menu-commit-button');

    fireEvent.click(closeButton);
    fireEvent.click(commitButton);

    expect(setChangeTransactionModal).toHaveBeenCalledWith({ active: false, id: -1 });
    expect(useStore().category.changeTransaction).toHaveBeenCalledWith(id, '', '');
  });
});
