import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Search from './components/search/search';

function App() {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6">
            .NET Global Tools
    </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <br />
      <Container maxWidth="md">
        <Search />
      </Container>
    </React.Fragment>
  );
}

export default App;