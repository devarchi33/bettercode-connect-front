import React from 'react';
import {Route} from 'react-router-dom';

import {Layout, Menu} from 'antd';
import {BettercodeConnectHeader, BettercodeConnectFooter} from './LayoutItem';
import {
    UploadBankAccountRecord,
    SearchBankAccountRecord,
    ApplicantTabs,
    ApproverTabs
} from '../index';

const {Sider, Content} = Layout;
const {ItemGroup} = Menu;

export default class connectLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { current: 'app/account/upload' };
    };

    render() {
        return (
            (<Layout>
                <BettercodeConnectHeader backgroundColor={'#404040'}/>
                <Content style={{ padding: '0 50px',  paddingTop: '30px'}} >
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200}>
                            <Menu
                                mode="inline"
                                style={{ height: '100%' }}
                                onClick={(item, key, keyPath) => {
                                    this.setState(
                                        {current: item.key},
                                        () => window.location.href = "#/" + item.key)
                                }}
                                selectedKeys={[this.state.current]}
                            >
                                <Menu.ItemGroup key="g1" title="은행 거래이력">
                                    <Menu.Item key={'app/account/upload'} >
                                        {'분기별 거래이력 등록'}
                                    </Menu.Item>
                                    <Menu.Item key={'app/account/search'}>
                                        {'분기별 거래이력 조회'}
                                    </Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="g2" title="휴가결제">
                                    <Menu.Item key={'app/holiday/applicant'}>
                                        {'상신자'}
                                    </Menu.Item>
                                    <Menu.Item key={'app/holiday/approver'}>
                                        {'결제자'}
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Route path="/app/account/upload" component={UploadBankAccountRecord}/>
                            <Route path="/app/account/search" component={SearchBankAccountRecord}/>
                            <Route path="/app/holiday/applicant" component={ApplicantTabs}/>
                            <Route path="/app/holiday/approver" component={ApproverTabs}/>
                        </Content>
                    </Layout>
                </Content>
                <BettercodeConnectFooter/>
            </Layout>)
        )
    }
}