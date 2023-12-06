import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const FormLogin = () => (
  <>
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Hãy nhập username',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" autoComplete="text" size="large" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Hãy nhập password!',
        },
      ]}
    >
      <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} size="large" />
    </Form.Item>
    <Form.Item>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </div>
    </Form.Item>
  </>
);
export default FormLogin;
