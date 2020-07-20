import Papa from 'papaparse';
import PropTypes from 'prop-types';

async function fetchCsv() {
  const response = await fetch('../api/raw_data.csv');
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  const result = await reader.read();
  return decoder.decode(result.value);
}

async function getCsvData(props) {
  getCsvData.propTypes = {
    complete: PropTypes.any,
  };
  const csvData = await fetchCsv();

  return Papa.parse(csvData, {
    complete: props,
    header: true,
    dynamicTyping: true,
    transformHeader(h) {
      const newH = h.replace(/[^A-Z0-9]+/gi, '_');
      return newH.toLowerCase();
    },
  });
}

export default getCsvData;
