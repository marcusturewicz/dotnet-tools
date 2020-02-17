import React from 'react';
import BuildIcon from '@material-ui/icons/Build';
import { Container } from '@material-ui/core';

export default class NotFound extends React.Component {

  render() {
    return (
      <div>
        <Container>
          <center>
          <BuildIcon color="inherit" fontSize="large"/>
          <h1>Page could not be found: 404</h1>
          </center>
        </Container>
      </div>
    )
  }
}
