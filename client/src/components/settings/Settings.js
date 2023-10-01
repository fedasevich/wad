import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MenuProvider from '../MenuProvider';
import { SettingGroup } from './SettingGroup';
import { CloseCalculatorOnSubmit } from './closeCalculatorOnSubmit/CloseCalculatorOnSubmit';
import { UserCurrencySettings } from './currency/UserCurrencySettings';
import { PersistTransactionFilter } from './persistTransactionFilter/PersistTransactionFilter';
import { StartPageSettings } from './startPage/StartPageSettings';
import { Theme } from './theme/Theme';

export const Settings = observer(() => {
  return (
    <Row className="vh-80">
      <Col md={{ offset: 1, span: 10 }}>
        <MenuProvider>
          <MenuProvider.Container>
            <SettingGroup name="Currency">
              <UserCurrencySettings />
            </SettingGroup>

            <SettingGroup name="Start page">
              <StartPageSettings />
            </SettingGroup>

            <SettingGroup name="Calculator">
              <CloseCalculatorOnSubmit />
            </SettingGroup>

            <SettingGroup name="Transaction">
              <PersistTransactionFilter />
            </SettingGroup>

            <SettingGroup name="Theme">
              <Theme />
            </SettingGroup>
          </MenuProvider.Container>
        </MenuProvider>
      </Col>
    </Row>
  );
});
