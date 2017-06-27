import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class GenerationTable extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false
  };

  constructor(props) {
    super(props);
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="16" style={{textAlign: 'center'}}>
                Generation Table
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The Generation Number">Generation</TableHeaderColumn>
              <TableHeaderColumn tooltip="The # of People at the start of Generation">People</TableHeaderColumn>
              <TableHeaderColumn tooltip="Type(s) of employment & # people it supports">Employment</TableHeaderColumn>
              <TableHeaderColumn tooltip="Type(s) of energy used & # people it supports">Energy Use</TableHeaderColumn>
              <TableHeaderColumn tooltip="Available Water">Water</TableHeaderColumn>
              <TableHeaderColumn tooltip="Available Land">Land</TableHeaderColumn>
              <TableHeaderColumn tooltip="Available Energy">Energy</TableHeaderColumn>
              <TableHeaderColumn tooltip="# of water before redemption">Water before redemp.</TableHeaderColumn>
              <TableHeaderColumn tooltip="# Discarded water after redemption">Discarded Water</TableHeaderColumn>
              <TableHeaderColumn tooltip="# of land before redemption">Land before redemp.</TableHeaderColumn>
              <TableHeaderColumn tooltip="# Discarded land after redemption">Discarded Land</TableHeaderColumn>
              <TableHeaderColumn tooltip="# of energy before redemption">Energy before redemp.</TableHeaderColumn>
              <TableHeaderColumn tooltip="# Discarded energy after redemption">Discarded Energy</TableHeaderColumn>
              <TableHeaderColumn tooltip="(1.75x) Population increase (births & immigration)">Population Increase</TableHeaderColumn>
              <TableHeaderColumn tooltip="- 20% death & emigration">Death & Emigration</TableHeaderColumn>
              <TableHeaderColumn tooltip="# of People at the end of Generation">Pop.</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.people}</TableRowColumn>
                <TableRowColumn>{row.employmentSupports}</TableRowColumn>
                <TableRowColumn>{row.energySupports}</TableRowColumn>
                <TableRowColumn>{row.water}</TableRowColumn>
                <TableRowColumn>{row.land}</TableRowColumn>
                <TableRowColumn>{row.energy}</TableRowColumn>
                <TableRowColumn>{row.waterBefore}</TableRowColumn>
                <TableRowColumn>{row.waterAfter}</TableRowColumn>
                <TableRowColumn>{row.landBefore}</TableRowColumn>
                <TableRowColumn>{row.landAfter}</TableRowColumn>
                <TableRowColumn>{row.energyBefore}</TableRowColumn>
                <TableRowColumn>{row.energyAfter}</TableRowColumn>
                <TableRowColumn>{row.popIncrease}</TableRowColumn>
                <TableRowColumn>{row.death}</TableRowColumn>
                <TableRowColumn>{row.pop}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
