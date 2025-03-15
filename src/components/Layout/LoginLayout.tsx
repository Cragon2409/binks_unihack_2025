import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import * as Constants from '../../common/Constants';

const { Content } = Layout;

const layoutStyle = {
  minHeight: "100vh"
};

const contentStyle: React.CSSProperties = {
  maxWidth: Constants.maxWidthLogin,
  width: "100%",
  textAlign: "left",
  alignItems: "center",
  margin: "10rem auto",
  padding: "12px"
};

export default function AppLayout() {
  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        <Outlet/>
      </Content>
    </Layout>
  );
}