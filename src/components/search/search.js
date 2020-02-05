import React from 'react';
import axios from 'axios'
import Tool from '../tool/tool'
import { FormControl, LinearProgress, Button, Grid, CircularProgress, InputAdornment, IconButton, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";

export default class Search extends React.Component {

  constructor() {
    super()
    this.state = {
      tools: [],
      loading: false,
      hasSearched: false,
      hasMoreResults: false,
      page: 0,
      pageSize: 20,
      search: '',
      newSearch: true,
    }
  }

  render() {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.setState({ page: 0, newSearch: true }, () => search());
      }
    }
    const handleSearchClicked = () => {
      this.setState({ page: 0, newSearch: true }, () => search());
    }
    const search = () => {
      this.setState({ loading: true }, () => {
        const pageSkip = this.state.page * this.state.pageSize;
        axios.get(`https://azuresearch-usnc.nuget.org/query?q=${this.state.search}&packageType=DotnetTool&skip=${pageSkip}&take=${this.state.pageSize}`).then(response => {
          this.setState({
            tools: this.state.newSearch ? response.data.data : this.state.tools.concat(response.data.data),
            loading: false,
            hasSearched: true,
            hasMoreResults: response.data.totalHits > response.data.data.length
          });
        });
      });
    }
    const onLoadMoreClicked = () => {
      this.setState({ page: this.state.page + 1, newSearch: false }, () => search());
    }
    const updateInputValue = (event) => {
      this.setState({
        search: event.target.value
      });
    }
    return (
      <div>
        <FormControl id="search-form" fullWidth>
          <TextField
            id="search-input"
            value={this.state.search}
            onChange={updateInputValue}
            variant="outlined"
            label="Search for .NET global tools..."
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={handleSearchClicked}>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        {this.state.loading && <LinearProgress />}
        {this.state.tools.length > 0 &&
          <div>
            <br />
            {this.state.tools.map(data => <div><Tool key={data.id} value={data}></Tool><br /></div>)}
          </div>}
        <p hidden={!(this.state.hasSearched && this.state.tools.length === 0)}>No tools could be found.</p>
        {
          this.state.tools.length > 0 &&
          <div >
            <Grid container justify="center">
              {!this.state.loading && <Button disabled={!this.state.hasMoreResults} variant="contained" color="primary" onClick={onLoadMoreClicked}>Load more...</Button>}
              {this.state.loading && <CircularProgress />}
            </Grid>
            <p hidden={this.state.hasMoreResults}>No more results available.</p>
            <br />
          </div>
        }
      </div>
    )
  }
}
