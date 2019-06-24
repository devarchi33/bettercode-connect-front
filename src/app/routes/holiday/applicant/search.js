import React from 'react';
import {Table, Input, Button, Row, Layout, Form} from 'antd';

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
            dataIndex: 'appover',
            key: 'approver'
        }, {
            title: '승인여부',
            dataIndex: 'isApprove',
            key: 'isApprove'
        }];
        this.state = { id: -1 }
    }

    render() {
        const SearchForm = <Form layout={'inline'}>
            <FormItem
                label={'휴가신청 번호: '}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}>
                <Input onChange={(e) =>  this.setState({id: e.target.value})}/>
            </FormItem>
            <FormItem>
                <Button type='primary' onClick={() => console.log("SEARCH_ID: ", this.state.id)}>
                    검색
                </Button>
            </FormItem>
        </Form>;
        return (
            <Content>
                <Row type={'flex'} justify={'end'}>
                    {SearchForm}
                </Row>
                <Row style={{marginTop: 10}}>
                    <Table
                        columns={this.columns}
                        dataSource={[]}/>
                </Row>
            </Content>
        );
    }
}