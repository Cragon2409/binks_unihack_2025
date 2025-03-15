import { useState } from 'react';

import {
  Flex,
  Button,
  Input,
  Typography,
  Divider,
  message
} from 'antd';

import { GithubOutlined, DiscordOutlined } from '@ant-design/icons';

import { LoginProps } from '../../common/Types';

const { Link } = Typography;

export default function Login({ supabase }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Email sign in 
  const handleEmailSignIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      showError(error.message);
    } 
  };

  // Email sign up
  const handleEmailSignUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      showError(error.message);
    } 
  };

  // Email password reset
  const handleEmailPasswordReset = async () => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    setLoading(false);
    if (error) {
      showError(error.message);
    }
    else {
      showPasswordReset();
    }
  }

  // OAuth sign in (GitHub and Discord)
  const handleOAuthSignIn = async (provider: 'github' | 'discord') => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    setLoading(false);
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

  const showPasswordReset = () => {
    messageApi.open({
      type: 'success',
      content: 'Password reset link sent to email address'
    })
  }

  return (
    <Flex vertical gap="smanonell">
      <Flex vertical gap="large">
        <Button
          onClick={() => handleOAuthSignIn('discord')}
          icon={<DiscordOutlined />}
        >
          Sign in with Discord
        </Button>
        <Button
          onClick={() => handleOAuthSignIn('github')}
          icon={<GithubOutlined />}
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
        <Button
          type="primary"
          onClick={() => handleEmailSignIn()}
          loading={loading}
        >
          Sign In
        </Button>
      </Flex>

      
      <Flex vertical gap="small">
        <Link 
          onClick={handleEmailPasswordReset}
          disabled={loading}
        >
          Forgot your password?
        </Link>
        <Link 
          onClick={handleEmailSignUp}
          disabled={loading}
        >
          Don't have an account? Sign up
        </Link>
      </Flex>

      {contextHolder}
    </Flex>
  );
};