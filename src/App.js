import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GenerationTable from './components/generationtable';
import UserInput from './components/UserInput';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generation: 1,
      stagnantPop: false,
      birthMult: 1.75,
      lost: false,
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
      },
      energyConservationUses: 3
    };

    this.setGeneration = (generation, data, changeResources = true) => {
      let oldTableData = this.state.tableData;
      oldTableData[generation - 1] = data;
      if (!changeResources) {
        oldTableData[generation - 1].water = this.state.tableData[generation - 1].water;
        oldTableData[generation - 1].energy = this.state.tableData[generation - 1].energy;
        oldTableData[generation - 1].land = this.state.tableData[generation - 1].land;
      }
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

    this.energySupport = () => {
      let result = (this.state.energyTypes.coal * 10) + (this.state.energyTypes.hydro * 5) + (this.state.energyTypes.nuclear * 10) + (this.state.energyTypes.alternate * 4);
      if (isNaN(result))
        return 0

      return result;
    }

    this.workersSupport = () => {
      let result = (this.state.laborForce.industry * 10) + (this.state.laborForce.service * 10) + (this.state.laborForce.farm * 4);
      if (isNaN(result))
        return 0

      return result;
    }

    this.updateEnergy = this.updateEnergy.bind(this);
    this.updateWorkers = this.updateWorkers.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);

    this.canProgress = this.canProgress.bind(this);

    this.oldPop = 0;
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

  nextGeneration() {
    let genData = this.state.tableData[this.state.generation - 1];
    this.state.energyTypes = this.state.energyTypes;
    this.state.laborForce = this.state.laborForce;
    let foodSupplySupport = Math.ceil(genData.people / 10);
    let usedEnergyToken = false;

    genData.water -= genData.people + foodSupplySupport + this.state.energyTypes.coal + Math.floor(this.state.energyTypes.hydro / 2) + this.state.energyTypes.nuclear;
    genData.land -= (foodSupplySupport * 2) + (this.state.energyTypes.coal * 2) + this.state.energyTypes.hydro + this.state.energyTypes.nuclear + (this.state.laborForce.industry * 2) + this.state.laborForce.service + this.state.laborForce.farm;
    genData.energy -= this.state.energyTypes.coal + this.state.energyTypes.hydro + this.state.energyTypes.nuclear + Math.floor(this.state.energyTypes.alternate / 3) + this.state.laborForce.industry + this.state.laborForce.service + this.state.laborForce.farm + Math.floor(genData.people / 20);

    if ((genData.people - this.oldPop) > 0) {
      genData.land -= Math.floor((genData.people - this.oldPop) / 20);
    }

    if (this.state.generation % 4 == 0) {
      genData.land -= this.state.laborForce.farm;
    }

    if (this.state.generation == 5) {
      genData.land -= Math.floor(genData.people / 20);
    }

    //Redemption
    genData.waterBefore = genData.water;
    genData.landBefore = genData.land;
    genData.energyBefore = genData.energy;

    genData.water += (genData.people + foodSupplySupport + this.state.energyTypes.coal + Math.floor(this.state.energyTypes.hydro / 2) + this.state.energyTypes.nuclear) - 2;

    if (document.getElementById('conserveWater').checked) {
      genData.water += 1;
      genData.energy -= 1;
    }

    genData.land += ((foodSupplySupport * 2) + (this.state.energyTypes.coal * 2) + this.state.energyTypes.hydro + this.state.energyTypes.nuclear + (this.state.laborForce.industry * 2) + this.state.laborForce.service + this.state.laborForce.farm) - 2;

    if (document.getElementById('conserveSoil').checked) {
      genData.land += 1;
      genData.energy -= 1;
    }

    genData.energy += this.state.energyTypes.alternate;

    if (document.getElementById('conserveEnergy').checked) {
      genData.energy += 2;
      usedEnergyToken = true
    }

    genData.waterAfter = genData.water;
    genData.landAfter = genData.land;
    genData.energyAfter = genData.energy;

    //Population
    let newPop = genData.people + Math.round(genData.people * this.state.birthMult);
    genData.popIncrease =  Math.round(genData.people * this.state.birthMult);
    genData.death =  Math.round(newPop / 5);
    let finalPop = newPop - Math.round(newPop / 5);
    genData.pop = finalPop;

    this.setGeneration(this.state.generation, genData, false);

    let newGen = {
            people: Number(genData.pop),
            employmentSupports: genData.employmentSupports,
            energySupports: genData.energySupports,
            water: Number(genData.water),
            land: Number(genData.land),
            energy: Number(genData.energy),
            waterBefore: '',
            waterAfter: '',
            landBefore: '',
            landAfter: '',
            energyBefore: '',
            energyAfter: '',
            popIncrease: '',
            death: '',
            pop: ''
          };
    this.setGeneration(this.state.generation + 1, newGen);

    this.state.generation += 1;
    this.state.energyConservationUses = usedEnergyToken ? this.state.energyConservationUses - 1 : this.state.energyConservationUses

    if(this.state.tableData[this.state.generation - 1].water < 0 || this.state.tableData[this.state.generation - 1].land < 0 || this.state.tableData[this.state.generation - 1].energy < 0) {
      this.setState({
        lost: true
      });
    }

    if (this.state.generation == 4) {
      let dice = Math.random() * (6 - 1) + 1;
      switch(dice) {
        case 6:
          this.setState({
            stagnantPop: true
          });
        break;
        case 3:
          this.setState({
            birthMult: 1.35
          });
        break;
      }
      this.nextGeneration();
    }
    this.render();
  }

  canProgress() {
    if(this.state.lost)
      return false;

    if (this.state.laborForce.farm == 0)
      return false;

    if (document.getElementById('coal') != null) {
      if (((Number(document.getElementById('coal').value) * 10) + (Number(document.getElementById('hydro').value) * 5) + (Number(document.getElementById('nuclear').value) * 10) + (Number(document.getElementById('alternate').value) * 4)) < this.state.tableData[this.state.generation - 1].people)
        return false;
    }

    if (document.getElementById('industry') != null) {
      if ((Number(document.getElementById('industry').value) * 10) + (Number(document.getElementById('service').value) * 10) + (Number(document.getElementById('farm').value) * 4) < this.requiredWorkers())
        return false;
    }

    return true;
  }

  render() {
    let button = null;
    if (this.canProgress()) {
      button = <RaisedButton label="Next Generation" fullWidth={true} onTouchTap={this.nextGeneration} />;
    } else {
      button = <RaisedButton label="Missing Requirements" fullWidth={true} disabled={true} />;
    }

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
              Supporting { this.energySupport() } out the required { this.state.tableData[this.state.generation - 1].people }.<br />
              <UserInput id="coal" hint="Coal Fired Plants" onChange={this.updateEnergy} />
              <UserInput id="hydro" hint="Hydroelectric Plants" onChange={this.updateEnergy} />
              <UserInput id="nuclear" hint="Nuclear Plants" onChange={this.updateEnergy} />
              <UserInput id="alternate" hint="Alernative Energy Plants" onChange={this.updateEnergy} />

              <h4>Work Operations</h4>
              { this.workersSupport() } employed of required { this.requiredWorkers() }.<br />
              <UserInput id="industry" hint="Industrial Factories" onChange={this.updateWorkers} />
              <UserInput id="service" hint="Service Companies" onChange={this.updateWorkers} />
              <UserInput id="farm" hint="Farming Operations" onChange={this.updateWorkers} />
              <Checkbox label="Implement Water Conservation" id="conserveWater" />
              <Checkbox label="Implement Soil Conservation" id="conserveSoil" />
              <Checkbox label={"Implement Energy Conservation (" + this.state.energyConservationUses + " left)"} id="conserveEnergy" />
              { button }
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
