import { useState } from 'react';
import { useNavigate } from 'react-router';

import { 
  Layout, 
  Flex,
  Typography, 
  Button,
  theme
} from 'antd';

import { UserOutlined, MenuOutlined } from '@ant-design/icons';

import ProfileDrawer from '../drawers/ProfileDrawer';

const { Header} = Layout;
const { Text } = Typography;

interface HeaderContentProps {
  isMobile: boolean;
  setIsMobileVerticalNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HeaderContent({ 
  isMobile, 
  setIsMobileVerticalNavOpen 
} : HeaderContentProps) {
  const { token: { colorBgContainer, colorBorder } } = theme.useToken();
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        height: 'fit-content',
        display: 'flex', 
        padding: '24px', 
        background: colorBgContainer, 
        borderBottom: `1px solid ${colorBorder}`,
      }} 
    >
      <Flex style={{ width: '100% '}}justify='space-between'>
        {
          isMobile && (
            <Button 
              type='text'
              icon={<MenuOutlined />} 
              onClick={() => setIsMobileVerticalNavOpen(prev => !prev)}
            />
          )
        }
        <Flex 
          style={{
            cursor: 'pointer'
          }}
          gap='small' 
          align='center' 
          onClick={() => navigate('/')}
        >
          <img src="/favicon.ico" alt="Unitrack Logo" width={32} height={32} />
          <Text 
            style={{ 
              fontSize: "20px", 
              lineHeight: "28px",
              whiteSpace: 'nowrap'
            }} 
            strong        
          >
            Unitrack
          </Text>
        </Flex>
        <Button 
          icon={<UserOutlined />} 
          onClick={() => setIsProfileDrawerOpen(true)}
        />
      </Flex>

      <ProfileDrawer isOpen={isProfileDrawerOpen} setIsOpen={setIsProfileDrawerOpen} />
    </Header>
  );
}