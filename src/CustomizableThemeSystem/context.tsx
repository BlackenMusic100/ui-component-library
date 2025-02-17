import { Theme } from './type';
import { lightTheme, darkTheme } from './theme';

// Theme context
import React, { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

interface ThemeContextType {
    theme: Theme,
    setTheme: (theme: Theme) => void,
    toggleTheme: () => void,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{
    initialTheme?: Theme;
    children: React.ReactNode;
}> = ({ initialTheme = lightTheme, children }) => {
    const [theme, setThemeState] = useState<Theme>(initialTheme);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState(current =>
            current.name === 'light' ? darkTheme : lightTheme
        )
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme
export const useTheme = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return themeContext;
};