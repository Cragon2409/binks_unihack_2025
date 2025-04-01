import { 
  createContext, 
  useContext, 
  useState 
} from 'react';

import { ConfigProvider } from 'antd';

import * as Constants from '../../common/Constants'

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {}
});

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ 
    children 
  }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ConfigProvider theme={isDark ? Constants.darkTheme : Constants.lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
}