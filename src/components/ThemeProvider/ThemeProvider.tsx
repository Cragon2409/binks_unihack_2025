import React, { useState } from 'react';
import { ConfigProvider, FloatButton } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import * as Constants from '../../common/Constants'

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ 
    children 
  }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  return (
    <ConfigProvider theme={isDark ? Constants.darkTheme : Constants.lightTheme}>
      {children}
      <FloatButton 
        icon={isDark ? <SunOutlined/> : <MoonOutlined/>}
        type="primary"
        onClick={() => {
          setIsDark(() => !isDark)
        }}
      />
    </ConfigProvider>
  );
}