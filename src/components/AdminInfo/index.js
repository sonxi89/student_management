import React from 'react';
import { Dropdown, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import './AdminInfo.scss';

function AdminInfo() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const items = [
    {
      key: '1',
      label: (
        <div className="profileAdmin">
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<UserOutlined />}
          />
          <p>Admin</p>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Đổi mật khẩu',
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      trigger={['click']}
      className="AdminInfo"
    >
      <div onClick={(e) => e.preventDefault()}>
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </div>
    </Dropdown>
  );
}

export default AdminInfo;
