import { Theme } from "./type";

// Default light theme
export const lightTheme: Theme = {
    name: 'light',
    colors: {
        primary: {
            light: '#4dabf5',
            main: '#2196f3',
            silver: '#c5c9d0',
            dark: '#1769aa',
            black: '#000000',
            contrast: '#ffffff',
        },
        secondary: {
            light: '#7c4dff',
            main: '#651fff',
            dark: '#4615b2',
            contrast: '#ffffff',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
            elevated: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',
            disabled: '#999999',
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrast: '#ffffff',
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrast: '#ffffff',
        },
        warning: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrast: '#000000',
        },
    },
    sizing: {
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
            custom: (factor: number) => `${10 * factor}px`
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '1rem',
            xl: '2rem',
            full: '9999px',
        },
        breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    },
    typography: {
        fontFamily: {
            primary: "'Inter', sans-serif",
            secondary: "'Roboto', sans-serif",
            mono: "'Roboto Mono', monospace",
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
        },
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            bold: 700,
        },
        lineHeight: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75',
        },
    },
    shadows: {
        sm: '0 1px 3px rgba(0,0,0,0.12)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
        xl: '0 20px 25px rgba(0,0,0,0.1)',
    },
    animation: {
        duration: {
            fastest: '150ms',
            faster: '200ms',
            fast: '250ms',
            normal: '300ms',
            slow: '500ms',
        },
        easing: {
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },
    sxConfig: {
        height: (factor: number) => `${0.25 * factor}rem`,
        width: (factor: number) => `${0.25 * factor}rem`,
        margin: (factor: number) => `${0.25 * factor}rem`,
        marginTop: (factor: number) => `${0.25 * factor}rem`,
        marginBottom: (factor: number) => `${0.25 * factor}rem`,
        marginLeft: (factor: number) => `${0.25 * factor}rem`,
        marginRight: (factor: number) => `${0.25 * factor}rem`,
        padding: (factor: number) => `${0.25 * factor}rem`,
        paddingTop: (factor: number) => `${0.25 * factor}rem`,
        paddingBottom: (factor: number) => `${0.25 * factor}rem`,
        paddingLeft: (factor: number) => `${0.25 * factor}rem`,
        paddingRight: (factor: number) => `${0.25 * factor}rem`,
    },
};

// Dark theme variation
export const darkTheme: Theme = {
    ...lightTheme,
    name: 'dark',
    colors: {
        ...lightTheme.colors!,
        background: {
            default: '#121212',
            paper: '#1e1e1e',
            elevated: '#242424',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
            disabled: '#666666',
        },
    },
};

export const customTheme: Theme = {
    ...lightTheme,
    name: 'custom',
    colors: {
        ...lightTheme.colors!,
        primary: {
            light: '#d69f9f',
            main: '#9e5a5a',
            silver: '#c5c9d0',
            dark: '#d14f4f',
            black: '#000000',
            contrast: '#ffffff',
        },
        secondary: {
            light: '#7c4dff',
            main: '#651fff',
            dark: '#4615b2',
            contrast: '#ffffff',
        },
        background: {
            default: '#6e4545',
            paper: '#ba8484',
            elevated: '#ba8484',
        },
        text: {
            primary: '#f58c8c',
            secondary: '#c95555',
            disabled: '#666666',
        },
    },
};