import React, { Component } from "react"
import { MuiThemeProvider,
        Button, AppBar,
        Toolbar, Typography,
        Grid } from '@material-ui/core';
import { theme } from '../styles/theme'

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
