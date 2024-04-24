import React, { useState } from "react";
import { Button, Layout, theme } from "antd";
import Logo from './components/Logo';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MenuList from './components/MenuList';
import ToggleThemeButton from "./components/ToggleThemeButton";

const { Header, Sider } = Layout;
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const toggleTheme = () => { setDarkTheme(!darkTheme) };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme? 'dark' : 'light'} classname="sidebar">
        <Logo />
        <MenuList />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}>
          <Button type='text' className="toggle" onClick={()=> setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
        </Header>
      </Layout>
    </Layout>
  );
}

export default App;
