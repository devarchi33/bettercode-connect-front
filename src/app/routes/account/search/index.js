import React from 'react';
import {Row, Col, Layout, Card, Icon, Select, Button, Input, Descriptions, Table} from "antd";
import {ColorEntity} from "../../../entity";
import PageHeader from "ant-design-pro/lib/PageHeader";
import {BankAccountAPI} from "../../../service";

const { Content } = Layout;
const Option = Select.Option;
const DescriptionsItem = Descriptions.Item;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accountNo: '', year: 2019, quater: 1, bankAccountRecord: [] };
        this.columns = [
            {
                title: 'No',
                dataIndex: 'id',
                key: 'no'
            }, {
                title: '거래일시',
                dataIndex: 'transactionTime',
                key: 'transactionTime'
            }, {
                title: '적요',
                dataIndex: 'briefs',
                key: 'briefs'
            }, {
                title: '의뢰인/수취인',
                dataIndex: 'payee',
                key: 'payee'
            }, {
                title: '출금액(원)',
                dataIndex: 'withdrawAmount',
                key: 'withdrawAmount'
            }, {
                title: '입금액(원)',
                dataIndex: 'depositAmount',
                key: 'depositAmount'
            }, {
                title: '잔액(원)',
                dataIndex: 'balance',
                key: 'balance'
            }, {
                title: '출금계좌메모',
                dataIndex: 'memo',
                key: 'memo'
            }, {
                title: '처리점',
                dataIndex: 'transactionPoint',
                key: 'processingPoint'
            }, {
                title: '구분',
                dataIndex: 'sortation',
                key: 'sortation'
            }
        ];
    }

    loadBackAccountRecords = () => {
        const { accountNo, year, quater } = this.state;
        return BankAccountAPI
            .searchBankAccountRecords(accountNo, year, quater)
            .then(bankAccountRecord => this.setState({bankAccountRecord: bankAccountRecord}));
    };

    render() {
        const { bankAccountRecord } = this.state;
        const createdBankAccountQuaterRecords = bankAccountRecord['createdBankAccountQuaterRecords'];
        const createdBankAccountRecords = createdBankAccountQuaterRecords ? createdBankAccountQuaterRecords['createdBankAccountRecords'] : [];

        return (
            <Content>
                <PageHeader title={<p><Icon type="search"/>분기별 거래이력 조회</p>}/>
                <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                    <Row type="flex" justify="end">
                        <Input style={{width: 180, marginRight: 10}} placeholder={'accountNo'} type={'text'} onChange={(e) => this.setState({accountNo: e['target']['value']})}/>
                        <Select style={{width: 120, marginRight: 10}} onChange={(value) => this.setState({year: value})}>
                            <Option value={2019}>2019</Option>
                            <Option value={2018}>2018</Option>
                            <Option value={2017}>2017</Option>
                        </Select>
                        <Select style={{width: 120, marginRight: 10}} onChange={(value) => this.setState({quater: value})}>
                            <Option value={1}>1Quater</Option>
                            <Option value={2}>2Quater</Option>
                            <Option value={3}>3Quater</Option>
                            <Option value={4}>4Quater</Option>
                        </Select>
                        <Button
                            type={'primary'}
                            onClick={this.loadBackAccountRecords}>
                            Search
                        </Button>
                    </Row>
                    <Row>
                        <Descriptions title="계좌정보">
                            <DescriptionsItem label={'계좌번호'}>{bankAccountRecord['accountNo']}</DescriptionsItem>
                            <DescriptionsItem label={'년도'}>{createdBankAccountQuaterRecords ? createdBankAccountQuaterRecords['year'] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'분기'}>{createdBankAccountQuaterRecords ? createdBankAccountQuaterRecords['quater'] : ''}</DescriptionsItem>
                        </Descriptions>
                        <Table columns={this.columns}
                               dataSource={createdBankAccountRecords
                                   ? createdBankAccountRecords.map((record, index) => {return {...record, key: index}}) : []}
                               pagination={false}
                               style={{ "marginTop":"30px" }}
                               bordered/>
                    </Row>
                </Card>
            </Content>
        )
    }
}