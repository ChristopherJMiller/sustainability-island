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
          people: '5',
          employmentSupports: '5 | 50',
          energySupports: '3 | 30',
          water: '40',
          land: '30',
          energy: '50',
          waterBefore: '40',
          waterAfter: '30',
          landBefore: '30',
          landAfter: '20',
          energyBefore: '50',
          energyAfter: '60',
          popIncrease: '3',
          death: 'yes',
          pop: '10'
        }
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
