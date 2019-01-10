import { createMuiTheme } from '@material-ui/core';
// import styled from 'styled-components'
// import MenuIcon from '@material-ui/icons/Menu'
// import Hidden from '@material-ui/core/Hidden'
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search'

export const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
      },
    root: {
      flexGrow: 1,
    },
    palette: {
      primary: {
        light: 'rgb(229, 216, 255)',
        main: 'rgb(83, 110, 250)',
        dark: '#210067',
        contrastText: '#FFFFFF',
      },
      secondary: {
        light: 'rgb(255, 236, 139)',
        main: '#3ab5fb',
        dark: 'rgb(234, 188, 0)',
        contrastText: '#052D6C',
      },
      text: {
        primary: "#212121",
        secondary: "#616161",
        disabled: "#BDBDBD",
      },
      background: {
        default: '#210067'
      }
    },
    // secondary: '#fc0',
    // typography:{
    //   useNextVariants: true,
    //   fontFamily: `Noto Sans, "Helvetica", "Arial"`,
    //   headline:{
    //     fontFamily: "Noto Sans",
    //   },
    //   body1:{
    //     fontFamily: `Noto Sans, "Helvetica", "Arial"`
    //   },
    //   body2:{
    //     fontFamily: "Noto Sans"
    //   },
    //   h1: {
    //     fontFamily: "Noto Serif",
    //     fontSize: '4em'
    //   },
    //   h2: {
    //     fontFamily: "Noto Serif",
    //   },
    //   h3: {
    //     fontFamily: "Noto Serif",
    //   },
    //   h4: {
    //     fontFamily: "Noto Serif",
    //     fontSize: "1.84rem",
    //   },
    //   h5: {
    //     fontFamily: "Noto Serif",
    //   },
    //   h6: {
    //     fontFamily: "Noto Sans",
    //   },
    //   button: {
    //     fontWeight: 600,
    //   },
    // }
  });


//   const StyledButton = styled(Button)`
//   background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
//   border-radius: 3px;
//   border: 0;
//   color: ${theme.palette.secondary.main};
//   height: 48px;
//   padding: 0 30px;
//   box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
// `