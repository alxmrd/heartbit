import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FooterPage from "./containers/FooterPage.js";
import { CssBaseline } from "@material-ui/core";
import history from "./history";

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
  <Router history={history}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <App />
      <FooterPage />
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
