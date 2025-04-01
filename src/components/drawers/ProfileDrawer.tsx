import React from 'react'

import {
  Drawer,
  Flex,
  Space,
  Button,
  Typography
} from 'antd';

import {
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';

const { Text } = Typography;

import { useTheme } from '../ThemeProvider/ThemeProvider';
import { useAppSelector } from '../../API/hooks';
import { supabase } from '../../API/supabase';

interface ProfileDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDrawer = ({ isOpen, setIsOpen } : ProfileDrawerProps) => {
  const session = useAppSelector(( state : any ) => state.session.session);
  const { isDark, toggleTheme } = useTheme();

  return (
    <Drawer
      title='Profile'
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Flex vertical gap='large'>
        <Text>
          {`You are logged in with ${(session as any).user.email}`}
        </Text>
        <Space.Compact 
          block
        >
          <Button 
            style={{
              width: '100%'
            }}
            type={isDark ? 'default' : 'primary'}
            icon={<SunOutlined />} 
            onClick={toggleTheme}
          >
            Light
          </Button>
          <Button 
            style={{
              width: '100%'
            }}
            type={isDark ? 'primary' : 'default'}
            icon={<MoonOutlined />}
            onClick={(toggleTheme)}
          >
            Dark
          </Button>
        </Space.Compact>
        <Button 
          danger
          onClick={() => supabase.auth.signOut()}>
          Logout
        </Button>
      </Flex>
    </Drawer>
  )
}

export default ProfileDrawer