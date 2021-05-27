import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Layout, Card, Rate, Typography, Input} from 'antd';
import './Pages.css'

const { Title } = Typography;
const { Content } = Layout;
const { Meta } = Card;
const { Search } = Input;

// const contentStyle = {
//     height: '100%',
//     maxHeight: '320px',
//     width: '100%',
//     color: '#fff',
//     lineHeight: '320px',
//     textAlign: 'center',
//     background: '#364d79',
//     objectFit: "cover",
// };




export const Movies = () => {
    
    const [movies, setMovies] = useState(null)
    
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

    const onSearch = (value) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then(res=>{
            let resMovie = res.data.map(el=>{return{
                id: el.id,
                title: el.title,
                description: el.description,
                year: el.year,
                duration: el.duration,
                genre: el.genre,
                rating: el.rating,
                review: el.review,
                image_url: el.image_url
            }})
            let filteredMovies = resMovie.filter(x=> x.title.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            setMovies([...filteredMovies])
    })}
    return (
        <>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: "24px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>

            <div className="search-bar">
                <Search placeholder="input movie name" size="large" onSearch={onSearch} enterButton/>
            </div>

            <div className="movies">
                <Title>Movies</Title>
                <div className="item-movie">
                { movies !== null && movies.map((item)=>{
                    return(
                        <Link to={`/movies/${item.id}`}>
                        <Card bordered
                            hoverable
                            style={{ width: 240, margin:8, borderRadius:8}}
                            cover={<img alt="example" src={`${item.image_url}`} />}
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
                </div>
            </div>

            </div>
        </Content>
        </>
    )
}
export default Movies