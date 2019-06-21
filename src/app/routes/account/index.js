import React from 'react';
import {Icon, Table, Layout, Row, Card, Descriptions, Upload, Button, Col, message, Select} from 'antd';
const { Content } = Layout;
import './account.css';
import {connect} from "react-redux";
import PageHeader from "ant-design-pro/lib/PageHeader";
import {BankAccountAPI, ExcelProcessorAPI} from "../../service";
import { ColorEntity } from '../../entity';

const DescriptionsItem = Descriptions.Item;
const Option = Select.Option;

class Account extends React.Component {
    constructor(pros) {
        super(pros);
        this.state = {workBankAccountRecords: [], id: 0, year: 2019, quater: 1};
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
                dataIndex: 'reason',
                key: 'reason'
            }, {
                title: '의뢰인/수취인',
                dataIndex: 'recipient',
                key: 'recipient'
            }, {
                title: '출금액(원)',
                dataIndex: 'forwardingAmount',
                key: 'forwardingAmount'
            }, {
                title: '입금액(원)',
                dataIndex: 'receivedAmount',
                key: 'receivedAmount'
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
                dataIndex: 'processingPoint',
                key: 'processingPoint'
            }, {
                title: '구분',
                dataIndex: 'sortation',
                key: 'sortation'
            }
        ];
        const ref = this;
        this.uploadProps = {
            name: 'file',
            action: ' http://localhost:8080/api/v1/excel-processor?tenantCode=bettercode&appCode=connect&excelType=account&userId=li.dongxun',
            headers: {
                authorization: 'authorization-text',
            },
            data: (file) => {
                return { excelFile: file };
            },
            showUploadList: false,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    ref.loadAccountData(info['file']['response'].split("/")[6]);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
    };

    loadAccountData = (id) => {
        ExcelProcessorAPI.getWorkBankAccountRecords(id)
            .then(workBankAccountRecords=>  this.setState({workBankAccountRecords: workBankAccountRecords}));
    };

    getYearFromAccount = (account) => _.uniq(account['bettercodeConnectAccountRecords'].map(record => record['transactionTime'].split(" ")[0].split(".")[0]))[0];

    render() {
        const { workBankAccountRecords } = this.state;

        return (
            <Content>
                <PageHeader title={<p><Icon type="code-o"/>분기별 거래이력 입력</p>}/>
                <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                    <Row type="flex" justify="end">
                        <Col span={2}>
                            <Upload {...this.uploadProps}>
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </Col>
                        <Col>
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
                                onClick={() => BankAccountAPI.createBankAccountRecords(
                                    workBankAccountRecords['accountNo'],
                                    this.state.year,
                                    this.state.quater,
                                    workBankAccountRecords['bettercodeConnectAccountRecords'])
                                }>
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Descriptions title="계좌정보">
                            <DescriptionsItem label={'계좌번호'}>{workBankAccountRecords['accountNo'] ? workBankAccountRecords['accountNo'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'최초대출일'}>{workBankAccountRecords['firstLoanDate'] ? workBankAccountRecords['firstLoanDate'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'총잔액'}>{workBankAccountRecords['totalBalance'] ? workBankAccountRecords['totalBalance'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출만기일'}>{workBankAccountRecords['loanMaturityDate'] ? workBankAccountRecords['loanMaturityDate'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'계좌명'}>{workBankAccountRecords['accountName'] ? workBankAccountRecords['accountName'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출한도'}>{workBankAccountRecords['loanLimit'] ? workBankAccountRecords['loanLimit'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'출금가능액'}>{workBankAccountRecords['allowanceAmount'] ? workBankAccountRecords['allowanceAmount'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출이율'}>{workBankAccountRecords['loanInterestRate'] ? workBankAccountRecords['loanInterestRate'].split(":")[1] : ''}</DescriptionsItem>
                        </Descriptions>
                        <Descriptions title="기간에 따른 변경값">
                            <DescriptionsItem label={'출금합계'}>{workBankAccountRecords['widthdrawalSum'] ? workBankAccountRecords['widthdrawalSum'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'입금합계'}>{workBankAccountRecords['depositSum'] ? workBankAccountRecords['depositSum'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'조회기간'}>{workBankAccountRecords['checkPeriod'] ? workBankAccountRecords['checkPeriod'].split(":")[1] : ''}</DescriptionsItem>
                        </Descriptions>
                    </Row>
                    <Row>
                        <Table columns={this.columns}
                               dataSource={workBankAccountRecords['bettercodeConnectAccountRecords']
                                   ? workBankAccountRecords['bettercodeConnectAccountRecords'].map((record, index) => {return {...record, key: index}}) : []}
                               pagination={false}
                               style={{ "marginTop":"30px" }}
                               bordered/>
                    </Row>
                </Card>
            </Content>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
    })
};
export default connect(mapStateToProps, {
})(Account);