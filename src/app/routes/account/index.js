import React from 'react';
import {Icon, Table, Layout, Row, Card, Descriptions, Upload, Button, Col, message } from 'antd';
const { Content } = Layout;
import './account.css';
import {connect} from "react-redux";
import PageHeader from "ant-design-pro/lib/PageHeader";
import {BankAccountAPI, ExcelProcessorAPI} from "../../service";
import { ColorEntity } from '../../entity';

const DescriptionsItem = Descriptions.Item;

class Account extends React.Component {
    constructor(pros) {
        super(pros);
        this.state = {account: [], id: 0};
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
        ExcelProcessorAPI.getAccountData(id)
            .then(account =>  this.setState({account: account}));
    };

    render() {
        const { account } = this.state;

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
                        <Col span={2}>
                            <Button type={'primary'} onClick={() => BankAccountAPI.createBankAccountRecords(account['bettercodeConnectAccountRecords'])}>Save</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Descriptions title="계좌정보">
                            <DescriptionsItem label={'계좌번호'}>{account['accountNo'] ? account['accountNo'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'최초대출일'}>{account['firstLoanDate'] ? account['firstLoanDate'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'총잔액'}>{account['totalBalance'] ? account['totalBalance'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출만기일'}>{account['loanMaturityDate'] ? account['loanMaturityDate'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'계좌명'}>{account['accountName'] ? account['accountName'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출한도'}>{account['loanLimit'] ? account['loanLimit'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'출금가능액'}>{account['allowanceAmount'] ? account['allowanceAmount'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출이율'}>{account['loanInterestRate'] ? account['loanInterestRate'].split(":")[1] : ''}</DescriptionsItem>
                        </Descriptions>
                        <Descriptions title="기간에 따른 변경값">
                            <DescriptionsItem label={'출금합계'}>{account['widthdrawalSum'] ? account['widthdrawalSum'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'입금합계'}>{account['depositSum'] ? account['depositSum'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'조회기간'}>{account['checkPeriod'] ? account['checkPeriod'].split(":")[1] : ''}</DescriptionsItem>
                        </Descriptions>
                    </Row>
                    <Row>
                        <Table columns={this.columns}
                               dataSource={account['bettercodeConnectAccountRecords'] ? account['bettercodeConnectAccountRecords'].map((record, index) => {return {...record, key: index}}) : []}
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