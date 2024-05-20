import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// Tema personalizado con colores específicos
export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#262254' // Color principal
    },
    secondary: {
      main: '#543884' // Color secundario
    },
    error: {
      main: red.A400 // Color para errores
    }
  }
});
