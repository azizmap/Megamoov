import React, {useContext, useState} from 'react';
import { UserContext } from "../Context/UserContext";
import axios from 'axios';
import { Layout, Typography, Image, Select,  Checkbox, Row, Col,} from 'antd';
import { Form, Input, InputNumber, Button } from 'antd';
import './Pages.css'

const { Title, Text } = Typography;
const { Content } = Layout;
const {Option} = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
required: '${label} is required!',
types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
},
number: {
    range: '${label} must be between ${min} and ${max}',
},
};

const AddGame = () =>{
    const [user,] = useContext(UserContext)
    const [input, setInput] = useState({name:'', genre:'',singlePlayer:'',multiplayer:0,platform:'',release:'', image_url:''})

    const handleSubmit = (event)=>{
        event.preventDefault()
        console.log(input.name)
        console.log(input.singlePlayer)
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`,{name: input.name, genre: input.genre, singlePlayer: input.singlePlayer, multiplayer: input.multiplayer, platform: input.platform, release: input.release, image_url: input.image_url}, {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
            alert("success")
        }).catch((err)=>{
            alert(JSON.stringify(err.response.data))
        })
    }

    const handleChange = (event) =>{
        let name = event.target.name
        let value = event.target.value
        switch(name){
            case 'name':{
                setInput({...input, name:value})
                break;
            }
            case 'genre':{
                setInput({...input, genre:value})
                break;
            }
            case 'singlePlayer':{
                setInput({...input, singlePlayer:value})
                break;
            }
            case 'multiplayer':{
                setInput({...input, multiplayer:value})
                break;
            }
            case 'platform':{
                setInput({...input, platform:value})
                break;
            }
            case 'release':{
                setInput({...input, release:value})
                break;
            }
            case 'image_url':{
                setInput({...input, image_url:value})
                break;
            }
            default:{break;}
        }
    }

    return(
        <>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    
                    <Title level={2} style={{textAlign:'center'}}>Add Game</Title>
                    <div className="edit-game">
                        <Image className="detail-image"
                            height={400}
                            width={240}
                            src="https://images.unsplash.com/photo-1587099062441-95c27d50cd96?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                        />

                        <div className="edit-detail-game">
                            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                                    <Input onChange={handleChange} name='name' value={input.name}/>
                                </Form.Item>
                                <Form.Item name={['user', 'release']} label="Release" rules={[{required: true}]}>
                                    <Input onChange={handleChange} name='release' value={input.release}/>
                                </Form.Item>
                                <Form.Item name={['user', 'platform']} label="Platform" rules={[{ required: true }]}>
                                    <Input onChange={handleChange} name='platform' value={input.platform}/>
                                </Form.Item>
                                <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
                                    <Input onChange={handleChange} name='genre' value={input.genre}/>
                                </Form.Item>
                                <Form.Item name="singlePlayer" label="SinglePlayer" rules={[{required: true, min:0, max:1}]}>
                                    <Input onChange={handleChange} name='singlePlayer' value={input.singlePlayer}/>
                                </Form.Item>
                                <Form.Item name="multiPlayer" label="MultiPlayer" rules={[{required: true, min:0, max:1}]}>
                                    <Input onChange={handleChange} name='multiplayer' value={input.multiplayer}/>
                                </Form.Item>
                                {/* <Form.Item name="play-mode" label="Play Mode">
                                <Row>
                                    <Checkbox onChange={handleChange} name='' value='1' style={{ lineHeight: '32px' }}>
                                        Singleplayer
                                    </Checkbox>
                                    <Checkbox onChange={handleChange} name='multiplayer' value='1' style={{ lineHeight: '32px' }}>
                                        Multiplayer
                                    </Checkbox>
                                </Row>
                                </Form.Item> */}
                                <Form.Item name={['user', 'image']} label="Image-Url" rules={[{ required: true }]}>
                                    <Input onChange={handleChange} name='image-url' value={input.image_url}/>
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button onClick={handleSubmit} type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default AddGame