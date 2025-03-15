import { Flex, Typography, Menu } from 'antd';
import type { MenuProps } from 'antd';

import * as Constants from '../../common/Constants'

const { Link } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { 
    key: 1, 
    label: (
      <Link href="/courses" rel="noopener noreferrer">
        Courses
      </Link>
    ) 
  },
  { 
    key: 2, 
    label: (
      <Link href="/timetable" rel="noopener noreferrer">
        Timetable
      </Link>
    )
  }
];

export default function HeaderContent() {
  return (
    <Flex 
      style={{
        maxWidth: Constants.maxWidth,
        width: "100%",
        margin: "0 auto",
      }} 
      vertical={false} 
      align="center" 
      justify="space-between"
    >
      <Link style={{ fontSize: "20px", lineHeight: "28px" }} href="/" rel="noopener noreferrer" strong>
        Unitrack.
      </Link>
      <Menu
        mode="horizontal"
        items={items}
      />
    </Flex>
  );
}