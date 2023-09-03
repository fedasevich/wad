import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SettingGroup } from '../SettingGroup';

describe('SettingGroup.js', () => {
  it('should render options based on authRoutes', () => {
    const name = 'Test Group Name';
    const childrenText = 'Test Children Content';

    render(
      <SettingGroup name={name}>
        <div>{childrenText}</div>
      </SettingGroup>
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });
});
