import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';

import koKR from 'antd/lib/locale-provider/ko_KR';
import 'moment/locale/zh-cn';
import store from './store/configureStore';

import {ConnectLayout, RootPathRedirect} from 'routes/layoutPage';

ReactDOM.render((
    <LocaleProvider locale={koKR}>
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
