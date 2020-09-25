/* eslint-disable no-unused-vars */
import React, { useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { DataContext } from '../../contexts/DataContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import Manager from '../Manager/Manager';
import { flattenObject } from '../../helpers';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      backgroundColor: '#F9C22E',
      minHeight: 56,
    },
  },
  content: {
    margin: '1px 0',
    '&$expanded': {
      margin: '1px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const roundingHelper = (x, key) => {
  const y = x[key];
  return Math.round((y - Math.round(y)) * 100);
};

const ManagerList = (props) => {
  const { dataState, dataDispatch } = useContext(DataContext);
  const { resultsState, resultsDispatch } = useContext(ResultsContext);
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
  const { positions } = settingsState;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const playerAssign = (i) => {
    if (resultsState && resultsState.length) {
      return resultsState
        .map((p) => (roundingHelper(p, 'drafted') === i ? p : null))
        .filter((item) => item != null);
    }
    return [];
  };

  const handleName = (key) => {
    if (settingsState.names[key]) {
      return `${settingsState.names[key]}`;
    }
    return `Manager-${key}`;
  };

  const posOrder = [
    'QB',
    'RB',
    'WR',
    'TE',
    'QB_WR_RB_TE',
    'WR_RB_TE',
    'WR_RB',
    'WR_TE',
    'RB_TE',
    'K',
    'DST',
    'BENCH',
  ];

  const posSettings = flattenObject({
    ...Object.keys(settingsState.positions)
      .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
      .map((pos) => ({ [pos]: positions[pos] })),
  });
  const posStringArray = Object.keys(settingsState.positions)
    .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
    .map((pos) => Array(positions[pos])
      .fill(pos)
      .map((item, i) => `${item}${i}`))
    .flat();
  const flexSettings = Object.keys(posSettings)
    .map((key) => (key.includes('_') ? key : undefined))
    .map((flex) => (posSettings[flex] > 0 ? { [flex]: posSettings[flex] } : undefined))
    .filter((item) => item !== undefined);
  const flexPosArray = Object.keys(...flexSettings)
    .map((key) => key.split('_'))
    .flat();
  const flexCount = Object.values(...flexSettings).reduce((a, b) => a + b);

  return (
    <div className="manager-list">
      {Array.from(Array(settingsState.managers)).map((x, key) => (
        <Accordion
          square
          expanded={expanded === `panel${key}`}
          onChange={handleChange(`panel${key}`)}
          key={key}
        >
          <AccordionSummary aria-controls={`panel${key}d-content`} id={`panel${key}d-header`}>
            <h3>{handleName(key)}</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Manager
              key={key}
              uid={props.uid}
              index={key}
              data={dataState}
              posStringArray={posStringArray}
              posSettings={posSettings}
              flexPosArray={flexPosArray}
              flexCount={flexCount}
              playerAssign={playerAssign}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

ManagerList.propTypes = {
  uid: PropTypes.string,
  data: PropTypes.object,
  draftedPlayers: PropTypes.any,
};

export default ManagerList;
