import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../Context/UserContext";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Layout, Typography, Space, Select} from 'antd';
import { Input} from 'antd';
import './Pages.css'
import { Table } from 'antd';


const { Content } = Layout;

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

const ListGame = () =>{
    const [user, setUser] = useContext(UserContext)
    const [games, setGames] = useState(null)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                {
                    text: 'Green',
                    value: 'Green',
                },
                {
                    text: 'Black',
                    value: 'Black',
                },
                ],
            },
            ],
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.genre - b.genre,
        },
        {
            title: 'Singleplayer',
            dataIndex: 'singlePlayer',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.singlePlayer - b.singlePlayer,
        },
        {
            title: 'Multiplayer',
            dataIndex: 'multiplayer',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.multiplayer - b.multiplayer,
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.platform - b.platform,
        },
        {
            title: 'Release',
            dataIndex: 'release',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.release - b.release,
        },
        {
            title: 'Action',
            dataIndex : 'id',
            key : 'id',
            sorter: true,
            render: (params) => (
            <Space size="middle">
                <a onClick={(e) =>handleDelete(params,e)}>Delete</a>
                <Link to={`/games/edit/${params}`}><a>Edit</a></Link>
            </Space>
            ),
        },
    ];

    useEffect(() => {
        if(games === null){
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res =>{
                setGames(res.data.map(el=>{return{
                    id: el.id,
                    name: el.name,
                    genre: el.genre,
                    singlePlayer: el.singlePlayer === 1 ? 'Yes' : 'No',
                    multiplayer: el.multiplayer === 1 ? 'Yes' : 'No',
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

    const handleDelete = (params,e) =>{
        e.preventDefault()
        let idGame = params
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`,{headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(()=>{
            let newGames = games.filter(el=>{return el.id != idGame})
            setGames(newGames)
        })
    }

    return(
        <>
            {games !== null && (
            
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>

                <Table columns={columns} dataSource={games} onChange={onChange} />

                </div>
            </Content>
            )}
        </>
    )
}
export default ListGame