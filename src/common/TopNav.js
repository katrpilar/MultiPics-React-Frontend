import React, { Fragment, Component } from "react"
import ReactDOM from 'react-dom'
import { MuiThemeProvider, 
        createMuiTheme,
        Button, AppBar,
        Toolbar, Typography,
        Grid, Card, CardContent,
        CardActions, CardHeader,
        CardActionArea, CardMedia,
        IconButton, Input, InputBase,
        TextField, Grow, Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components'
// import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'

const theme = createMuiTheme({
    palette: {
      primary: {
        light: 'rgb(229, 216, 255)',
        main: '#1b004d',
        dark: '#210067',
        contrastText: '#FFFFFF',
      },
      secondary: {
        light: 'rgb(255, 236, 139)',
        main: '#fc0',
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

  const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: ${theme.palette.secondary.main};
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`

  class TopNav extends Component {
    render() {
    return (          
      <MuiThemeProvider theme={theme}>
      <AppBar position="absolute" elevation={0} style={{color: theme.palette.primary.main}}>      
        <Toolbar>
        <Grid justify="space-around" container spacing={24} alignItems="center">
          <Typography variant="h4" gutterBottom={false} style={{color: theme.palette.primary.contrastText}}>
            AllFreeStock
          </Typography>
          {/* <IconButton color="inherit" aria-label="Menu">
            <MenuIcon fontSize="large" style={{color: 'white'}}></MenuIcon>
          </IconButton> */}
          {/* <Typography variant="h6" style={{color: theme.palette.primary.contrastText}}>
            Find Events
          </Typography>
          <Typography variant="h6" style={{color: theme.palette.primary.contrastText}}>
            News
          </Typography> */}
          
          <Button color="secondary" variant="outlined">Search Now</Button>

          {/* <StyledButton color="secondary.main" style={{color: theme.palette.primary.contrastText}}>Login</StyledButton> */}
          </Grid>
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>
    );
  }}

  export default TopNav;
