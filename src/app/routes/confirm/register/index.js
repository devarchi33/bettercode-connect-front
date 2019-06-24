import React from 'react';
import {Card, Icon, Layout} from 'antd/lib/index';
import PageHeader from "ant-design-pro/lib/PageHeader/index";
import {ColorEntity} from "../../../entity";
import HolidayRegisterForm from "./HolidayRegisterForm";

const { Content } = Layout;

export default class Register extends React.Component {
    render() {
        return (
            <Content>
                <PageHeader title={<p><Icon type="form"/> 휴가결제 신청</p>}/>
                <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                    <HolidayRegisterForm/>
                </Card>
            </Content>
        );
    }
}