import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import store from './store/configureStore';

import {ConnectLayout, RootPathRedirect} from 'routes/layoutPage';

ReactDOM.render((
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={RootPathRedirect}/>
                    <Route path="/app" component={ConnectLayout}/>
                </Switch>
            </HashRouter>
        </Provider>
    </LocaleProvider>
), document.getElementById('root'));
