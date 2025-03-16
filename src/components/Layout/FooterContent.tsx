import { 
  Flex, 
  Typography, 
  Button, 
  Divider 
} from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import * as Constants from '../../common/Constants';

const { Text } = Typography;

export default function FooterContent() {
  return (
    <Flex 
      style={{
        maxWidth: Constants.maxWidth,
        width: "100%",
        margin: "0 auto",
        padding: "12px"
      }} 
      vertical
    >
      <Flex justify="space-between" align="center">
        <Text>
          Made with ❤ by the Binks Disciples
        </Text>
        <Button 
          href="https://github.com/Cragon2409/binks_unihack_2025"
          target="_blank"
          type="text"
          icon={
            <GithubOutlined 
              style={{
                fontSize: "24px"
              }}
            />
          }
        />
      </Flex>
      
      <Divider/>
      <Flex justify="space-between">
        <Text>
          Unitrack © {new Date().getFullYear()}
        </Text>
      </Flex>
    </Flex>
  );
}