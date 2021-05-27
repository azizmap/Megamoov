import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu} from 'antd';
import {
    UserOutlined,
    PlaySquareOutlined,
    LockOutlined,
    RocketOutlined,
    PlusCircleOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <>
                <Sider collapsible collapsed={collapsed} reverseArrow={true} width={200} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="1" icon={<LockOutlined />}><Link to='/changepassword'>Change Password</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<PlaySquareOutlined />} title="Movies Editor">
                        <Menu.Item key="2" icon={<PlusCircleOutlined />}><Link to='/addmovie'>Add Movie</Link></Menu.Item>
                        <Menu.Item key="3" icon={<SettingOutlined />}><Link to='listmovies'>Edit Movies</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<RocketOutlined />} title="Games Editor">
                        <Menu.Item key="4" icon={<PlusCircleOutlined />}><Link to='/addgame'>Add Games</Link></Menu.Item>
                        <Menu.Item key="5" icon={<SettingOutlined />}><Link to='/listgames'>Edit Games</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                </Sider>
            </>
        );
    }
}

export default SideBar