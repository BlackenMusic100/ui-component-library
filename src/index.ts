import Button from './components/Button';
import SearchBox from './components/SearchBox';
import DateRangePicker from './components/DateRangePicker';
import { ThemeProvider, useTheme } from './CustomizableThemeSystem/context';
import { lightTheme, darkTheme } from './CustomizableThemeSystem/theme';

export { Button, SearchBox, DateRangePicker, ThemeProvider, useTheme, lightTheme, darkTheme };

// Attach to global `window` for UMD support
if (typeof window !== 'undefined') {
    window.UIComponentLibrary = {
      Button,
      SearchBox,
      DateRangePicker,
      ThemeProvider,
      useTheme,
      lightTheme,
      darkTheme
    };
  }

// export { default as Button } from './components/Button'
// // export {default as Tabular} from './components/Tabular'
// export {default as SearchBox} from './components/SearchBox'
// export {default as DateRangePicker} from './components/DateRangePicker'

// export { ThemeProvider, useTheme } from './CustomizableThemeSystem/context'
// export type { Theme } from './CustomizableThemeSystem/type'
// export { lightTheme, darkTheme } from './CustomizableThemeSystem/theme'