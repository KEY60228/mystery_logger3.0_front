import { createMuiTheme } from '@material-ui/core/styles'

// Material UIのテーマ上書き
export const theme = createMuiTheme({
    palette: {
        common: {
            black: '#0A0A0A',
            white: '#FEFEFE',
        },
        primary: {
            main: '#FFAC00',
            contrastText: '#0A0A0A',
        },
        secondary: {
            light: '#COCOCO',
            main: '#0A0A0A',
            contrastText: '#FEFEFE',
        },
    }
});
