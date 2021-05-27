import React from 'react';
import { Layout } from 'antd';
import {BrowserRouter as Router} from "react-router-dom"

import './Layouts.css'

import Nav from "./Nav"
import Bottom from "./Bottom"
import MainContent from "./MainContent"


const Main = () =>{
    return(
        <>
        <Router>
            <Layout>
                <Nav/>
                <MainContent />
                <Bottom/>
            </Layout>
        </Router>    
        </>
    )
}

export default Main