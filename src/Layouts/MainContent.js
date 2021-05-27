import React, {useContext} from "react"
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {UserContext} from '../Context/UserContext'
import { Layout } from 'antd';
import SideBar from './SideBar';
import Home from '../Pages/Home';
import Movies from '../Pages/Movies';
import Games from '../Pages/Games';
import DetailMovie from '../Pages/DetailMovie';
import DetailGame from '../Pages/DetailGame';
import Login from '../Pages/Login';
import Registration from '../Pages/Registration';
import ChangePassword from '../Pages/ChangePassword';
import EditMovie from '../Pages/EditMovie';
import EditGame from '../Pages/EditGame';
import ListGame from '../Pages/ListGame';
import ListMovie from '../Pages/ListMovie';
import AddMovie from '../Pages/AddMovie';
import AddGame from '../Pages/AddGame';

const {Content} = Layout;

const MainContent = () =>{
    const [user, setUser] = useContext(UserContext)
    
    const LoginRoute = ({user, ...props}) =>
    user ? <Redirect to='/'/> : <Route {...props}/>;

    const PrivateRoute = ({user,...props}) =>{
        if (user){
            return <Route{...props}/>
        } else{
            return <Redirect to='/login'/>
        }
    };

    return(
        <>
        <div className="content">
        <Layout>
            <Content>
                <Switch>
                    <Route exact path='/' user={user} component={Home}/>
                    <Route exact path='/movies' user={user} component={Movies}/>
                    <Route exact path='/games' user={user} component={Games}/>
                    <LoginRoute exact path='/login' user={user} component={Login}/>
                    <Route exact path='/movies/:id' user={user} component={DetailMovie}/>
                    <Route exact path='/games/:id' user={user} component={DetailGame}/>
                    <LoginRoute exact path='/registration' user={user} component={Registration}/>
                    <PrivateRoute exact path='/changepassword' user={user} component={ChangePassword}/>
                    <PrivateRoute exact path='/movies/edit/:id' user={user} component={EditMovie}/>
                    <PrivateRoute exact path='/games/edit/:id' user={user} component={EditGame}/>
                    <PrivateRoute exact path='/listmovies' user={user} component={ListMovie}/>
                    <PrivateRoute exact path='/listgames' user={user} component={ListGame}/>
                    <PrivateRoute exact path='/addmovie' user={user} component={AddMovie}/>
                    <PrivateRoute exact path='/addgame' user={user} component={AddGame}/>
                </Switch>
            </Content>
            { user && <SideBar />}
        </Layout>
        </div>
        </>
    )
}
export default MainContent