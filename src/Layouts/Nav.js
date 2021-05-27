import React, { useContext } from 'react';
import { Layout, Menu, Typography} from 'antd';
import './Layouts.css'
import { Link , useHistory} from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const {Header} = Layout;
const {Title} = Typography;

const Nav = () =>{

    const [user, setUser] = useContext(UserContext)
    const handleLogout = () =>{
        setUser(null)
        localStorage.removeItem('user')
    }

    // const currentRoute = useHistory().location.pathname.toLocaleLowerCase()
    // className={currentRoute.includes("/games") ? "tab active" : "tab"}
    return(
        <>
                <Header className="navbar" >
                    <div className="logo">
                        <Title level={3} className='nav-logo'><Link to='/'><a href="">Megamoov</a></Link></Title>
                    </div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">
                            <Link to='/'>Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2"><Link to='/movies'>Movies</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/games'>Games</Link></Menu.Item>
                        {user === null && <Menu.Item key="4"><Link to='/login'>Login</Link></Menu.Item>}
                        {user && <Menu.Item key="5" onClick={handleLogout}>Logout</Menu.Item>}
                    </Menu>
                </Header>
        </>
    )
}

export default Nav