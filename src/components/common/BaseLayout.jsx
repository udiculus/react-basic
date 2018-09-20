import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import '../../styles/init.scss';
import SiderMenu from './SiderMenu';
import NotFound from './NotFound';
import App from '../App';

const { Content } = Layout;

class BaseLayout extends Component {
  render() {
    return (
      <Layout
        id="cms"
      >
        <Layout style={{ minHeight: '100vh' }}>
          <SiderMenu />
          <Content>
            <Switch>
              <Route exact path="/" component={App} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BaseLayout;
