import React, { createContext, useState, ReactNode } from "react";

interface ThemeContextType {
  isLight: boolean;
  setIsLight: (value: boolean) => void;
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
  const [isLight, setIsLight] = useState<boolean>(true);

  const changeTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
