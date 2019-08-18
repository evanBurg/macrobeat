import { createMuiTheme } from '@material-ui/core/styles';
export default createMuiTheme({
 typography: {
 useNextVariants: true
 },
 "palette": {
    "common": { "black": "#000", "white": "#fff" },
    "background": { "paper": "#fff", "default": "#fafafa" },
    "primary": {
      "light": "rgba(220, 237, 255, 1)",
      "main": "rgba(148, 176, 218, 1)",
      "dark": "rgba(143, 145, 162, 1)",
      "contrastText": "#fff"
    },
    "secondary": {
      "light": "rgba(105, 181, 120, 1)",
      "main": "rgba(58, 125, 68, 1)",
      "dark": "rgba(37, 77, 50, 1)",
      "contrastText": "#fff"
    },
    "error": {
      "light": "rgba(248, 90, 62, 1)",
      "main": "rgba(230, 59, 46, 1)",
      "dark": "rgba(255, 119, 51, 1)",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    }
  }
});
