import React from 'react';
import { Layout, theme } from 'antd';
import AdminInfo from '../../../components/AdminInfo';

const { Header } = Layout;

function AppHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        background: '#f5f5f5',
        marginBottom: '30px',
      }}
    >
      <AdminInfo />
    </Header>
  );
}

export default AppHeader;
