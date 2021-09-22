import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { useGetCryptoDeatilsQuery, useGetCryptoHistoryQuery } from '../services/api';
import Linechart from './Linechart';
import Loader from './Loader';

const {Title,Text} = Typography
const {Option} = Select
const Cryptodetails = () => {
    const [timeperiod, settimePeriod] = useState('7d')
    console.log(timeperiod)
    const {coinId} = useParams()
    const {data,isFetching} = useGetCryptoDeatilsQuery(coinId)
    const {data: coinHistory} = useGetCryptoHistoryQuery({coinId,timeperiod})
    console.log(coinHistory)
    const cryptoDetails = data?.data?.coin

    if (isFetching) return <Loader/>
    // console.log(cryptoDetails)
    // console.log(data)
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name}({cryptoDetails.slug}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in US dollars.
                    View value statistics,market cap and supply
                </p>
            </Col>
            <Select defaultValue='7d' className='select-timeperiod'
            placeholder='Select the Time peroid'
            onChange={(value) => settimePeriod(value)}
            >
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            <Linechart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title className='coin-details-heading' level={3}>
                            {cryptoDetails.name} value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of {cryptoDetails.name}
                        </p>
                    </Col>
                    {
                        stats.map(({icon,title,value}) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))
                    }
                </Col>
                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title className='coin-details-heading' level={3}>
                            Othervalue Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all coins
                        </p>
                    </Col>
                    {
                        genericStats.map(({icon,title,value}) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))
                    }
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name}
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-link'>
                        {cryptoDetails.name} Link
                    </Title>
                    {
                        cryptoDetails.links.map((link) => (
                            <Row className='coin-link' key={link.name}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a href={link.url} target="_blank" rel="noreferrer">
                                    {link.name}
                                </a>
                            </Row>
                        ))
                    }
                </Col>
            </Col>
        </Col>
    )
}

export default Cryptodetails