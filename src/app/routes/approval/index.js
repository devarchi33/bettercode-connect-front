import React from 'react';
import {Card, Icon, Layout} from 'antd';
import PageHeader from "ant-design-pro/lib/PageHeader";
import {ColorEntity} from "../../entity";

const { Content } = Layout;

export default class Approval extends React.Component {
    render() {
        return (
            <Content>
                <PageHeader title={<p><Icon type="form"/> 휴가결제 신청</p>}/>
                <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                </Card>
            </Content>
        );
    }
}