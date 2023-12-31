import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './AppSidebar.scss';

import {
  FileTextOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  TrophyOutlined,
  CalculatorOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';

const SIDEBAR_MENU = [
  { path: '/home/dashboard', icon: <DashboardOutlined />, title: 'Tổng Quan' },
  { path: '/home/score', icon: <CalculatorOutlined />, title: 'Quản trị điểm' },
  { path: '/home/upload', icon: <FileTextOutlined />, title: 'Nhập Dữ Liệu' },
  { path: '/home/award', icon: <TrophyOutlined />, title: 'Quản trị khen thưởng' },
  { path: '/home/student', icon: <TeamOutlined />, title: 'Quản trị sinh viên' },
  { path: '/home/statistics', icon: <FileExcelOutlined />, title: 'Thống Kê' },
  { path: '/home/admin', icon: <UserOutlined />, title: 'Admin' },
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
