import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { SwaggerHell } from "./feature/SwaggerHell";
import { useNodeStdout } from "./hooks/useNodeStdout";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export const App = () => {
    useNodeStdout();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <SwaggerHell />
        </ThemeProvider>
    )
}