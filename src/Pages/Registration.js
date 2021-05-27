import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from "../Context/UserContext";
import axios from 'axios'
import { Layout, Typography, Form, Input, Button } from 'antd';
import './Pages.css'

const { Title } = Typography;
const { Content } = Layout;

const formItemLayout = {
    labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    },
    wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
    xs: {
        span: 24,
        offset: 0,
    },
    sm: {
        span: 16,
        offset: 8,
    },
    },
};

const Registration = () =>{

    const [, setUser] = useContext(UserContext)
    const[input, setInput] = useState ({name:' ', email:' ', password:''})

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("https://backendexample.sanbersy.com/api/register", {
            name : input.name,
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
            case 'name':{
                setInput({...input, name:value})
                break;
            }
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
                
                <Title level={2} style={{textAlign:'center'}}>Registration</Title>
                <div className="form-regis">
                    <Form
                    {...formItemLayout}
                        name="form"
                        className="regis-form"
                        initialValues={{ remember: true }}
                        >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input onChange={handleChange} name='name' value={input.name} placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[{ required: true, message: 'Please input your E-mail!' }]}
                        >
                            <Input onChange={handleChange} name='email' value={input.email} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, min: 6, message: 'password minimum 6 characters' }]}
                            hasFeedback
                        >
                            <Input.Password
                            
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password onChange={handleChange} name='password' value={input.password} placeholder='re-enter password'/>
                        </Form.Item>
                        
                        <Form.Item {...tailFormItemLayout}>
                        <div>
                            <Button onClick={handleSubmit} type="primary" htmlType="submit" className="regis-form-button">
                                Sign-Up
                            </Button>
                            <div>
                                Or have an account ? <Link to='/login'><a href="">login here</a></Link>
                            </div>
                        </div>
                        </Form.Item>
                    </Form>
                </div>

                </div>
            </Content>
        </>
    )
}

export default Registration