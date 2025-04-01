import { useState } from 'react';

import {
  Flex,
  Button,
  Input,
  Typography,
  Divider,
  Modal,
  message
} from 'antd';

import { GithubOutlined, DiscordOutlined } from '@ant-design/icons';

import { LoginProps } from '../../common/Types';

const { Title, Link } = Typography;

export default function LoginPage({ supabase }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Email sign in 
  const handleEmailSignIn = async () => {
    setSignInLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSignInLoading(false);
    
    if (error) {
      showError(error.message);
    } 
  };

  // Email sign up
  const handleEmailSignUp = async () => {
    setSignUpLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setSignUpLoading(false);

    if (error) {
      showError(error.message);
    } 
    else {
      showSuccess('Confirmation email sent');
    }
  };

  // Email password reset
  const handleEmailPasswordReset = async () => {
    setPasswordResetLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    setPasswordResetLoading(false);

    if (error) {
      showError(error.message);
    }
    else {
      showSuccess('Password reset link sent to email address');
    }
  }

  // OAuth sign in (GitHub and Discord)
  const handleOAuthSignIn = async (provider: 'github' | 'discord') => {
    setSocialLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    setSocialLoading(false);

    if (error) {
      showError(error.message);
    }
  };

  const showError = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message
    })
  }

  const showSuccess = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message
    })
  }

  return (
    <Flex vertical gap="small">
      <Title>Unitrack</Title>
      <Flex vertical gap="large">
        <Button
          onClick={() => handleOAuthSignIn('discord')}
          icon={<DiscordOutlined />}
          loading={socialLoading}
        >
          Sign in with Discord
        </Button>
        <Button
          onClick={() => handleOAuthSignIn('github')}
          icon={<GithubOutlined />}
          loading={socialLoading}
        >
          Sign in with Github
        </Button>
      </Flex>
      
      <Divider />

      <Flex vertical gap="large">
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          placeholder="Password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Flex gap="large">
          <Button
            style={{width: "100%"}}
            type="primary"
            onClick={() => handleEmailSignIn()}
            loading={signInLoading}
          >
            Sign in
          </Button>
          <Button
            style={{width: "100%"}}
            onClick={() => handleEmailSignUp()}
            loading={signUpLoading}
          >
            Sign up
          </Button>
        </Flex>
      </Flex>

      <Link 
          onClick={() => setIsModalOpen(true)}
        >
          Forgot your password?
        </Link>

      <Modal 
        title="Reset password" 
        open={isModalOpen} 
        onOk={handleEmailPasswordReset} 
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleEmailPasswordReset}
            loading={passwordResetLoading}
          >
            Reset password
          </Button>,
        ]}
      >
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>

      {contextHolder}
    </Flex>
  );
};