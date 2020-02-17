import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Search from './components/search/search'
import { Button, IconButton } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './components/not-found/not-found';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuItem: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#705fff',
      main: '#1432f5',
      dark: '#0003c1',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffbfff',
      main: '#f18df4',
      dark: '#bd5cc1',
      contrastText: '#000'
    }
  }
});
theme = responsiveFontSizes(theme);

export default function Album() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="relative">
            <Container maxWidth="md">
              <Toolbar>
                <IconButton edge="start" className={classes.menuItem} color="inherit" aria-label="menu">
                  <img src="./icon-192x192.png" width="50" style={{ filter: 'brightness(0) invert(1)' }} alt="ToolGet logo inverted" />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  ToolGet
                </Typography>
                <Button color="inherit" href="https://github.com/marcusturewicz/toolget/blob/master/PRIVACY.md" target="_blank" rel="noopener noreferrer" >Privacy</Button>
                <Button color="inherit" href="https://github.com/marcusturewicz/toolget/issues/new/choose" target="_blank" rel="noopener noreferrer" >Feeback</Button>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Router>
              <Switch>
                <Route exact path="/" component={Search} />
                <Route path="/tools" component={Search} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </Container>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}
