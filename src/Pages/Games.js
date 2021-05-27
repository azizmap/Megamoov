import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Layout, Card, Typography, Input} from 'antd';
import './Pages.css'

const { Title , Text} = Typography;
const { Content } = Layout;
const { Meta } = Card;
const { Search } = Input;

const onSearch = value => console.log(value);


export const Games = () => {
    const [games, setGames] = useState(null)

    useEffect(() => {
        if(games === null){
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res =>{
                setGames(res.data.map(el=>{return{
                    id: el.id,
                    name: el.name,
                    genre: el.genre,
                    singlePlayer: el.singlePlayer,
                    multiplayer: el.multiplayer,
                    platform: el.platform,
                    release: el.release,
                    image_url: el.image_url
                }
            }))
            })
        }
    }, [games])

    const onSearch = (value) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        .then(res=>{
            let resGames = res.data.map(el=>{return{
                id: el.id,
                name: el.name,
                genre: el.genre,
                singlePlayer: el.singlePlayer,
                multiplayer: el.multiplayer,
                platform: el.platform,
                release: el.release,
                image_url: el.image_url
            }})
            let filteredGames = resGames.filter(x=> x.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            setGames([...filteredGames])
    })}

    return (
        <>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>

            <div className="search-bar">
                <Search onChange placeholder="input game name" size="large" onSearch={onSearch} enterButton/>
            </div>

            <div className="games">
                
                <Title>Games</Title>
                <div className="item-game">
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
                </div>
            </div>

            </div>
        </Content>
        </>
    )
}
export default Games