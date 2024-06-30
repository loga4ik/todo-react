import React, { createContext, useState, ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}
// export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextWrapper: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
