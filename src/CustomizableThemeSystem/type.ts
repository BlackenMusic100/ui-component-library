export interface Typography {
    fontFamily: {
        primary: string,
        secondary: string,
        mono: string,
    },
    fontSize: {
        xs: string,
        sm: string,
        md: string,
        lg: string,
        xl: string,
        '2xl': string,
    },
    fontWeight: {
        light: number,
        regular: number,
        medium: number,
        bold: number
    },
    lineHeight: {
        tight: string,
        normal: string,
        relaxed: string,
    }
}

export interface Shadows {
    sm: string,
    md: string,
    lg: string,
    xl: string,
}

export interface Animation {
    duration: {
        fastest: string,
        faster: string,
        fast: string,
        normal: string,
        slow: string,
    };
    easing: {
        easeIn: string,
        easeOut: string,
        easeInOut: string,
    };
}

export interface ThemeColors {
    primary: {
        light: string;
        main: string;
        silver: string;
        dark: string;
        black: string;
        contrast: string;
    };
    secondary: {
        light: string;
        main: string;
        dark: string;
        contrast: string;
    };
    background: {
        default: string;
        paper: string;
        elevated: string;
    };
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
    error: {
        light: string;
        main: string;
        dark: string;
        contrast: string;
    };
    success: {
        light: string;
        main: string;
        dark: string;
        contrast: string;
    };
    warning: {
        light: string;
        main: string;
        dark: string;
        contrast: string;
    };
}

export interface ThemeSizing {
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        custom: object;
    };
    borderRadius: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    breakpoints: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}

export interface SxConfig {
    height: object;
    width: object;
    padding: object;
    paddingTop: object;
    paddingBottom: object;
    paddingLeft: object;
    paddingRight: object;
    margin: object;
    marginTop: object;
    marginBottom: object;
    marginLeft: object;
    marginRight: object;
}

export interface Theme {
    name?: string,
    colors?: ThemeColors,
    sizing?: ThemeSizing,
    typography?: Typography,
    shadows?: Shadows,
    animation?: Animation,
    sxConfig?: SxConfig,
    // Add more theme properties if needed
}
