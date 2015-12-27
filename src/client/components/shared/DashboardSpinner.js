import React from 'react';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import Spinner from '.././ui/Spinner';

const displayName = 'DashboardSpinner';

const DashboardSpinner = () => (
  <DashboardContentWrapper className={displayName}>
    <Spinner className={`${displayName}-main`} />
  </DashboardContentWrapper>
);

DashboardSpinner.displayName = displayName;

export default DashboardSpinner;