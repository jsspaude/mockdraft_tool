import Papa from 'papaparse';
import { fetchCsv } from '../helpers';

async function getCsvData(props) {
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
