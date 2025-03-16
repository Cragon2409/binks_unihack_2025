import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Button,
  Input,
  Typography,
  message
} from 'antd';

import { LoginProps } from '../../common/Types';

const { Title } = Typography;

export default function PasswordReset({ supabase }: LoginProps) {
  const [password, setPassword] = useState('');
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    setPasswordResetLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      showError(error.message);
    } else {
      showSuccess('Password reset');
      navigate('/login'); 
    }
  }

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
      <Title>Reset your password</Title>
      <Flex vertical gap="large">
        <Input.Password
          placeholder="New password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => handlePasswordReset}
          loading={passwordResetLoading}
        >
          Reset
        </Button>
      </Flex>
    
      {contextHolder}
    </Flex>
  );
};