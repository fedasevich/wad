import { observer } from 'mobx-react-lite';
import React, { Suspense } from 'react';
import { Col } from 'react-bootstrap';
import Loader from '../components/loader/Loader';
import { Settings } from '../components/settings/Settings';
import PageProvider from './PageProvider';

const SettingsPage = observer(() => {
  return (
    <PageProvider pageName="Settings">
      <Suspense fallback={<Loader />}>
        <Col xl={12}>
          <Settings />
        </Col>
      </Suspense>
    </PageProvider>
  );
});

export default SettingsPage;
