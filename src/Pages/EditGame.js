import React, {useContext,useEffect, useState} from 'react';
import { UserContext } from "../Context/UserContext";
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { Layout, Typography, Image, Select,  } from 'antd';
import { Form, Input, Button } from 'antd';
import './Pages.css'

const { Title} = Typography;
const { Content } = Layout;

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
    const [game, setGame] = useState(null)
    const [user,] = useContext(UserContext)
    const [input, setInput] = useState(null)
    const {id} = useParams()

    useEffect(() =>{
        if(id !== null){
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(res =>{
                let dataGame = res.data
                setGame(res.data)
                setInput({name: dataGame.name , genre: dataGame.genre ,singlePlayer: dataGame.singlePlayer, multiplayer: dataGame.multiplayer, platform: dataGame.platform, release: dataGame.release, image_url: dataGame.image_url})
            })
        }
    }, id)

    const handleSubmit = (event)=>{
        event.preventDefault()
        console.log(input.name)
        console.log(input.singlePlayer)
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`,{name: input.name, genre: input.genre, singlePlayer: parseInt(input.singlePlayer), multiplayer: parseInt(input.multiplayer), platform: input.platform, release: input.release, image_url: input.image_url}, {headers: {"Authorization" : `Bearer ${user.token}`}})
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
            { game !== null &&(
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    
                    <Title level={2} style={{textAlign:'center'}}>Add Game</Title>
                    {input !== null &&(
                    <div className="edit-game">
                        <Image className="detail-image"
                            height={400}
                            width={240}
                            src={`${input.image_url}`}
                        />

                        <div className="edit-detail-game">
                            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                                    <Input defaultValue={input.name} onChange={handleChange} name='name' value={input.name}/>
                                </Form.Item>
                                <Form.Item name={['user', 'release']} label="Release" rules={[{required: true}]}>
                                    <Input defaultValue={input.release} onChange={handleChange} name='release' value={input.release}/>
                                </Form.Item>
                                <Form.Item name={['user', 'platform']} label="Platform" rules={[{ required: true }]}>
                                    <Input defaultValue={input.platform} onChange={handleChange} name='platform' value={input.platform}/>
                                </Form.Item>
                                <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
                                    <Input defaultValue={input.genre} onChange={handleChange} name='genre' value={input.genre}/>
                                </Form.Item>
                                <Form.Item name="singlePlayer" label="SinglePlayer" rules={[{required: true, min:0, max:1}]}>
                                    <Input defaultValue={input.singlePlayer} onChange={handleChange} name='singlePlayer' value={input.singlePlayer}/>
                                </Form.Item>
                                <Form.Item name="multiPlayer" label="MultiPlayer" rules={[{required: true, min:0, max:1}]}>
                                    <Input defaultValue={input.multiplayer} onChange={handleChange} name='multiplayer' value={input.multiplayer}/>
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
                                    <Input defaultValue={input.image_url} onChange={handleChange} name='image-url' value={input.image_url}/>
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button onClick={handleSubmit} type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    )}
                </div>
            </Content>
            )}
        </>
    )
}

export default AddGame