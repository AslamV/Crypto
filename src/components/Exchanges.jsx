import React from 'react'
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangesQuery } from '../services/api';
import Loader from './Loader';


const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;
    if (isFetching) return <Loader/>
    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangesList.map((exc) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel 
                            key={exc.id}
                            showArrow={false}
                            header={(
                                <Row key={exc.id}>
                                    <Col span={6}>
                                        <Text><strong>{exc.rank}.</strong></Text>
                                        <Avatar className="exchange-image" src={exc.iconUrl} />
                                        <Text><strong>{exc.name}</strong></Text>
                                    </Col>
                                    <Col span={6}>${millify(exc.volume)}</Col>
                                    <Col span={6}>{millify(exc.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(exc.marketShare)}%</Col>
                                </Row>
                            )}
                            >
                                {HTMLReactParser(exc.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges
