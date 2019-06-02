import React from 'react';
import {Route} from 'react-router-dom';

import {Layout, Menu} from 'antd';
import {BettercodeConnectHeader, BettercodeConnectFooter} from './LayoutItem';
import Account from 'routes/account'

const {Sider, Content} = Layout;

export default class connectLayout extends React.Component {
    constructor(props) {
        super(props);
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
                                defaultOpenKeys={['account']}
                                defaultSelectedKeys={[window.location.hash.split('#')[1].split('/')[1]]}
                                style={{ height: '100%' }}
                                onClick={(item, key, keyPath) => window.location.href = "#/" + item.key}
                            >
                                <Menu.Item key={'app/account'}>
                                    {'Account'}
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Route path="/app/account" component={Account}/>
                        </Content>
                    </Layout>
                </Content>
                <BettercodeConnectFooter/>
            </Layout>)
        )
    }
}