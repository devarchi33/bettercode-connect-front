import React from 'react';

export default class RootPathRedirect extends React.Component {
    componentDidMount() {
        window.location.href = "#/app/account"
    }
    render() {
        return <div></div>;
    };
}