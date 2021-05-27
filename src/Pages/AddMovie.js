import React, {useContext, useState} from 'react';
import { UserContext } from "../Context/UserContext";
import axios from 'axios';
import { Layout, Typography, Image, Select} from 'antd';
import { Form, Input, Button } from 'antd';
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



const AddMovie = () =>{
    const [user,] = useContext(UserContext)
    // const [movies, setMovies] = useState(null)
    const [input, setInput] = useState({title:'', description:'',year:'',duration:'',genre:'',rating:'',review:'',image_url:''})

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`,{title: input.title, description: input.description, year: parseInt(input.year) ,duration: parseInt(input.duration), genre: input.genre, rating: parseInt(input.rating), review: input.review, image_url: input.image_url}, {headers: {"Authorization" : `Bearer ${user.token}`}})
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
            case 'title':{
                setInput({...input, title:value})
                break;
            }
            case 'description':{
                setInput({...input, description:value})
                break;
            }
            case 'year':{
                setInput({...input, year:value})
                break;
            }
            case 'duration':{
                setInput({...input, duration:value})
                break;
            }
            case 'genre':{
                setInput({...input, genre:value})
                break;
            }
            case 'rating':{
                setInput({...input, rating:value})
                break;
            }
            case 'review':{
                setInput({...input, review:value})
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
                    
                    <Title level={2} style={{textAlign:'center'}}>Add Movie</Title>
                    <div className="edit-movie">
                        <Image className="detail-image"
                            height={400}
                            width={240}
                            src="https://images.unsplash.com/photo-1590856029847-4956f6a5fd92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
                        />

                        <div className="edit-detail-movie">
                            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                                <Form.Item name={['user', 'title']} label="Title" rules={[{ required: true }]}>
                                    <Input onChange={handleChange} name='title' value={input.title}/>
                                </Form.Item>
                                <Form.Item name={['user', 'description']} label="Description" rules={[{ required: true }]}>
                                    <Input.TextArea onChange={handleChange} name='description' value={input.description}/>
                                </Form.Item>
                                <Form.Item name={['user', 'year']} label="Year" rules={[{required: true}]}>
                                    <Input onChange={handleChange} name='year' value={input.year}/>
                                </Form.Item>
                                <Form.Item name={['user', 'duration']} label="Duration" rules={[{ required: true}]}>
                                    <Input onChange={handleChange} name='duration' value={input.duration}/>
                                </Form.Item>
                                <Form.Item name={['user', 'genre']} label="Genre" rules={[{required: true}]}>
                                    <Input onChange={handleChange} name='genre' value={input.genre}/>
                                </Form.Item>
                                <Form.Item name="rate" label="Rate" rules={[{required: true}]}>
                                    <Input onChange={handleChange} name='rating' value={input.rating}/>
                                </Form.Item>
                                <Form.Item name={['user', 'image']} label="Image-Url" rules={[{ required: true }]}>
                                    <Input onChange={handleChange} name='image_url' value={input.image_url}/>
                                </Form.Item>
                                <Form.Item name={['user', 'review']} label="Review" rules={[{ required: true }]}>
                                    <Input.TextArea onChange={handleChange} name='review' value={input.review}/>
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

export default AddMovie