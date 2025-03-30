import React from 'react'

import {
  Drawer,
  Flex,
  Button,
  Typography
} from 'antd';

const { Text } = Typography;

import { useAppSelector } from '../../API/hooks';
import { supabase } from '../../API/supabase';

interface ProfileDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDrawer = ({ isOpen, setIsOpen } : ProfileDrawerProps) => {
  const session = useAppSelector(( state : any ) => state.session.session)

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
        <Button 
          key="submit" 
          danger
          onClick={() => supabase.auth.signOut()}>
          Logout
        </Button>
      </Flex>
    </Drawer>
  )
}

export default ProfileDrawer