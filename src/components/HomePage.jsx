import React from 'react'
import millify from 'millify'
import { Typography,Row,Col,Statistic } from 'antd'
import { useGetCryptosQuery } from '../services/api'
import { Link } from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'
const {Title} = Typography

const HomePage = () => {
    const {data , isFetching} = useGetCryptosQuery(10)
    const globalStat = data?.data?.stats
    console.log(globalStat)
    if (isFetching) return <Loader/>
    return (
        <>
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStat?.total}/></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStat.totalExchanges)}/></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStat.totalMarketCap)}/></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStat.total24hVolume)}/></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(globalStat.totalMarkets)}/></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cruptocurrencies in the world</Title>
                <Title level={3} className="show-more"><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3} className="show-more"><Link to='/news'>Show More</Link></Title>
            </div>
            <News simplified/>
        </>
    )
}

export default HomePage
