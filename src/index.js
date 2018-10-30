import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4e878c",
      light: "#38BB4B8",

      dark: "#003236",
      contrastText: "#F5FFFC"
    },
    secondary: {
      light: "#F5FFFC",
      main: "#f5deb3",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#4E878C"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Avenir Next, Roboto,"Helvetica Neue",Arial,sans-serif',
    htmlFontSize: 16
  }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
