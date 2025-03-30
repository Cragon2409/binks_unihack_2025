import { Outlet } from 'react-router-dom';

import { 
  Layout,
} from 'antd';

import HeaderContent from './HeaderContent';
import FooterContent from './FooterContent';
import VerticalNavigationBar from '../VerticalNavigationBar/VerticalNavigationBar';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderContent />
      <Layout>
        <VerticalNavigationBar />
        <Content style={{ marginLeft: 75, padding: 0 }}>
          <Outlet />
        </Content>        
      </Layout>
      <FooterContent />
    </Layout>
  );
}