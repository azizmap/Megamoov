import React, {useContext,useEffect, useState} from 'react';
import { UserContext } from "../Context/UserContext";
import { Link } from 'react-router-dom'
import { Layout, Typography, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Pages.css'
import axios from 'axios';

const { Title } = Typography;
const { Content } = Layout;

const Login = () =>{

    const [,setUser] = useContext(UserContext)
    const [input, setInput] = useState({email:'', password:''})

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(input.email)
        console.log(input.password)
        axios.post("https://backendexample.sanbersy.com/api/user-login", {
            email : input.email,
            password: input.password
        }).then(
            (res)=>{
                let user = res.data.user
                let token = res.data.token
                let currentUser = {name: user.name, email:user.email, token}
                setUser(currentUser)
                localStorage.setItem('user', JSON.stringify(currentUser))
            }
        ).catch((err)=>{
            alert(JSON.stringify(err.response.data))
        })
    }

    const handleChange = (event) =>{
        let value = event.target.value
        let name = event.target.name
        switch(name){
            case 'email':{
                setInput({...input, email:value})
                break;
            }
            case 'password':{
                setInput({...input, password: value})
                break;
            }
            default:{break;}
        }
    }

    return(
        <>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                
                <Title level={2} style={{textAlign:'center'}}>Login</Title>
                <div className="form-login">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input name='email' value={input.email} onChange={handleChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>

                        <div>
                            <Button onClick={handleSubmit} type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to='/registration'><a href="">register now!</a></Link>
                        </div>
                    </Form>
                </div>

                </div>
            </Content>
        </>
    )
}

export default Login