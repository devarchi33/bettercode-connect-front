import React from 'react';
import { Tabs, Card, Icon, Layout } from 'antd/lib/index';
import PageHeader from "ant-design-pro/lib/PageHeader/index";
import {ColorEntity} from "../../../entity";
import HolidayRegisterForm from "./form";
import HolidayStatusSearch from './search'

const { Content } = Layout;
const { TabPane } = Tabs;

export default class Register extends React.Component {
    render() {
        return (
            <Content>
                <PageHeader title={<p><Icon type="form"/> 상신자 - 이동훈</p>}/>
                <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="휴가신청" key="1">
                            <HolidayRegisterForm/>
                        </TabPane>
                        <TabPane tab="휴가신청 조회" key="2">
                            <HolidayStatusSearch/>
                        </TabPane>
                    </Tabs>
                </Card>
            </Content>
        );
    }
}