import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const ComplexGrid = (tool) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              <img className={classes.img} alt="complex"
                src={tool.iconUrl}
                onError={(e) => { e.target.onerror = null; e.target.src = tool.errorIconUrl }} />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {tool.id}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {tool.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {tool.authors}
                </Typography>
              </Grid>
              <Grid item>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">View on NuGet</a>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{tool.version}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


export default class Tool extends React.Component {

  errorIconUrl = 'https://www.nuget.org/Content/gallery/img/default-package-icon.svg';

  trimString(input, chars) {
    return input.length > chars ? `${input.substring(0, chars)}...` : input;
  }

  icon(url) {
    return url === undefined ? this.errorIconUrl : url;
  }

  render() {
    return (
      <ComplexGrid
        iconUrl={this.icon(this.props.value.iconUrl)}
        errorIconUrl={this.errorIconUrl}
        id={this.props.value.id}
        description={this.trimString(this.props.value.description, 200)}
        version={this.props.value.version}
        url={`https://nuget.org/packages/${this.props.value.id}`}
        authors={this.trimString(this.props.value.authors.join(', '), 100)}
      />
    )
  }
}