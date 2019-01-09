import React, { Component } from "react"
import { MuiThemeProvider,
        Button, AppBar,
        Toolbar, Typography,
        Grid } from '@material-ui/core';
import { theme } from '../styles/theme'
import logo from './multipicslogo.png'

  class TopNav extends Component {
    render() {
    return (          
      <MuiThemeProvider theme={theme}>
      <AppBar position="absolute" elevation={0} style={{color: theme.palette.primary.main}}>      
        <Toolbar>
        <Grid justify="flex-start" container spacing={24} alignItems="center">
        <img src={logo} alt="Logo" style={{height: '70px', width: 'auto'}}/>
          <Typography variant="h4" gutterBottom={false} style={{color: theme.palette.primary.contrastText}}>            
            MultiPics
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
          

          {/* <StyledButton color="secondary.main" style={{color: theme.palette.primary.contrastText}}>Login</StyledButton> */}
          </Grid>
          <Button color="secondary" variant="outlined">Search</Button>
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>
    );
  }}

  export default TopNav;
