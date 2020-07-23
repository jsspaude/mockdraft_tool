import React from 'react';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import { slugify } from '../helpers';
import Firebase from './base';

const fetchCsv = async () => {
  const response = await fetch('../api/raw_data.csv');
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  const result = await reader.read();
  return decoder.decode(result.value);
};

const getCsvData = async (props) => {
  const csvData = await fetchCsv();
  getCsvData.propTypes = {
    complete: PropTypes.any,
  };
  return Papa.parse(csvData, {
    complete: props,
    header: true,
    dynamicTyping: true,
    transformHeader(h) {
      const newH = h.replace(/[^A-Z0-9]+/gi, '_');
      return newH.toLowerCase();
    },
  });
};

const reducePlayerObject = (data) => {
  const arr = data;
  const playerObject = arr
    .map((player) => {
      const o = { ...player };
      o.drafted = false;
      return o;
    })
    .reduce(
      (obj, item) => ({
        ...obj,
        [slugify(item.overall)]: item,
      }),
      {},
    );
  return playerObject;
};

const createInitialState = (uid) => Firebase.collectData(uid).then((res) => {
  if (!res.settings.drafted) {
    getCsvData()
      .then((result) => reducePlayerObject(result.data))
      .then((obj) => {
        Firebase.setUserData(uid, obj, 'playerData');
        console.log(obj);
        return obj;
      });
  }
  console.log(res);
  return res;
});

export { getCsvData, reducePlayerObject };

export default createInitialState;
