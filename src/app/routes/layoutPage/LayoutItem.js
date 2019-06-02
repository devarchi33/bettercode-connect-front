import React from 'react';
import PropTypes from "prop-types";

import {Layout} from 'antd/lib/index';

const {Header, Footer} = Layout;

class BettercodeConnectHeader extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const {backgroundColor} = this.props;
        const styles = {
            header: {
                padding: '120 120 120 120',
                background: backgroundColor,
                boxShadow: '0 1px 4px rgba(0, 21, 41, .08)',
                position: 'relative',
                color: '#ccc'
            }
        };
        return(
            <Header style={{... styles.header}}>
                <div>
                    Connect
                </div>
            </Header>
        );
    }
}

BettercodeConnectHeader.propTypes = {
    backgroundColor: PropTypes.string.isRequired
};

const BettercodeConnectFooter = () => (
    <Footer style={{ textAlign: 'center' }}>
        <b>Connect ©2019 Created by Bettercode</b>
    </Footer>
);

export {BettercodeConnectHeader, BettercodeConnectFooter};