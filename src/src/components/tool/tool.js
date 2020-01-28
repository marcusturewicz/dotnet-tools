import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class Tool extends React.Component {

  trimString(input, chars) {
    return input.length > chars ? `${input.substring(0,chars)}...` : input;
  }

  render() {
    return (
      <Card className="card">
        <CardContent>
          <img src={this.props.value.iconUrl} width="50" />
          <Typography className="title" color="textSecondary" gutterBottom>
            Package name: {this.props.value.id}
          </Typography>
          <Typography className="title" color="textSecondary" gutterBottom>
            Description: {this.trimString(this.props.value.description, 200)}
          </Typography>
          <Typography className="title" color="textSecondary" gutterBottom>
            Latest version: {this.props.value.version}
          </Typography>
          <Typography className="title" color="textSecondary" gutterBottom>
            Authors: {this.props.value.authors.join(', ')}
          </Typography>          
        </CardContent>
        <CardActions>
          <a href={`https://nuget.org/packages/${this.props.value.id}`} target="_blank" rel="noopener noreferrer">View on NuGet</a>
        </CardActions>
      </Card>
    );
  }
}
