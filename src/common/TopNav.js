import React, { Component } from "react"
import { MuiThemeProvider,
        Button, AppBar,
        Toolbar, Typography,
        Grid } from '@material-ui/core';
import { theme } from '../styles/theme'
import logo from './multipicslogo.png'
import { Route, Link } from "react-router-dom";
// import App from '../App';


  class TopNav extends Component {
    render() {
    return (          
      <MuiThemeProvider theme={theme}>
      <AppBar position="absolute" elevation={0} style={{background: "#f3f3f3"}}>      
        <Toolbar>
        <Grid justify="flex-start" container spacing={24} alignItems="center">
        <img src={logo} alt="Logo" style={{height: '70px', width: 'auto'}}/>
          <Typography variant="h4" gutterBottom={false} style={{color: theme.palette.primary.main}}>            
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
          <Button>Search</Button>
          <Button>Trending</Button>
          <Button>Popular</Button>
          <Typography variant="body1" gutterBottom={false} style={{color: theme.palette.primary.main}}>
            {/* <Link to="/search">Search</Link>             */}
          </Typography>
          

          {/* <StyledButton color="secondary.main" style={{color: theme.palette.primary.contrastText}}>Login</StyledButton> */}
          </Grid>
          {/* <Button color="secondary" variant="outlined">
            <Link to="/popular">Search</Link>            
          </Button> */}
        </Toolbar>
        {/* <Route path="/search" component={App} /> */}
      </AppBar>
      </MuiThemeProvider>
    );
  }}

  export default TopNav;
