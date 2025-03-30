import { Outlet } from 'react-router-dom';

import { 
  Layout,
} from 'antd';

import HeaderContent from './HeaderContent';
import FooterContent from './FooterContent';
import VerticalNavigationBar from '../VerticalNavigationBar/VerticalNavigationBar';


export default function AppLayout() {

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 780) {
  //       setAppLayoutState('mobile');
  //     } 
  //     else if (window.innerWidth <= 2000) {
  //       setAppLayoutState('compact');
  //     }
  //     else {
  //       setAppLayoutState('full');
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize(); 

  //   return () => window.removeEventListener('resize', handleResize);
  // });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderContent />
      <Layout>
        <VerticalNavigationBar />
        <Layout style={{ marginLeft: 75, padding: 0 }}>
          <Outlet />
        </Layout>        
      </Layout>
      <FooterContent />
    </Layout>
  );
}