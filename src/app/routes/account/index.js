import React from 'react';
import { Icon, Table, Layout, Row } from 'antd';
const { Content } = Layout;
import './account.css';
import {connect} from "react-redux";
import PageHeader from "ant-design-pro/lib/PageHeader";

class Account extends React.Component {
    constructor(pros) {
        super(pros);
    };

    componentDidMount(){
    }

    render() {
        return (
            <Content>
                <Row>
                    <PageHeader title={<p><Icon type="code-o"/>Connect Account</p>}/>
                </Row>
                <Row>
                    <Table columns={[]}
                           dataSource={[]}
                           rowKey={record=> record[0]}
                           pagination={false}
                           style={{ "marginTop":"30px" }}
                           bordered/>
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