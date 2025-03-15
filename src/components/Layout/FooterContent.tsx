import { 
  Flex, 
  Typography, 
  Button, 
  Divider 
} from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import * as Constants from '../../common/Constants';

import { useAppSelector } from '../../API/hooks';

import { supabase } from '../../supabase';

const { Text } = Typography;

export default function FooterContent() {
    const session = useAppSelector(( state : any ) => state.session.session)

  return (
    <Flex 
      style={{
        maxWidth: Constants.maxWidth,
        width: "100%",
        margin: "0 auto",
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
        <Text>
          {session ? `Logged in as ${(session as any).user.email}` : ""}
        </Text>
        <button onClick={() => supabase.auth.signOut()} style={{borderRadius : "4px", backgroundColor : "#3232A5", padding: "5px", color : "white"}}>Sign Out</button>
      </Flex>
    </Flex>
  );
}