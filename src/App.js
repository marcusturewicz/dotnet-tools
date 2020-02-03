import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Search from './components/search/search'
import { Button } from '@material-ui/core';


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

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              ToolGet
          </Typography>
            <Button className={classes.menuItem} href="https://github.com/marcusturewicz/toolget/blob/master/PRIVACY.md" target="_blank" rel="noopener noreferrer" >Privacy</Button>
            <Button className={classes.menuItem} href="https://github.com/marcusturewicz/toolget/issues/new/choose" target="_blank" rel="noopener noreferrer" >Feeback</Button>
          </Toolbar>
        </AppBar>
      </div>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Search />
        </Container>
      </main>
    </React.Fragment>
  );
}
