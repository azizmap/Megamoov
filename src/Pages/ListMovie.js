import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../Context/UserContext";
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Layout, Typography, Space, Select,} from 'antd';
import { Form, Input, InputNumber, Button } from 'antd';
import './Pages.css'
import { Table } from 'antd';

const { Title, Text } = Typography;
const { Content } = Layout;
const {Option} = Select;

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

const ListMovie = () =>{
    const [user, setUser] = useContext(UserContext)
    const [movies, setMovies] = useState(null)

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.duration - b.duration,
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            dataIndex : 'id',
            key : 'id',
            render: (params) => (
            <Space size="middle">
                <a onClick={(e) =>handleDelete(params,e)}>Delete</a>
                <Link to={`/movies/edit/${params}`}><a>Edit</a></Link>
            </Space>
            ),
        },
    ];

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

    const handleDelete = (params,e) =>{
        e.preventDefault()
        let idMovie = params
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`,{headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(()=>{
            let newMovies = movies.filter(el=>{return el.id != idMovie})
            setMovies(newMovies)
        })
    }


    return(
        <>
            {movies !== null &&(
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>

                <Table columns={columns} dataSource={movies} onChange={onChange} />

                </div>
            </Content>
            )}
        </>
    )
}
export default ListMovie