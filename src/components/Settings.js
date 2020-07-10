import React from 'react';
import PropTypes from 'prop-types';

class Settings extends React.Component {
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
    e.preventDefault();
    const settings = {
      rounds: this.roundsRef.current.value,
      managers: this.managersRef.current.value,
    };
    this.props.onSettingsChange(settings);
  }

  render() {
    return (
      <div>
        <form action="" className="user-settings" onSubmit={this.handleChange}>
          <input
            type="text"
            name="rounds"
            ref={this.roundsRef}
            placeholder="# of Rounds"
            required
          />
          <select name="managers" ref={this.managersRef} required>
            <option value="10">10 Managers</option>
            <option value="4">4 Managers</option>
            <option value="12">12 Managers</option>
            <option value="14">14 Managers</option>
            <option value="16">16 Managers</option>
          </select>
          <button type="submit">Start Draft</button>
        </form>
      </div>
    );
  }
}

export default Settings;
