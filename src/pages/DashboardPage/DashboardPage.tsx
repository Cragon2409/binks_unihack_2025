import { 
  Flex, 
  Breadcrumb
} from 'antd';

import { Dashboard } from '../../components/Dashboard';

export default function DashboardPage() {
  return (
    <Flex
      style={{
        padding: 24
      }} 
      vertical
      gap='large'
    >
      <Breadcrumb
        items={[
          {
            title: 'Dashboard',
          }
        ]}
      />
      <Dashboard />
    </Flex>
  );
}