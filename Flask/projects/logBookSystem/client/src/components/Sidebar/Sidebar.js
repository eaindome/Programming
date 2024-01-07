// Sidebar.js
import React, { useState } from "react";
import { Button, Layout } from "antd";
import Logo from './Logo';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MenuList from './MenuList';
import ToggleThemeButton from "./ToggleThemeButton";

const { Sider } = Layout;

const Sidebar = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const toggleTheme = () => { setDarkTheme(!darkTheme) };

  return (
    <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme? 'dark' : 'light'} classname="sidebar">
      <Logo />
      <MenuList />
      <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      <Button type='text' className="toggle" onClick={()=> setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
    </Sider>
  );
};

export default Sidebar;