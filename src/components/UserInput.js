import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class GenerationTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextField id={this.props.id} hintText={this.props.hint} errorText={this.props.errors} onChange={this.props.onChange} type="number" />
    );
  }
}
