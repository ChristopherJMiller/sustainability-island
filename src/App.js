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

    this.requiredWorkers = () => {
      return Math.round(this.state.tableData[this.state.generation - 1].people * 0.75);
    }

    this.updateEnergy = this.updateEnergy.bind(this);
    this.updateWorkers = this.updateWorkers.bind(this);
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

  updateEnergy() {
    let oldGenData = this.state.tableData[this.state.generation - 1];
    const totalPlants = Number(document.getElementById('coal').value) + Number(document.getElementById('hydro').value) + Number(document.getElementById('nuclear').value) + Number(document.getElementById('alternate').value);
    const totalSupports = (Number(document.getElementById('coal').value) * 10) + (Number(document.getElementById('hydro').value) * 5) + (Number(document.getElementById('nuclear').value) * 10) + (Number(document.getElementById('alternate').value) * 4);
    oldGenData.energySupports =  totalPlants + " | " + totalSupports;
    this.setGeneration(this.state.generation, oldGenData);
    this.setState({
        energyTypes: {
          coal: Number(document.getElementById('coal').value),
          hydro: Number(document.getElementById('hydro').value),
          nuclear: Number(document.getElementById('nuclear').value),
          alternate: Number(document.getElementById('alternate').value)
        }
    });
  }

  updateWorkers() {
    let oldGenData = this.state.tableData[this.state.generation - 1];
    const totalOperations = Number(document.getElementById('industry').value) + Number(document.getElementById('service').value) + Number(document.getElementById('farm').value);
    const totalSupports = (Number(document.getElementById('industry').value) * 10) + (Number(document.getElementById('service').value) * 10) + (Number(document.getElementById('farm').value) * 4);
    oldGenData.employmentSupports =  totalOperations + " | " + totalSupports;
    this.setGeneration(this.state.generation, oldGenData);
    this.setState({
        laborForce: {
          industry: Number(document.getElementById('industry').value),
          service: Number(document.getElementById('service').value),
          farm: Number(document.getElementById('farm').value),
        }
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <GenerationTable tableData={this.state.tableData} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Card>
            <CardHeader title={"Generation " + this.state.generation} />
            <CardText>
              <h4>Energy Sources</h4>
              <UserInput id="coal" hint="Coal Fired Plants" onChange={this.updateEnergy} />
              <UserInput id="hydro" hint="Hydroelectric Plants" onChange={this.updateEnergy} />
              <UserInput id="nuclear" hint="Nuclear Plants" onChange={this.updateEnergy} />
              <UserInput id="alternate" hint="Alernative Energy Plants" onChange={this.updateEnergy} />

              <h4>Work Operations</h4>
              { this.requiredWorkers() } must be employed<br />
              <UserInput id="industry" hint="Industrial Factories" onChange={this.updateWorkers} />
              <UserInput id="service" hint="Service Companies" onChange={this.updateWorkers} />
              <UserInput id="farm" hint="Farming Operations" onChange={this.updateWorkers} />
            </CardText>
          </Card>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label="Next Generation" fullWidth={true} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
