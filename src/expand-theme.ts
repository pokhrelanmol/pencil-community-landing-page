import { createTheme } from "@mui/material";
import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
    interface PaletteOptions {
        customColor: PaletteColorOptions;
    }
}
export const theme = createTheme({
    palette: {
        customColor: {
            main: "#0D0D10",
            light: "#F7F7F7",
        },
    },
    typography: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
    },
});
