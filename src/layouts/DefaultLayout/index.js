import AppHeader from '../components/Header';
import AppSidebar from '../components/Sidebar';

import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
const { Content } = Layout;

function DefaultLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <AppSidebar style={{ height: '100vh' }} />
        <Layout>
          <AppHeader />
          <Content
            style={{
              margin: '5px auto',
              width: '100%',
              maxWidth: '1600px',
              flex: '0 0 auto',
            }}
          >
            <div
              style={{
                padding: 40,
                minHeight: 500,
                background: colorBgContainer,
                boxShadow: '0 0 20px 3px rgba(150,190,238,.15)',
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default DefaultLayout;
