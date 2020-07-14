/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { base } from '../calls/base';
import { AuthContext } from './Context';
import getCsvData from '../calls/GetCSV';
import Settings from './Settings';
import PlayerList from './PlayerList';
import Managers from './Managers';
import ManagerNames from './ManagerNames';

const Draft = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     playerData: {},
  //     userSettings: {},
  //     managerData: {},
  //   };
  //   this.handleSettingsChange = this.handleSettingsChange.bind(this);
  //   this.getData = this.getData.bind(this);
  // }

  // static propTypes = {
  //   match: PropTypes.object,
  // };
  const [uid, setUid] = useContext(AuthContext);
  const [playerData, setPlayerData] = useState('');

  useEffect(() => {
    getCsvData().then((result) => setPlayerData(result.data));
    // this.ref = base.syncState(`${uid}/data`, {
    //   context: this,
    //   state: 'playerData',
    // });
  });

  // componentDidUpdate() {
  //   localStorage.setItem(
  //     this.props.match.params.draftName,
  //     JSON.stringify(this.state.userSettings),
  //   );
  // }

  // handleSettingsChange(settings) {
  //   this.setState({ userSettings: settings });
  // }

  // // hideSettings() {
  // //   this.setState({
  // //     showComponent: { settings: false, managerNames: true },
  // //   });
  // // }

  // getData(result) {
  //   this.setState({ playerData: result.data });
  // }

  // updateManagerNames = (key, updatedManagerName) => {
  //   const managerNames = { ...this.state.managerData.name };
  //   managerNames[key] = updatedManagerName;
  //   this.setState({ managerData: { name: updatedManagerName } });
  // };

  return (
    <div className="mock-draft">
      {/* <Settings
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
        ))} */}
      <PlayerList data={playerData} />
      <Managers />
    </div>
  );
};

export default Draft;
