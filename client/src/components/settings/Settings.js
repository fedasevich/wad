import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MenuProvider from '../MenuProvider';
import { SettingGroup } from './SettingGroup';
import { CloseCalculatorOnSubmit } from './closeCalculatorOnSubmit/CloseCalculatorOnSubmit';
import { PersistTransactionFilter } from './persistTransactionFilter/PersistTransactionFilter';
import { StartPageSettings } from './startPage/StartPageSettings';
import { Theme } from './theme/Theme';


export const Settings = observer(({ }) => {
    return (
        <Row className='vh-80'>
            <Col md={{ offset: 1, span: 10 }} >
                <MenuProvider>
                    <MenuProvider.Container >
                        <SettingGroup name={'Start page'} >
                            <StartPageSettings />
                        </SettingGroup>
                    </MenuProvider.Container>
                </MenuProvider>
                <MenuProvider>
                    <MenuProvider.Container >
                        <SettingGroup name={'Calculator'} >
                            <CloseCalculatorOnSubmit />
                        </SettingGroup>
                    </MenuProvider.Container>
                </MenuProvider>
                <MenuProvider>
                    <MenuProvider.Container >
                        <SettingGroup name={'Transaction'} >
                            <PersistTransactionFilter />
                        </SettingGroup>
                    </MenuProvider.Container>
                </MenuProvider>
                <MenuProvider>
                    <MenuProvider.Container >
                        <SettingGroup name={'Theme'} >
                            <Theme />
                        </SettingGroup>
                    </MenuProvider.Container>
                </MenuProvider>
            </Col>
            {/* <Col md={{ offset: 1, span: 4 }} >
                <MenuProvider>
                    <MenuProvider.Container>
                    </MenuProvider.Container>
                </MenuProvider>
            </Col> */}
        </Row>
    );
})