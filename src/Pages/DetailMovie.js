import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { Layout, Rate, Typography, Image, Comment, Avatar} from 'antd';
import {ClockCircleOutlined, MessageOutlined} from '@ant-design/icons';
import './Pages.css'

const { Title, Text } = Typography;
const { Content } = Layout;

const itemStyle = {
    margin: '10px 0 0',
    padding: '0'
};

const DetailMovie = () =>{

    const [movie, setMovie] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if(id !== null){
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            .then(res =>{
                setMovie(res.data)
            })
        }
    }, [id])

    return(
        <>
            { movie !== null &&
            (<Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    
                    <Title level={2}>Detail Movie</Title>
                    <div className="detail-movie">
                        <Image className="detail-image"
                            height={480}
                            width={320}
                            src={`${movie.image_url}`}
                        />

                        <div className="item-detail-movie">
                            <Title level={3}><b>Title : </b>{movie.title}</Title>
                            <Title style={itemStyle} level={4}>({movie.year})</Title>
                            <Title style={itemStyle} level={5}><b>{movie.genre}</b> Action</Title>
                            <div className="additional">
                                <Title style={itemStyle} level={5}><span><ClockCircleOutlined style={{marginTop:'5px', paddingRight:'5px'}}/></span> {movie.duration} minutes</Title>
                            </div>
                            <div className="additional">
                                <Rate disabled defaultValue={`${movie.rating/2}`}/>
                                <b style={{alignSelf:'center', marginTop:'5px', marginLeft:"5px"}}>({movie.rating})</b>
                            </div>
                            <Title style={itemStyle, {marginTop:'24px'}} level={5}><b>Description</b></Title>
                            <Text style={{maxWidth:'800px'}}>{movie.description}</Text>
                        </div>
                    </div>

                    <div className="comment">
                        <Title style={itemStyle, {marginTop:'32px'}} level={5}><b>Reviews</b></Title>
                        <Comment
                            author={<a>someone</a>}
                            avatar={
                                <Avatar
                                ><MessageOutlined /></Avatar>
                            }
                            content={
                                <p>
                                {movie.review}
                                </p>
                            }
                            />
                    </div>
                </div>
            </Content>)}
        </>
    )
}

export default DetailMovie