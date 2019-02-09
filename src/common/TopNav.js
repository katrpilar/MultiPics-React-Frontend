import React, { Component } from "react";
import {
  MuiThemeProvider,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Grid
} from "@material-ui/core";
import { theme } from "../styles/theme";
import logo from "./multipicslogo.png";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import App from '../App';

const linkButtonStyles = {
  borderBottom: '8px solid #536efa', borderLeft: '6px solid #39b5fb', borderTop: '2px solid #5ce0e6', borderRight: '2px solid #5ce0e6', textDecoration: 'none'
};

class TopNav extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar
          position="absolute"
          elevation={0}
          style={{ background: "#f3f3f3" }}
        >
          <Toolbar>
            <Grid
              justify="space-between"
              container
              spacing={40}
              alignItems="center"
            >
            <div>
              <img
                  src={logo}
                  alt="Logo"
                  style={{ height: "70px", width: "auto", display:'inline' }}
                />
                <Typography
                  variant="h4"
                  gutterBottom={false}
                  style={{ display:'inline' }}
                >                
                  MultiPics
                </Typography>
            </div>
              
              {/* <IconButton color="inherit" aria-label="Menu">
              <MenuIcon fontSize="large" style={{color: 'white'}}></MenuIcon>
            </IconButton> */}
              {/* <Typography variant="h6" style={{color: theme.palette.primary.contrastText}}>
              Find Events
            </Typography>
            <Typography variant="h6" style={{color: theme.palette.primary.contrastText}}>
              News
            </Typography> */}
              <Link to="/search" style={linkButtonStyles}>
                <Button>Search</Button>
              </Link>
              <Link to="/search" style={linkButtonStyles}>
                <Button>Trending</Button>
                </Link>
              <Link to="/search" style={linkButtonStyles}>
              <Button>Popular</Button>
              </Link>
              <Link to="/about" style={linkButtonStyles}>
                <Button>About</Button>
              </Link>
              <Typography
                variant="body1"
                gutterBottom={false}
                style={{ color: theme.palette.primary.main }}
              >
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
  }
}

export default TopNav;
