import React from 'react';
import MUITabs from 'material-ui/lib/tabs/tabs';

const displayName = 'ui-Tabs';

const Tabs = ({children}) => {
  return (
    <MUITabs>{children}</MUITabs>
  );
}

Tabs.displayName = displayName;

export default Tabs;