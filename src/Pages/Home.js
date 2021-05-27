import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { Layout, Carousel, Card, Space, Rate, Typography, Divider} from 'antd';
import './Pages.css'

const { Title, Text } = Typography;
const { Content } = Layout;
const { Meta } = Card;

const contentStyle = {
    height: '100%',
    maxHeight: '400px',
    width: '100%',
    color: '#fff',
    lineHeight: '320px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: "cover",
};


export const Home = () => {

    const [movies, setMovies] = useState(null)
    const [games, setGames] = useState(null)

    useEffect(() => {
        if(movies === null){
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res =>{
                setMovies(res.data.map(el=>{return{
                    id: el.id,
                    title: el.title,
                    description: el.description,
                    year: el.year,
                    duration: el.duration,
                    genre: el.genre,
                    rating: el.rating,
                    review: el.review,
                    image_url: el.image_url
                }
            }))
            })
        }
    }, [movies])

    useEffect(() => {
        if(games === null){
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res =>{
                setGames(res.data.map(el=>{return{
                    id: el.id,
                    name: el.name,
                    genre: el.genre,
                    singlePlayer: el.singlePlayer,
                    multiplayer: el.duration,
                    platform: el.platform,
                    release: el.release,
                    image_url: el.image_url
                }
            }))
            })
        }
    }, [games])

    return (
        <>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            
            <div className="carousel-container">
                <Carousel autoplay>
                    <div>
                        <img style={contentStyle} src="https://images.unsplash.com/photo-1580191947416-62d35a55e71d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"></img>
                    </div>
                    <div>
                        <img style={contentStyle} src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"></img>
                    </div>
                </Carousel>
            </div>

            <div className="latest-movie">
                <Title level={2}>Latest Movie</Title>
                    <div className="item-home-movie">
                        <Space direction="horizontal">
                        { movies !== null && movies.map((item)=>{
                            return(
                                <Link to={`/movies/${item.id}`}>
                                <Card bordered
                                    hoverable
                                    style={{ width: 240, margin:8, borderRadius:8}}
                                    cover={<img alt="example" maxHeight={'120px'} src={`${item.image_url}`} />}
                                >
                                    <Meta title={`${item.title}`} description={`${item.year}`} />
                                    <div className="additional">
                                        <Rate disabled defaultValue={`${item.rating/2}`}/>
                                        <b>({item.rating})</b>
                                    </div>
                                </Card>
                                </Link>
                            )
                        })}
                        </Space>
                    </div>
            </div>

            <Divider dashed />

            <div className="latest-game">
                <Title level={2}>Latest Game</Title>
                <div className="item-home-game">
                <Space direction="horizontal">
                { games !== null && games.map((item)=>{
                    return(
                        <Link to={`/games/${item.id}`}>
                        <Card bordered
                            hoverable
                            style={{ width: 240, margin:8, borderRadius:8}}
                            cover={<img alt="example" src={`${item.image_url}`} />}
                            >
                            <Meta title={`${item.name}`} description={`${item.platform}`} />
                            <div className="additional">
                                <Text>{item.release}</Text>
                            </div>
                        </Card>
                        </Link>
                    )
                })}
                </Space>
                </div>
            </div>
            </div>
        </Content>
        </>
    )
}
export default Home
