import { Typography,Select,Row,Col,Avatar,Card } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNews'
import { useGetCryptosQuery } from '../services/api'
import Loader from './Loader'
const {Text,Title} = Typography
const {Option} = Select
const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
const News = ({simplified}) => {
    const [newsCat, setnewsCat] = useState('Ethereum')
    const {data:cryptoNews} = useGetCryptoNewsQuery({newsCat, count: simplified ? 6 : 12})
    const { data} = useGetCryptosQuery(100)
    if (!cryptoNews?.value) return <Loader/>
    return (
        <Row gutter={[24,24]}>
            {
                !simplified && (
                    <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        optionFilterProp="childr"
                        placeholder="Select a crypto"
                        onChange={(value) => setnewsCat(value)}
                        filterOption={(input,option) => option.childr.toLowerCase().indexOf(input.toLowerCase()) > 0 }
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {
                            data?.data?.coins.map((coin) => 
                                <Option value={coin.name}>{coin.name}</Option>
                            )
                        }
                    </Select>
                    </Col>
                )
            }
            {
                cryptoNews.value.map((news,i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target=" blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className='news-title' level={4}>
                                        {news.name}
                                    </Title>
                                    <img style={{maxHeight:'100px',maxWidth:"200px"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                </div>
                                <p>
                                    {
                                        news.description > 100 ? `${news.description.substring(0,100)}...` : news.description
                                    }
                                </p>
                                <div className="provider-container">
                                    <div className="">
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="">
                                        </Avatar>
                                        <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>
                                            {moment(news.datePublished).startOf('ss').fromNow()}
                                    </Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

export default News
