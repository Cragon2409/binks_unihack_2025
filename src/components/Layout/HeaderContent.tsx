import { useState, useEffect } from 'react';
import { 
  Flex, 
  Typography, 
  Menu, 
  Button,
  Modal
} from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { supabase } from '../../API/supabase';

import { useAppSelector } from '../../API/hooks';
import * as Constants from '../../common/Constants'


const { Text, Link } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 1, 
    label: (
      <Link href="/" rel="noopener noreferrer">
        Dashboard
      </Link>
    )
  },
  { 
    key: 2, 
    label: (
      <Link href="/courses" rel="noopener noreferrer">
        Courses
      </Link>
    ) 
  },
  { 
    key: 3, 
    label: (
      <Link href="/timetable" rel="noopener noreferrer">
        Timetable
      </Link>
    )
  }
];

export default function HeaderContent() {
  const session = useAppSelector(( state : any ) => state.session.session)
  const [selectedKey, setSelectedKey] = useState<number>(
    Number(localStorage.getItem('selectedKey')) || 1
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('selectedKey', selectedKey.toString())
  }, [selectedKey]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex 
      style={{
        maxWidth: Constants.maxWidth,
        width: "100%",
        margin: "0 auto",
        padding: "12px"
      }} 
      vertical={false} 
      align="center" 
      justify="space-between"
    >
      <Link 
        style={{ 
          fontSize: "20px", 
          lineHeight: "28px",
          whiteSpace: 'nowrap'
        }} 
        href="/" 
        rel="noopener noreferrer" 
        onClick={() => setSelectedKey(1)}
        strong
        
      >
        Unitrack.
      </Link>
      <Flex 
        style={{
          width: "400px"
        }}
        gap="small" 
        justify='flex-end' 
        align='center'
      >
        <Menu
          style={{
            width: "70%"
          }}
          mode="horizontal"
          items={items}
          selectedKeys={[selectedKey.toString()]}
          onClick={(e) => setSelectedKey(Number(e.key))}
          disabledOverflow={false}
        />
        <Button 
          icon={<UserOutlined />} 
          onClick={showModal}
        />
      </Flex>
      <Modal 
        title="Profile" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => supabase.auth.signOut()}>
            Logout
          </Button>,
        ]}
      >
        <Text>
          {session ? `You are logged in with ${(session as any).user.email}` : ""}
        </Text>
      </Modal>
    </Flex>
  );
}