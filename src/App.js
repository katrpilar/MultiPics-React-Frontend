import React, { Fragment, Component } from "react"
import { MuiThemeProvider,
        Button,
        Grid,
        } from '@material-ui/core';
import TopNav from './common/TopNav'
import { theme } from './styles/theme'
import { Route } from 'react-router-dom'
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import Search from './containers/Search'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container direction="column" alignItems="center" >
            <Grid item xs={12} >
              <TopNav />
              {/* <Route exact path="/search" component={Search} /> */}
            </Grid>
            {/* <Search /> */}
        </Grid>
      </ MuiThemeProvider>      
    );
  }
  
}
export default App;
