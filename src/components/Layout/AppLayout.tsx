import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { 
  Layout,
} from 'antd';

import HeaderContent from './HeaderContent';
import FooterContent from './FooterContent';
import VerticalNavigationBar from '../VerticalNavigationBar/VerticalNavigationBar';

const { Content } = Layout;

export default function AppLayout() {
  const [ isMobile, setIsMobile ] = useState<boolean>(false);
  const [ isMobileVerticalNavOpen, setIsMobileVerticalNavOpen ] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setIsMobile(true);
      } 
      else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderContent 
        isMobile={isMobile} 
        setIsMobileVerticalNavOpen={setIsMobileVerticalNavOpen} 
      />
      <Layout>
         <VerticalNavigationBar 
          isMobile={isMobile} 
          isMobileVerticalNavOpen={isMobileVerticalNavOpen} 
          setIsMobileVerticalNavOpen={setIsMobileVerticalNavOpen}
        />
        <Content style={{ marginLeft: isMobile ? 0 : 75, padding: 0 }}>
          <Outlet />
        </Content>        
      </Layout>
      <FooterContent isMobile={isMobile} />
    </Layout>
  );
}