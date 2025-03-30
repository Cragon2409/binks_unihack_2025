import { useState } from 'react';

import { 
  Layout, 
  Flex,
  Typography, 
  Button,
  theme
} from 'antd';

import { UserOutlined } from '@ant-design/icons';

import ProfileDrawer from '../drawers/ProfileDrawer';

const { Header} = Layout;
const { Text } = Typography;

export default function HeaderContent() {
  const { token: { colorBgContainer, colorBorder } } = theme.useToken();
  
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

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
        <Flex gap='small' align='center'>
          <img src="favicon.ico" alt="Unitrack Logo" width={32} height={32} />
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