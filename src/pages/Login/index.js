import React from 'react';
import { Form, Button, Layout, Col, Divider, Typography } from 'antd';
import FormLogin from '../../forms/FormLogin';
import auth from '../../api/auth';
import { AuthLayout } from '../../layouts';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;
function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
    auth
      .login(values)
      .then((res) => {
        localStorage.setItem('accessToken', res.token);
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        alert('Đăng nhập không thành công');
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout>
      <Content
        style={{
          padding: '30px 30px 30px',
          width: '440px',
          margin: '0 auto',
        }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
          <img
            src="https://demo-erp-crm.idurarapp.com/static/media/logo-icon.eaa69046.svg"
            alt="Logo"
            style={{
              margin: '-70px auto 40px',
              display: 'block',
            }}
          />
          <div className="space50"></div>
        </Col>
        <Title level={1}>Đăng nhập</Title>

        <Divider />
        <div className="site-layout-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <FormLogin />
            <Form.Item>
              <Button
                style={{ width: '100%', borderRadius: '4px', backgroundColor: '#1b98f5' }}
                type="primary"
                htmlType="submit"
                size="large"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </AuthLayout>
  );
}

export default Login;
