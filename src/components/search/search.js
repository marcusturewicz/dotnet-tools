import React from 'react';
import axios from 'axios'
import Tool from '../tool/tool'
import { FormControl, InputLabel, Input, LinearProgress } from '@material-ui/core';

export default class Search extends React.Component {

    constructor() {
        super()
        this.state = {
            hasSearched: false,
            hasData: false,
            tools: undefined,
            loading: false
        }
    }

    render() {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                this.setState({ loading: true });
                const q = event.target.value;
                axios.get(`https://azuresearch-usnc.nuget.org/query?q=${q}&packageType=DotnetTool&skip=0&take=20`).then(response => {
                    this.setState({ hasSearched: true })
                    if (response.data.data.length > 0)
                        this.setState({ hasData: true })
                    this.setState({ tools: response.data.data });
                    this.setState({ loading: false });
                });
            }
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
                {this.state.tools && this.state.tools.length > 0 &&
                    <div>
                        <br />
                        {this.state.tools.map(data => <div><Tool key={data.id} value={data}></Tool><br /></div>)}
                    </div>}
                {this.state.tools && this.state.tools.length === 0 && <p hidden={!this.state.tools}>0 results could be found.</p>}
            </div>
        )
    }
}
