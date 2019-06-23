import React from 'react';
import {Card, Icon, Layout} from 'antd/lib/index';
import PageHeader from "ant-design-pro/lib/PageHeader/index";
import {ColorEntity} from "../../../entity";

const { Content } = Layout;

export default class Approval extends React.Component {
    render() {
        return (
            <Content>
                <PageHeader title={<p><Icon type="book"/> 휴가결제 승인</p>}/>
                <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                </Card>
            </Content>
        );
    }
}