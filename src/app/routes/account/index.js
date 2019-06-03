import React from 'react';
import { Icon, Table, Layout, Row, Card, Descriptions } from 'antd';
const { Content } = Layout;
import './account.css';
import {connect} from "react-redux";
import PageHeader from "ant-design-pro/lib/PageHeader";
import { AccountAPI } from "../../service";
import { ColorEntity } from '../../entity';

const DescriptionsItem = Descriptions.Item;

class Account extends React.Component {
    constructor(pros) {
        super(pros);
        this.state = {account: []};
        this.columns = [{
            title: 'No',
            dataIndex: 'id',
            key: 'id'
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
        }]
    };

    componentDidMount(){
        this.loadAccountData();
    }

    loadAccountData = () => {
        AccountAPI.getAccountData(1)
            .then(account =>  this.setState({account: account}));
    };

    render() {
        const { account } = this.state;

        return (
            <Content>
                <Row>
                    <PageHeader title={<p><Icon type="code-o"/>Connect Account</p>}/>
                </Row>
                <Row>
                    <Card style={{borderTop: '3px solid ' + ColorEntity.mainColor}}>
                        <Descriptions title="Account Info">
                            <DescriptionsItem label={'계좌번호'}>{account['accountNo'] ? account['accountNo'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'최초대출일'}>{account['firstLoanDate'] ? account['firstLoanDate'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'총잔액'}>{account['totalBalance'] ? account['totalBalance'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출만기일'}>{account['loanMaturityDate'] ? account['loanMaturityDate'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'계좌명'}>{account['accountName'] ? account['accountName'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출한도'}>{account['loanLimit'] ? account['loanLimit'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'출금가능액'}>{account['allowanceAmount'] ? account['allowanceAmount'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'대출이율'}>{account['loanInterestRate'] ? account['loanInterestRate'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'출금합계'}>{account['widthdrawalSum'] ? account['widthdrawalSum'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'입금합계'}>{account['depositSum'] ? account['depositSum'].split(":")[1] : ''}</DescriptionsItem>
                            <DescriptionsItem label={'조회기간'}>{account['checkPeriod'] ? account['checkPeriod'].split(":")[1] : ''}</DescriptionsItem>
                        </Descriptions>
                        <Table columns={this.columns}
                               dataSource={account['bettercodeConnectAccountRecords']}
                               rowKey={record=> record[0]}
                               pagination={false}
                               style={{ "marginTop":"30px" }}
                               bordered/>
                    </Card>
                </Row>
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