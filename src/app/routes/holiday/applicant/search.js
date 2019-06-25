import React from 'react';
import {Table, Input, Button, Row, Layout, Form} from 'antd';
import {ApprovalHolidayAPI} from "../../../service";

const { Content } = Layout;
const FormItem = Form.Item;

export default class ApplicantSearch extends React.Component {
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
            render: (val) => <span>{val ? '승인' : '미승인'}</span>
        }];
        this.state = { id: -1, dataSource: [] }
    }

    onSubmit = (e) => {
        e.preventDefault();
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
                <Row type={'flex'} justify={'end'}>
                    {SearchForm}
                </Row>
                <Row style={{marginTop: 10}}>
                    <Table
                        rowKey={dataSource['id']}
                        columns={this.columns}
                        dataSource={dataSource}/>
                </Row>
            </Content>
        );
    }
}