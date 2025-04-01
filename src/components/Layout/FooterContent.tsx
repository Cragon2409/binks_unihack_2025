import { 
  Layout,
  Flex, 
  Typography, 
  Button, 
  Divider 
} from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text } = Typography;

interface FooterContentProps {
  isMobile: boolean;
}

export default function FooterContent({ isMobile } : FooterContentProps) {
  return (
    <Footer
      style={{
        marginLeft: isMobile ?  0 : 75
      }}
    >
      <Flex 
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
    </Footer>
  );
}