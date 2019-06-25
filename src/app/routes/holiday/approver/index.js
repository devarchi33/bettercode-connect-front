import React from 'react';
import {Button, Form, Input, Row, Table, Card, Layout, Icon, Col, message} from "antd";

import PageHeader from "ant-design-pro/lib/PageHeader/index";
import {ColorEntity} from "../../../entity";
import {ApprovalHolidayAPI} from "../../../service";

const { Content } = Layout;
const FormItem = Form.Item;

export default class Approval extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '신청번호',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '신청인',
            dataIndex: 'applicant',
            key: 'applicant'
        }, {
            title: '승인자',
            dataIndex: 'approver',
            key: 'approver'
        }, {
            title: '승인여부',
            dataIndex: 'approve',
            key: 'approve',
            render: (val, record) => val ?
                <span>{'승인'}</span> :
                <Col>
                    <Button type={'primary'} onClick={() => this.approve(record)}>
                        승인
                    </Button>
                </Col>
        }];
        this.state = { id: -1, dataSource: [] }
    }

    approve = (record) => {
        ApprovalHolidayAPI.
        approveHoliday(record['id'], true, record['approver'])
            .then(result => {
                if(result['status'] >= 400) {
                    message.error(`휴가 승인 실패: ${JSON.stringify(result['errors'])}`, );
                } else {
                    message.success(`휴가신청 번호: ${result} 승인완료.`)
                    this.onSubmit();
                }
            });
    };

    onSubmit = () => {
        const { id } = this.state;
        ApprovalHolidayAPI
            .findApprovalHoliday(id)
            .then(response => {
                this.setState({dataSource: [response].map((data,index) => {
                        return {...data, key: index};
                    })});
            });
    };

    render() {
        const { dataSource } = this.state;
        const SearchForm = (
            <Form layout={'inline'}>
                <FormItem
                    label={'휴가신청 번호: '}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}>
                    <Input onChange={(e) =>  this.setState({id: e.target.value})}/>
                </FormItem>
                <FormItem>
                    <Button type='primary' onClick={this.onSubmit}>
                        검색
                    </Button>
                </FormItem>
            </Form>
        );

        return (
            <Content>
                <PageHeader title={<p><Icon type="book"/> 휴가결제 승인</p>}/>
                <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                    <Row type={'flex'} justify={'end'}>
                        {SearchForm}
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <Table
                            rowKey={dataSource['id']}
                            columns={this.columns}
                            dataSource={dataSource}/>
                    </Row>
                </Card>
            </Content>
        );
    }
}