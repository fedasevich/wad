import { observer } from 'mobx-react-lite';
import React, { Suspense } from 'react';
import { Col } from 'react-bootstrap';
import { Analytics } from '../components/analytics/Analytics';
import Loader from '../components/loader/Loader';
import PageProvider from './PageProvider';

const AnalyticsPage = observer(() => {
  return (
    <PageProvider>
      <Suspense fallback={<Loader />}>
        <Col xl={12}>
          <Analytics />
        </Col>
      </Suspense>
    </PageProvider>
  );
});

export default AnalyticsPage;
