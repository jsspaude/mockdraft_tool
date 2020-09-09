/* eslint-disable no-unused-vars */
import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import KeeperList from '../KeeperList/KeeperList';
import Firebase from '../../calls/base';
import { DataContext } from '../DataContextProvider';

const Settings = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [keeperBool, setKeeperBool] = useState(false);
  const [keeperList, setKeeperList] = useState(null);
  const [managers, setManagers] = useState(10);

  const handleSettings = async (e) => {
    e.preventDefault();
    const rounds = await Object.values(state.userSettings.positions).reduce((a, b) => a + b, 0);
    await dispatch({ type: 'storeSettings', payload: { managers, rounds, keeperList } });
    Firebase.updateUserData(
      props.uid,
      {
        ...state.userSettings,
        managers,
        rounds,
        keeperList,
      },
      'userSettings',
    );
    Firebase.updateUserData(props.uid, true, 'inProgress');
    if (keeperList) {
      keeperList.forEach((player) => {
        if (player.round && player.manager) {
          const round = parseInt(player.round, 10);
          const manager = (parseInt(player.manager, 10) - 1) * 0.01;
          const keeperDrafted = round + manager;
          Firebase.updateUserData(
            props.uid,
            { ...state.playerData[player.index], drafted: keeperDrafted },
            `playerData/${player.index}`,
          );
        }
      });
    }
  };

  const handleChange = (e, label) => {
    const payload = parseInt(e, 10);
    dispatch({ type: 'positions', label, payload });
  };

  const handleKeeperChange = (e) => {
    setKeeperBool(e.target.checked);
  };

  const handleManagerChange = (e) => {
    setManagers(parseInt(e, 10));
  };

  useLayoutEffect(() => {}, [keeperBool]);
  return (
    <div>
      <form className="user-settings" onSubmit={(e) => handleSettings(e)}>
        <select defaultValue="10" onChange={(e) => handleManagerChange(e.target.value)}>
          <option value="10">10 Managers</option>
          <option value="4">4 Managers</option>
          <option value="12">12 Managers</option>
          <option value="14">14 Managers</option>
          <option value="16">16 Managers</option>
        </select>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="label">QB</div>
                  <div className="selector">
                    <select defaultValue="1" onChange={(e) => handleChange(e.target.value, 'QB')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">WR/RB</div>
                  <div className="selector">
                    <select
                      defaultValue="0"
                      onChange={(e) => handleChange(e.target.value, 'WR_RB')}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">DST</div>
                  <div className="selector">
                    <select defaultValue="1" onChange={(e) => handleChange(e.target.value, 'DST')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="label">RB</div>
                  <div className="selector">
                    <select defaultValue="2" onChange={(e) => handleChange(e.target.value, 'RB')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">WR/TE</div>
                  <div className="selector">
                    <select
                      defaultValue="0"
                      onChange={(e) => handleChange(e.target.value, 'WR_TE')}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">K</div>
                  <div className="selector">
                    <select defaultValue="1" onChange={(e) => handleChange(e.target.value, 'K')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="label">WR</div>
                  <div className="selector">
                    <select defaultValue="2" onChange={(e) => handleChange(e.target.value, 'WR')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">RB/TE</div>
                  <div className="selector">
                    <select
                      defaultValue="0"
                      onChange={(e) => handleChange(e.target.value, 'RB_TE')}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">BENCH</div>
                  <div className="selector">
                    <select defaultValue="5" onChange={(e) => handleChange(e.target.value, 'K')}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="label">TE</div>
                  <div className="selector">
                    <select defaultValue="1" onChange={(e) => handleChange(e.target.value, 'TE')}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">WR/RB/TE</div>
                  <div className="selector">
                    <select
                      defaultValue="2"
                      onChange={(e) => handleChange(e.target.value, 'WR_RB_TE')}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="label">QB/WR/RB/TE</div>
                  <div className="selector">
                    <select
                      defaultValue="0"
                      onChange={(e) => handleChange(e.target.value, 'QB_WR_RB_TE')}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    Set Keepers?
                    <Switch
                      checked={state.checkedB}
                      onChange={handleKeeperChange}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {keeperBool && <KeeperList setKeeperList={setKeeperList} playerData={state.playerData} />}
        <button type="submit">Start Draft</button>
      </form>
    </div>
  );
};

Settings.propTypes = {
  uid: PropTypes.string,
};

export default Settings;
