import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderContent from './HeaderContent';
import FooterContent from './FooterContent';
import * as Constants from '../../common/Constants';

const { Header, Content, Footer } = Layout;

const layoutStyle = {
  minHeight: "100vh"
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  position: "sticky",
  top: 0,
  zIndex: 1,
  alignItems: "center",
  padding: "12px"
};

const contentStyle: React.CSSProperties = {
  maxWidth: Constants.maxWidth,
  width: "100%",
  textAlign: "left",
  margin: "0 auto",
  padding: "12px"
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "12px"
};

export default function AppLayout() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <HeaderContent/>
      </Header>
      <Content style={contentStyle}>
        <Outlet/>
      </Content>
      <Footer style={footerStyle}>
        <FooterContent/>
      </Footer>
    </Layout>
  );
}