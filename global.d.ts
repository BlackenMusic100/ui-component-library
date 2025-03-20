export {}

declare global {
    interface Window {
        UIComponentLibrary: {
            Button: any,
            SearchBox: any,
            DateRangePicker: any,
            ThemeProvider: any,
            useTheme: any,
            lightTheme: any,
            darkTheme: any,
        }
    }
}