import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class ManagerNames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  roundsRef = React.createRef();

  managersRef = React.createRef();

  static propTypes = {
    onSettingsChange: PropTypes.func,
  };

  handleChange(e) {
    const updatedManagerName = {
      ...this.props.managerNamesData.managerName,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    this.props.updateManagerNames(this.props.index, updatedManagerName);
  }

  render() {
    return (
      <div className="manager-names">
        <input
          type="text"
          name="managerName"
          ref={this.managerNameRef}
          placeholder="Manager Name"
          defaultValue={getFunName()}
          required
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default ManagerNames;
