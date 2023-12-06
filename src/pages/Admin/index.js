import { EditOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Divider, Form, Input, Modal, Row, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import auth from '../../api/auth';
import './Admin.scss';

function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisplay, setIsDisplay] = useState(true);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    form.resetFields();
    setIsDisplay(true);
    setIsModalOpen(false);
    message.success('Đổi mật khẩu thành công');
  };

  const onFinish = (values) => {
    auth
      .changePassword(values)
      .then((res) => {
        if (res.errcode !== 0) {
          setIsDisplay(false);
        } else {
          handleSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '50px' }}>
        <h2>Admin</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '60%' }}>
          <Row align="middle">
            <Col xs={{ span: 24 }} sm={{ span: 7 }} md={{ span: 5 }}>
              <img
                className="last left circle pad5"
                src="/img/avatar.png"
                style={{
                  width: '100px',
                  height: '100px',
                }}
              />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 18 }}>
              <Descriptions labelStyle={{ fontSize: '17px', alignItems: 'center' }} size="small">
                <Descriptions.Item label="Tên" span={3}>
                  <h3
                    style={{
                      color: '#1e1c1c',
                      textTransform: 'capitalize',
                    }}
                  >
                    Admin
                  </h3>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Vai trò">
                  <h3
                    style={{
                      color: '#1e1c1c',
                      textTransform: 'capitalize',
                    }}
                  >
                    Quản lý
                  </h3>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </div>
        <div>
          <div
            style={{
              padding: '20px 0px',
            }}
          >
            <Button
              // onClick={() => {
              //   updatePanel.open();
              // }}
              type="primary"
              icon={<EditOutlined />}
              style={{ marginRight: '20px' }}
            >
              Chỉnh sửa
            </Button>
            <Button icon={<LockOutlined />} onClick={showModal}>
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>

      <Divider />
      <Button
        icon={<LogoutOutlined />}
        className="right"
        onClick={() => {
          logout();
        }}
      >
        Đăng xuất
      </Button>
      <Modal title="Đổi mật khẩu" onCancel={handleCancel} open={isModalOpen} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="password_old"
            rules={[
              {
                required: true,
                message: 'Hãy nhập mật khẩu cũ!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="password_new"
            rules={[
              {
                required: true,
                message: 'Hãy nhập mật khẩu mới!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <span
            className={isDisplay ? 'display-none' : ''}
            style={{
              color: 'red',
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            Mật khẩu cũ không đúng
          </span>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Admin;
