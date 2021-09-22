import React from 'react'
import {Switch,BrowserRouter,Route,Link} from 'react-router-dom'

import {Layout,Typography,Space} from 'antd'
import Navbar from './components/Navbar'
import './App.css'
import HomePage from './components/HomePage'
import Exchanges from './components/Exchanges'
import Cryptocurrencies from './components/Cryptocurrencies'
import Cryptodetails from './components/Cryptodetails'
import News from './components/News'


const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar/>
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Switch>
                            <Route exact path='/' component={HomePage}/>
                            <Route exact path='/exchanges'>
                                <Exchanges/>
                            </Route>
                            <Route exact path='/cryptocurrencies' component={Cryptocurrencies}/>
                            <Route exact path='/crypto/:coinId' component={Cryptodetails}/>
                            <Route exact path='/news' component={News}/>
                        </Switch>
                    </div>
                </Layout>
                <div className='footer'>
                    <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                        Cryptoverse <br/>
                        All Rights reserved 
                    </Typography.Title>
                    <Space>
                        <Link to='/'>Home</Link>
                        <Link to='/exchanges'>Exchanges</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App
