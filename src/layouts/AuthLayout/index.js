import { Row, Layout, Col } from 'antd';

function AuthLayout({ children }) {
  return (
    <Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Row>
        <Col style={{ background: '#FFF' }}>{children}</Col>
      </Row>
    </Layout>
  );
}

export default AuthLayout;
