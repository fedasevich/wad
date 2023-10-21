import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import UserCurrencyConvertConfirmModal from '../UserCurrencyConvertConfirmModal';

jest.mock('../../../../store');
jest.mock('../../../modal/modal');

describe('UserCurrencyConvertModal.js', () => {
  const userCurrencyConvertModal = true;
  const setUserCurrencyConvertModal = jest.fn();
  const onConfirmMock = jest.fn();

  beforeEach(async () => {
    render(
      <UserCurrencyConvertConfirmModal
        convertConfirmModal={userCurrencyConvertModal}
        setConfirmConfirmModal={setUserCurrencyConvertModal}
        onConfirm={onConfirmMock}
      />
    );
  });

  it('should render modal', () => {
    const titleElement = screen.getByText('Do you want to save your changes?');
    const saveButton = screen.getByText('Save changes');
    const cancelButton = screen.getByText("Don't save");

    expect(titleElement).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('should call the onConfirm function when "Save changes" is clicked', async () => {
    const saveButton = screen.getByText('Save changes');
    fireEvent.click(saveButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('should call the setConfirmConfirmModal function when "Don\'t save" is clicked', async () => {
    const cancelButton = screen.getByText("Don't save");
    fireEvent.click(cancelButton);

    expect(setUserCurrencyConvertModal).toHaveBeenCalledTimes(1);
    expect(setUserCurrencyConvertModal).toHaveBeenCalledWith(false);
  });
});
