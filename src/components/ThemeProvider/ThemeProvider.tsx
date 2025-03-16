import React, { useState, useEffect } from 'react';
import { ConfigProvider, FloatButton } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import * as Constants from '../../common/Constants'

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ 
    children 
  }: ThemeProviderProps) {
    const [isDark, setIsDark] = useState<boolean>(() => {
      const storedValue = localStorage.getItem('isDark');
      return storedValue !== null ? JSON.parse(storedValue) : true;
    });

  useEffect(() => {
    localStorage.setItem('isDark', isDark.toString());
  }, [isDark])


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