import AppContent from '../components/Content/AppContent';
import AppHeader from '../components/Header';
import AppSidebar from '../components/Sidebar';
import { Breadcrumb, Layout, theme } from 'antd';
const { Content } = Layout;

function DefaultLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
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
            maxWidth: '1200px',
            flex: '0 0 auto',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
              boxShadow: '0 0 20px 3px rgba(150,190,238,.15)',
            }}
          >
            <AppContent />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
