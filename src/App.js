import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GenerationTable from './components/generationtable';
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: [
        {
          name: 'John Smith',
          status: 'Employed',
        },
        {
          name: 'Randal White',
          status: 'Unemployed',
        },
        {
          name: 'Stephanie Sanders',
          status: 'Employed',
        },
        {
          name: 'Steve Brown',
          status: 'Employed',
        },
        {
          name: 'Joyce Whitten',
          status: 'Employed',
        },
        {
          name: 'Samuel Roberts',
          status: 'Employed',
        },
        {
          name: 'Adam Moore',
          status: 'Employed',
        },
      ]
    };
  }
  render() {
    return (
      <MuiThemeProvider>
        
        <GenerationTable tableData={this.state.tableData} />
      </MuiThemeProvider>
    );
  }
}

export default App;
