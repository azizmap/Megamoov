import React, {useContext, useState} from 'react';
import axios from 'axios';
import { Layout, Typography, Form, Input, Button } from 'antd';
import './Pages.css'
import { UserContext } from "../Context/UserContext"

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

const ChangePassword = () =>{
    const [user] = useContext(UserContext)
    const [input, setInput] = useState({current_password: '',new_password:'',new_confirm_password:''})


    const handleSubmit = (event) =>{
        event.preventDefault()
        
        axios.post(`https://backendexample.sanbersy.com/api/change-password`, {current_password: input.current_password, new_password: input.new_password, new_confirm_password: input.new_confirm_password}, {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
            alert("success")
            setInput({current_password: "", new_password: "", new_confirm_password: ""})
        }).catch((err)=>{
            alert("salah input")
            setInput({current_password: "", new_password: "", new_confirm_password: ""})
        })
    }
    

    const handleChange = (event) =>{
        let typeOfInput = event.target.name
        let value = event.target.value

        if (typeOfInput === "current_password"){
            setInput({...input, current_password: value})
        }else if (typeOfInput === "new_password"){
            setInput({...input, new_password: value})
        }else if (typeOfInput === "new_confirm_password"){
            setInput({...input, new_confirm_password: value})
        }
    }


    return(
        <>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                
                <Title level={2} style={{textAlign:'center'}}>Change Password</Title>
                <div className="form-password">
                    <Form
                    {...formItemLayout}
                        name="form"
                        className="password-form"
                        initialValues={{ remember: true }}
                        >
                        <Form.Item
                            label="Current Password"
                            name="currentPassword"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            name='current_password'
                            value={input.current_password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Current Password"
                            />
                        </Form.Item>
                        <Form.Item
                            label="New Password"
                            name="new_password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            name='new_password'
                            value={input.new_password}
                            onChange={handleChange}
                            type="password"
                            placeholder="New Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="new_current_password"
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
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password onChange={handleChange} name='new_confirm_password' value={input.new_confirm_password} placeholder='re-enter password'/>
                        </Form.Item>
                        
                        <Form.Item {...tailFormItemLayout}>
                        <div>
                            <Button onClick={handleSubmit} type="primary" htmlType="submit" className="change-password-form-button">
                                Change Password
                            </Button>
                        </div>
                        </Form.Item>
                    </Form>
                </div>

                </div>
            </Content>
        </>
    )
}

export default ChangePassword