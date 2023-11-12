import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './AppSidebar.scss';

import {
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const SIDEBAR_MENU = [
  { path: '/home/dashboard', icon: <DashboardOutlined />, title: 'Tổng Quan' },
  { path: '/home/score', icon: <UserAddOutlined />, title: 'Điểm' },
  { path: '/home/upload', icon: <FileTextOutlined />, title: 'Nhập Dữ Liệu' },
  { path: '/home/award', icon: <FileSyncOutlined />, title: 'Khen thưởng' },
  { path: '/home/student', icon: <UserOutlined />, title: 'Sinh Viên' },
  { path: '/home/statistics', icon: <UserOutlined />, title: 'Thống Kê' },
  { path: '/home/admin', icon: <TeamOutlined />, title: 'Admin' },
];

const { Sider } = Layout;

export default function AppSidebar() {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={true} />
      </div>
    </>
  );
}

function Sidebar({ collapsible }) {
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location) if (currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  return (
    <>
      <Sider
        theme="light"
        collapsible={collapsible}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="navigation"
      >
        <div className="logo" style={{ cursor: 'pointer' }}>
          <img
            src="https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png"
            alt="Logo"
            style={{ height: '32px' }}
          />
        </div>
        <Menu mode="inline" selectedKeys={[currentPath]}>
          {SIDEBAR_MENU.map((menuItem) => (
            <Menu.Item
              style={{ borderRadius: '0', width: '100%', margin: '4px 0px' }}
              key={menuItem.path}
              icon={menuItem.icon}
            >
              <Link to={menuItem.path} />
              {menuItem.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
}
