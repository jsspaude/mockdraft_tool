/* eslint-disable no-unused-vars */
import React from 'react';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import Header from './Header';
import Settings from './Settings';
import CurrentStatus from './CurrentStatus';
import PlayerList from './PlayerList';
import Managers from './Managers';
import ManagerNames from './ManagerNames';
import { fetchCsv } from '../helpers';
import base from '../base';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_data: {},
      userSettings: {},
      showComponent: { settings: true, managerNames: false },
      managerData: {},
    };
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.hideSettings = this.hideSettings.bind(this);
  }

  static propTypes = {
    match: PropTypes.object,
  };

  getData = this.getData.bind(this);

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.draftName);
    if (localStorageRef) {
      this.setState({ userSettings: JSON.parse(localStorageRef) });
    }
    this.getCsvData();
    this.ref = base.syncState(`${params.draftName}/data`, {
      context: this,
      state: 'player_data',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.draftName,
      JSON.stringify(this.state.userSettings),
    );
  }

  handleSettingsChange(settings) {
    this.setState({ userSettings: settings });
  }

  hideSettings() {
    this.setState({
      showComponent: { settings: false, managerNames: true },
    });
  }

  getData(result) {
    console.log(result);
    this.setState({ player_data: result.data });
  }

  async getCsvData() {
    const csvData = await fetchCsv();

    Papa.parse(csvData, {
      complete: this.getData,
      header: true,
      dynamicTyping: true,
      transformHeader(h) {
        const newH = h.replace(/[^A-Z0-9]+/gi, '_');
        return newH.toLowerCase();
      },
    });
  }

  updateManagerNames = (key, updatedManagerName) => {
    const managerNames = { ...this.state.managerData.name };
    managerNames[key] = updatedManagerName;
    this.setState({ managerData: { name: updatedManagerName } });
  };

  render() {
    return (
      <div className="mock-draft">
        <Header title="Sweatalus" />
        {this.state.showComponent.settings && (
          <Settings
            onSettingsChange={this.handleSettingsChange}
            hideSettings={this.hideSettings}
            showManagerNames={this.showManagerNames}
          />
        )}
        {this.state.showComponent.managerNames
          && this.state.showComponent.settings === false
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
        <CurrentStatus />
        <PlayerList data={this.state.player_data} />
        <Managers />
      </div>
    );
  }
}
export default App;
