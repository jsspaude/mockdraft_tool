import React from 'react';
import Papa from 'papaparse';
import { fetchCsv } from '../helpers';

class RemoteFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getCsvData();
  }

  getData(result) {
    this.setState({ data: result.data });
  }

  async getCsvData() {
    const csvData = await fetchCsv();

    Papa.parse(csvData, {
      complete: this.getData,
      header: true,
    });
  }

  render() {
    return <section className="data-controller">...</section>;
  }
}

export default RemoteFile;
