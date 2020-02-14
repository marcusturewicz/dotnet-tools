import React from 'react';
import Tool from '../tool/tool'
import { FormControl, LinearProgress, Button, Grid, CircularProgress, InputAdornment, IconButton, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import queryString from 'query-string'

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

  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    if ('q' in qs) {
      this.setState({ search: qs.q }, () => this.search());
    }
  }

  search() {
    this.setState({ loading: true }, () => {
      const pageSkip = this.state.page * this.state.pageSize;
      fetch(`https://azuresearch-usnc.nuget.org/query?q=${this.state.search}&packageType=DotnetTool&skip=${pageSkip}&take=${this.state.pageSize}`).then(resp => {
        resp.json().then(response => {
          const tools = this.state.newSearch ? response.data : this.state.tools.concat(response.data);
          this.setState({
            tools: tools,
            loading: false,
            hasSearched: true,
            hasMoreResults: response.totalHits > tools.length
          });
        })
      });
    });
  }

  render() {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.setState({ page: 0, newSearch: true }, () => this.search());
      }
    }
    const handleSearchClicked = () => {
      this.setState({ page: 0, newSearch: true }, () => this.search());
    }
    const onLoadMoreClicked = () => {
      this.setState({ page: this.state.page + 1, newSearch: false }, () => this.search());
    }
    const updateInputValue = (event) => {
      this.setState({
        search: event.target.value
      }, () => this.props.history.push({ search: `?q=${this.state.search}`, pathname: '/tools' }));
    }
    return (
      <div>
        <FormControl id="search-form" fullWidth>
          <TextField
            id="search-input"
            value={this.state.search}
            onChange={updateInputValue}
            variant="outlined"
            label="Search for .NET Tools..."
            onKeyDown={handleKeyPress}
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={handleSearchClicked}>
                  <IconButton aria-label="Search button">
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
