import React from 'react';

export default class RootPathRedirect extends React.Component {
    componentDidMount() {
        window.location.href = "#/app/account/upload"
    }
    render() {
        return <div></div>;
    };
}