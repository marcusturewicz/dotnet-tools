import React from 'react';
import axios from 'axios'
import Tool from '../tool/tool'
import { FormControl, InputLabel, Input, LinearProgress, TablePagination, Button } from '@material-ui/core';

export default class Search extends React.Component {

    constructor() {
        super()
        this.state = {
            tools: undefined,
            loading: false,
            page: 0,
            pageSize: 20,
            search: ''
        }
    }

    render() {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                this.setState({page: 0, search: event.target.value}, () => searchNuget() );
            }
        }
        const searchNuget = () => {
            this.setState({ loading: true }, () => {
                const pageSkip = this.state.page * this.state.pageSize;
                axios.get(`https://azuresearch-usnc.nuget.org/query?q=${this.state.search}&packageType=DotnetTool&skip=${pageSkip}&take=${this.state.pageSize}`).then(response => {
                    this.setState({ tools: response.data.data, loading: false });
                });
            });
        }
        const onPrevClicked = () => {
            this.setState({ page: this.state.page - 1 }, () => searchNuget());
        }        
        const onNextClicked = () => {
            this.setState({ page: this.state.page + 1 }, () => searchNuget());
        }
        return (
            <div>
                <FormControl fullWidth>
                    <InputLabel htmlFor="search-bar">Search for .NET tools...</InputLabel>
                    <Input
                        id="search-bar"
                        onKeyDown={handleKeyPress}
                    />
                </FormControl>            
                {this.state.loading && <LinearProgress />}
                {
                    this.state.tools && this.state.tools.length > 0 &&
                    <div >
                        <Button disabled={!this.state.page} variant="contained" onClick={onPrevClicked}>Previous</Button>
                        <Button disabled={this.state.tools.length < this.state.pageSize} variant="contained" onClick={onNextClicked}>Next</Button>
                    </div>
                }                    
                {this.state.tools && this.state.tools.length > 0 &&
                    <div>
                        <br />
                        {this.state.tools.map(data => <div><Tool key={data.id} value={data}></Tool><br /></div>)}
                    </div>}
                {this.state.tools && this.state.tools.length === 0 && <p hidden={!this.state.tools}>No tools could be found.</p>}
            </div>
        )
    }
}
