import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { SwaggerHell } from "./feature/SwaggerHell";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <SwaggerHell />
        </ThemeProvider>
    )
}