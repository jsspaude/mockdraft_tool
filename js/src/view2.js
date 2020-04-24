function positionTest(pos, posNum) {
  if (this.data.players === undefined || this.data.players[pos] === undefined
      || this.data.players[pos][posNum] === undefined) {
    return '';
  }
  return this.data.players[pos][posNum].name;
}

// CHECKS IF MAXNUMBER OF POSITION FILLED THEN CREATES BENCH ARRAY FOR BENCH DISPLAY
function benchTest() {
  if (this.data.players === undefined) {
    return '';
  }
  const benchArray = [];
  const maxPos = {
    QB: 1, RB: 2, WR: 2, TE: 1, K: 1, DST: 1, FLEX: 1,
  };
  Object.entries(maxPos).forEach((pos) => {
    if (this.data.players[`${pos[0]}`] !== undefined) {
      this.data.players[`${pos[0]}`].forEach((item, i) => {
        if (i + 1 > pos[1]) {
          benchArray.push(item);
        }
      });
    }
  });
  return benchArray;
}


export default class Model {
  constructor(data) {
    this.data = data;
  }

  displayMarkup(markup, container, init) {
    const cont = container;
    const { data } = this;
    let newMarkup = '';
    if (markup === 'manager') {
      const benchArray = benchTest(this.data);
      let bench = '';
      if (benchArray === undefined || benchArray.length === 0) {
        bench = '';
      } else {
        benchArray.forEach((item) => {
          bench += `<li>${item.name}</li>`;
        });
      }

      newMarkup = `
          <article id=${data.managerName.replace(/\s+/g, '')} data-manager=${data.managerNum}>
            <table data-manager=${data.managerNum}>
              <th>${data.managerName}</th>
              <tr>
                <td>QB</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'QB', 0, 1)}</td>
              </tr>
              <tr>
                <td>RB</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'RB', 0, 2)}</td>
              </tr>
              <tr>
                <td>RB</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'RB', 1, 2)}</td>
              </tr>
              <tr>
                <td>WR</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'WR', 0, 2)}</td>
              </tr>
              <tr>
                <td>WR</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'WR', 1, 2)}</td>
              </tr>
              <tr>
                <td>TE</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'TE', 0, 1)}</td>
              </tr>
              <tr>
                <td>K</td>
                <td data-manager=${data.managerNum}>${positionTest(data, 'K', 0, 1)}</td>
              </tr>
              <tr>
                <td>D/ST</td>
                <td data-manager=${data.managerNum}${positionTest(data, 'DST', 0, 1)}></td>
              </tr>
              <tr>
                <td>BENCH</td>
                <td data-manager=${data.managerNum}>
                  <ul>
                    ${bench}
                  </ul>
                </td>
              </tr>
            </table>
          </article>
        `;
    }
    if (markup === 'players') {
      newMarkup = `
        <tr>
          <td data-name='${data.name}'>${data.name}</td>
          <td>${data.pos}</td>
          <td>${data.adp}</td>
          <td>${data.team}</td>
          <td> 
            <button data-js='draftBtn' data-key='${data.primaryKey}' data-manager='${data.managerNum}' data-adp='${data.adp}' data-name='${data.name}' data-team='${data.team}' data-pos='${data.pos}'>DRAFT</button> 
          </td>
        </tr>`;
    }
    if (markup === 'settings') {
      newMarkup = `
        <article data-js='settingsList'>
          <h2>Round ${data.currRound}</h2>
          <h3>Now Drafting: Manager ${data.currManager}</h3>
        </article>
        `;
    }

    if (init) { cont.innerHTML += newMarkup; }
    return newMarkup;
  }
}

export { Model };
