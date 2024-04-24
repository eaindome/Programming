import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { BarsOutlined, UserOutlined, TeamOutlined, TableOutlined } from '@ant-design/icons';
import { RiPagesFill } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";

const MenuList = ({ darkTheme }) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className='menu-bar'>
            <Menu.Item key="user" icon={<UserOutlined />}>
                <Link to="">User</Link>
            </Menu.Item>
            <Menu.SubMenu key="subtasks" icon={<BarsOutlined />} title="Tables">
                <Menu.Item key="forticlientvpn" icon={<TableOutlined />}>
                    <Link to="/client/src/components/Tables/FortiClientVPNTable.js">ForticlientVPN</Link>
                </Menu.Item>
                <Menu.Item key="password-reset" icon={<TableOutlined />}>
                    <Link to="">Password-Reset</Link>
                </Menu.Item>
                <Menu.Item key="staff-pc" icon={<TableOutlined />}>
                    <Link to="">Staff Table</Link>
                </Menu.Item>
                <Menu.Item key="vendor-pc" icon={<TableOutlined />}>
                    <Link to="">Vendor Table</Link>
                </Menu.Item>
                <Menu.Item key="users" icon={<TeamOutlined />}>
                    <Link to="">User Table</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="landing-page" icon={<RiPagesFill />}> 
                <Link to="">Landing Page</Link>
            </Menu.Item>
            <Menu.Item key="sign-out" icon={<PiSignOutBold />}>
                Sign-out
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;



// , RiPagesLine 