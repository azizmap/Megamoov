import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { Layout, Rate, Typography, Image, Comment, Avatar} from 'antd';
import {TeamOutlined, UserOutlined} from '@ant-design/icons';
import './Pages.css'

const { Title } = Typography;
const { Content } = Layout;

const itemStyle = {
    margin: '10px 0 0',
    padding: '0'
};

const DetailGame = () =>{

    const [game, setGame] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if(id !== null){
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(res =>{
                setGame(res.data)
            })
        }
    }, [id])

    return(
        <>
            { game !== null &&(
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    
                    <Title level={2}>Detail Game</Title>
                    <div className="detail-game">
                        <Image className="detail-image"
                            height={480}
                            width={320}
                            src={`${game.image_url}`}
                        />

                        <div className="item-detail-game">
                            <Title level={3}>{game.name}</Title>
                            <Title style={itemStyle} level={4}>({game.release})</Title>
                            <Title style={itemStyle} level={5}><b>Genre : </b>{game.genre}</Title>
                            { game.singlePlayer === 1 && <div className="additional">
                                <Title style={itemStyle} level={5}><span><UserOutlined  style={{marginTop:'5px', paddingRight:'5px'}}/></span> Single Player</Title>
                            </div>}
                            { game.multiplayer === 1 && <div className="additional">
                                <Title style={itemStyle} level={5}><span><TeamOutlined  style={{marginTop:'5px', paddingRight:'5px'}}/></span> Multi Player</Title>
                            </div>}
                            <Title style={itemStyle} level={5}><b>Platform : </b> PC, PS4, Switch</Title>
                        </div>
                    </div>
                </div>
            </Content>
            )}
        </>
    )
}

export default DetailGame