/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import getCsvData from './GetCSV';
import Settings from './Settings';
import PlayerList from './PlayerList';
import Managers from './Managers';
import ManagerNames from './ManagerNames';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: {},
      userSettings: {},
      managerData: {},
    };
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    // const { params } = this.props.match;
    // const localStorageRef = localStorage.getItem(params.draftName);
    // if (localStorageRef) {
    //   this.setState({ userSettings: JSON.parse(localStorageRef) });
    // }
    getCsvData().then((result) => this.setState({ playerData: result.data }));
    // this.ref = base.syncState(`${params.draftName}/data`, {
    //   context: this,
    //   state: 'playerData',
    // });
  }

  // componentDidUpdate() {
  //   localStorage.setItem(
  //     this.props.match.params.draftName,
  //     JSON.stringify(this.state.userSettings),
  //   );
  // }

  handleSettingsChange(settings) {
    this.setState({ userSettings: settings });
  }

  // hideSettings() {
  //   this.setState({
  //     showComponent: { settings: false, managerNames: true },
  //   });
  // }

  getData(result) {
    this.setState({ playerData: result.data });
  }

  updateManagerNames = (key, updatedManagerName) => {
    const managerNames = { ...this.state.managerData.name };
    managerNames[key] = updatedManagerName;
    this.setState({ managerData: { name: updatedManagerName } });
  };

  render() {
    return (
      <div className="mock-draft">
        <Settings
          onSettingsChange={this.handleSettingsChange}
          showManagerNames={this.showManagerNames}
        />
        {this.state.userSettings.managers
          && [...Array(parseInt(this.state.userSettings.managers, 10))].map((e, i) => (
            <ManagerNames
              key={i}
              index={i}
              managerNamesData={this.state.managerData}
              onManagerNamesChange={this.handleManagerNamesChange}
              hideManagerNames={this.hideManagerNames}
              updateManagerNames={this.updateManagerNames}
            />
          ))}
        <PlayerList data={this.state.playerData} />
        <Managers />
      </div>
    );
  }
}
export default App;
