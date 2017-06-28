import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GenerationTable from './components/generationtable';
import UserInput from './components/UserInput';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generation: 1,
      tableData: [
        {
          people: 0
        }
      ],
      energyTypes: {
        coal: 0,
        hydro: 0,
        nuclear: 0,
        alternative: 0
      },
      laborForce: {
        industry: 0,
        service: 0,
        farmers: 0
      }
    };

    this.setGeneration = (generation, data) => {
      let oldTableData = this.state.tableData;
      oldTableData[generation - 1] = data;
      this.setState({
        tableData: oldTableData
      });
      console.log("Updated Generation " + generation)
    }

    this.totalWorkers = () => {
      return this.state.laborForce.industry + this.state.laborForce.service + this.state.laborForce.farmers;
    };
  }

  componentDidMount() {
    this.setGeneration(
      1,
      {
        people: 4,
        employmentSupports: '',
        energySupports: '',
        water: '70',
        land: '40',
        energy: '40',
        waterBefore: '',
        waterAfter: '',
        landBefore: '',
        landAfter: '',
        energyBefore: '',
        energyAfter: '',
        popIncrease: '',
        death: '',
        pop: ''
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <MuiThemeProvider>
          <GenerationTable tableData={this.state.tableData} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Card>
            <CardHeader title={"Generation " + this.state.generation} />
            <CardText>
              Workers Remaining: {this.state.tableData[this.state.generation - 1].people - this.totalWorkers()}<br />
              <UserInput hint="text" />
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
